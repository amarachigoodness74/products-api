import request from "supertest";
import mongoose from "mongoose";
import app from "../src/server";

beforeAll(async () => {
  await mongoose.connection.dropCollection("categories");
});

afterAll(async () => {
  await mongoose.connection.dropCollection("categories");
  await mongoose.connection.close();
});

describe("Category Routes", () => {
  let categoryId: string;

  it("should create a new category", async () => {
    const response = await request(app).post("/api/categories").send({
      name: "Test Category",
      description: "Test Description",
    });
    categoryId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Category");
  });

  it("should not create a category with missing fields", async () => {
    const response = await request(app)
      .post("/api/categories")
      .send({ name: "Invalid Category" });
    expect(response.status).toBe(400);
  });

  it("should fetch all categories", async () => {
    const response = await request(app).get("/api/categories");
    expect(response.status).toBe(200);
    expect(response.body.categories).toBeDefined();
  });

  it("should fetch a single category", async () => {
    const response = await request(app).get(`/api/categories/${categoryId}`);
    expect(response.status).toBe(200);
    expect(response.body.category).toBeDefined();
    expect(response.body.category.name).toBe("Test Category");
  });

  it("should return 404 for a non-existent category", async () => {
    const response = await request(app).get(
      "/api/categories/65f5dff06a3e9e72bdfaa123"
    );
    expect(response.status).toBe(404);
  });

  it("should update an existing category", async () => {
    const response = await request(app)
      .put(`/api/categories/${categoryId}`)
      .send({
        name: "Updated Category",
        description: "Updated Description",
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Category");
  });

  it("should delete a category", async () => {
    const response = await request(app).delete(`/api/categories/${categoryId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Category deleted successfully");
  });

  it("should return 404 when deleting a non-existent category", async () => {
    const response = await request(app).delete(
      "/api/categories/65f5dff06a3e9e72bdfaa123"
    );
    expect(response.status).toBe(404);
  });
});
