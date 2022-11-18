import mongoose from "mongoose";
import request from "supertest";
import app from ".././index";

console.log(process.env.DB_URL);

beforeEach(async () => {
  await mongoose.connect(
    process.env.DB_URL
      ? process.env.DB_URL
      : "mongodb+srv://user_001:password1234@blog.9zreltd.mongodb.net/?retryWrites=true&w=majority"
  );
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET users", () => {
  it("responds with an array of users", async () => {
    request(app)
      .post("/api/v1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("length");
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("status");
      });
  });
});
