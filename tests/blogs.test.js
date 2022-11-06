const request = require("supertest");
const app = require("../index");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const { connect } = require("./database");
// const { fakeBlogData } = require("./fixtures/blogs");
// const { fakeUserData } = require("./fixtures/users");
describe("Auth Controller: tests user registration and login", () => {
  let conn;
  let token;
  beforeAll(async () => {
    conn = await connect();

    await userModel.create({
      first_name: "Jade",
      last_name: "Hune",
      email: "jade@yahoo.com",
      password: "123456",
    });

    const loginUser = await request(app)
      .post("/auth/signin")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        email: "jade@yahoo.com",
        password: "123456",
      });
    token = loginUser.body.token;
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("create blog", async () => {
    const newBlog = await blogModel.create({
      title: "A Blog Test Data",
      description: "Testing blogs",
      author: "Jerry Dahmer",
      tags: ["tests", "integration"],
      body: "Blog integration tests carried out to ascertain the seamlessness of creation blogs",
    });

    const response = await request(app)
      .post("/blog")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("status", true);
    expect(newBlog.state).toBe("draft");
    expect(newBlog.tags).toContain("tests");
    expect(newBlog).toHaveProperty("user");
  });

  it("allow blog owner get draft state blogs", async () => {
    const response = await request(app)
      .get("/blog")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

});
