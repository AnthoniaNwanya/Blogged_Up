const request = require("supertest");
const app = require("../index");
const userModel = require("../models/userModel");
const { connect } = require("./database");

describe("Auth Controller: tests user registration and login", () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("register user with valid parameters", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .set("content-type", "application/json")
      .send({
        first_name: "tobi",
        last_name: "supreme",
        email: "tobi@yahoo.com",
        password: "123456",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("first_name");
    expect(response.body).toHaveProperty("last_name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("password");
  });

  it("verify user login", async () => {
    await userModel.create({
      first_name: "tobi",
      last_name: "supreme",
      email: "tobi@yahoo.com",
      password: "123456",
    });

    const response = await request(app)
      .post("/auth/signin")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        email: "tobi@yahoo.com",
        password: "123456",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("blogs");
  });
});
