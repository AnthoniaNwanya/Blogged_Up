const request = require("supertest");
const app = require("../index");
const userModel = require("../models/userModel");
const { connect } = require("./database");
const SECONDS = 1000;
jest.setTimeout(60 * SECONDS);
describe("Users in Blog", () => {
  let conn;
  let id;
  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should create users in database", async () => {
    const response = await request(app)
      .post("/user")
      .set("content-type", "application/json")
      .send({
        first_name: "Imani",
        last_name: "Schum",
        email: "imani@yahoo.com",
        password: "123480983",
      });

    expect(response.status).toBe(201);
  });

  it("should get users in database", async () => {
    const response = await request(app)
      .get("/user")
      .set("content-type", "application/json");

      expect(response.status).toBe(200);
  });
});
