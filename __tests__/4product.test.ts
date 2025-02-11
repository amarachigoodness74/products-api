import request from "supertest";
import mongoose from "mongoose";
import app from "../src/server";

beforeAll(async () => {
  await mongoose.connection.dropCollection("sellers");
  await mongoose.connection.dropCollection("categories");
  await mongoose.connection.dropCollection("products");
});

afterAll(async () => {
  await mongoose.connection.dropCollection("sellers");
  await mongoose.connection.dropCollection("categories");
  await mongoose.connection.dropCollection("products");
  await mongoose.connection.close();
});

describe("Product Controller", () => {
  let productId: string;
  let sellerId: string;
  let categoryId: string;

  const demoData = async () => {
    // Create a seller for testing
    const seller = await request(app).post("/api/sellers").send({
      name: "Test Seller",
      email: "new@example.com",
      phone: "9876543210",
      location: "New Location",
    });
    sellerId = seller.body._id;

    // Create a category for testing
    const category = await request(app).post("/api/categories").send({
      name: "Test Category",
      description: "Test description",
    });
    categoryId = category.body._id;
  };

  // Test creating a new product
  it("should create a new product", async () => {
    await demoData();
    const newProduct = {
      name: "Test Product",
      quantity: 5,
      price: 50,
      seller: sellerId,
      category: categoryId,
    };

    const response = await request(app).post("/api/products").send(newProduct);
    productId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Product");
  });

  // Test validation for creating a product
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Name, quantity, and price are required"
    );
  });

  // Test fetching all products
  it("should fetch all products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test fetching a single product
  it("should fetch a single product by ID", async () => {
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.product.product.name).toBe("Test Product");
  });

  // Test updating a product
  it("should update an existing product", async () => {
    const updateData = { name: "Updated Product", quantity: 15, price: 200 };

    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Product");
  });

  // Test updating a non-existent product
  it("should return 404 when updating a non-existent product", async () => {
    const response = await request(app)
      .put(`/api/products/${new mongoose.Types.ObjectId()}`)
      .send({ name: "Doesn't exist" });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found");
  });

  // Test deleting a product
  it("should delete a product", async () => {
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product deleted successfully");
  });

  // Test deleting a non-existent product
  it("should return 404 when deleting a non-existent product", async () => {
    const response = await request(app).delete(
      `/api/products/${new mongoose.Types.ObjectId()}`
    );
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found");
  });
});
