import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../lib/socket.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

let mongoServer;

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecretkey123";
  process.env.NODE_ENV = "test";
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Message.deleteMany({});
});

describe("Auth Endpoints", () => {
  test("POST /api/auth/signup - Signup success", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toEqual("test@example.com");
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  test("POST /api/auth/signup - Duplicate email failure", async () => {
    await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "duplicate@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/signup").send({
      fullName: "Second User",
      email: "duplicate@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Email already exists");
  });

  test("POST /api/auth/login - Login success and failure", async () => {
    await request(app).post("/api/auth/signup").send({
      fullName: "Login User",
      email: "login@example.com",
      password: "password123",
    });

    // Login Failure (Wrong password)
    const failRes = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "wrongpassword",
    });

    expect(failRes.statusCode).toEqual(400);
    expect(failRes.body.message).toEqual("Invalid Credentials");

    // Login Success
    const successRes = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "password123",
    });

    expect(successRes.statusCode).toEqual(200);
    expect(successRes.body).toHaveProperty("_id");
    expect(successRes.headers["set-cookie"]).toBeDefined();
  });

  test("GET /api/auth/check - Protected route without cookie fails", async () => {
    const res = await request(app).get("/api/auth/check");

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Unauthorized - No Token Provided");
  });
});

describe("Message Endpoints", () => {
  test("POST & GET /api/messages - Send message and retrieve conversation", async () => {
    // 1. Create User A and log in to get cookie
    const userARes = await request(app).post("/api/auth/signup").send({
      fullName: "Sender User",
      email: "sender@example.com",
      password: "password123",
    });
    const authCookie = userARes.headers["set-cookie"];

    // 2. Create User B (receiver)
    const userB = await User.create({
      fullName: "Receiver User",
      email: "receiver@example.com",
      password: "password123",
    });

    // 3. Send message from User A to User B
    const sendRes = await request(app)
      .post(`/api/messages/send/${userB._id}`)
      .set("Cookie", authCookie)
      .send({ text: "Hello Receiver!" });

    expect(sendRes.statusCode).toEqual(201);
    expect(sendRes.body.text).toEqual("Hello Receiver!");
    expect(sendRes.body.senderId).toEqual(userARes.body._id);

    // 4. Get messages between User A and User B
    const getRes = await request(app)
      .get(`/api/messages/${userB._id}`)
      .set("Cookie", authCookie);

    expect(getRes.statusCode).toEqual(200);
    expect(Array.isArray(getRes.body)).toBe(true);
    expect(getRes.body.length).toEqual(1);
    expect(getRes.body[0].text).toEqual("Hello Receiver!");
  });
});
