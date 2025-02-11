import request from "supertest";

import app from "../src/server";

describe("Test server.ts", () => {
  test("Home route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "Welcome to Products API" });
  });
});
