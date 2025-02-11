import request from "supertest";
import mongoose from "mongoose";
import app from "../src/server";

afterAll(async () => {
  await mongoose.connection.dropCollection("sellers");
  await mongoose.connection.close();
});

describe("Seller Controller Tests", () => {
  let sellerId: string;

  test("POST /api/sellers - Should create a new seller", async () => {
    const res = await request(app).post("/api/sellers").send({
      name: "Test Seller",
      email: "new@example.com",
      phone: "9876543210",
      location: "New Location",
    });
    sellerId = res.body._id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test Seller");
  });

  test("GET /api/sellers - Should fetch all sellers", async () => {
    const res = await request(app).get("/api/sellers");
    expect(res.status).toBe(200);
    expect(res.body.sellers.length).toBe(1);
    expect(res.body.sellers[0].name).toBe("Test Seller");
  });

  test("GET /api/sellers/:id - Should fetch a single seller", async () => {
    const res = await request(app).get(`/api/sellers/${sellerId}`);
    expect(res.status).toBe(200);
    expect(res.body.seller.name).toBe("Test Seller");
  });

  test("GET /api/sellers/:id - Should return 404 for non-existing seller", async () => {
    const res = await request(app).get("/api/sellers/65d1234567890abcdef12345");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Seller not found");
  });

  test("POST /api/sellers - Should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/sellers")
      .send({ name: "Incomplete Seller" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Name, email, and location are required");
  });

  test("PUT /api/sellers/:id - Should update an existing seller", async () => {
    const res = await request(app)
      .put(`/api/sellers/${sellerId}`)
      .send({ name: "Updated Seller" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Seller");
  });

  test("PUT /api/sellers/:id - Should return 404 if seller not found", async () => {
    const res = await request(app)
      .put("/api/sellers/65d1234567890abcdef12345")
      .send({ name: "Updated" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Seller not found");
  });

  test("DELETE /api/sellers/:id - Should delete an existing seller", async () => {
    const res = await request(app).delete(`/api/sellers/${sellerId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Seller deleted successfully");
  });

  test("DELETE /api/sellers/:id - Should return 404 if seller not found", async () => {
    const res = await request(app).delete(
      "/api/sellers/65d1234567890abcdef12345"
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Seller not found");
  });
});
