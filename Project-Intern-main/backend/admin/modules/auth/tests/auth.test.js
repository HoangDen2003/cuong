const request = require("supertest");
const app = require("../../../index");

// ! success: login, forgot-password, send-email, verify email(otp), new password
// ! error: delete otp (it still works)

describe("Auth Controller", () => {
  test("should login", async () => {
    const data = {
      email: "admin@gmail.com",
      password: "password",
    };
    const response = await request(app).post("/auth/sign-in").send(data);
    expect(response.status).toBe(200);
  });
  test("should forgot-password", async () => {
    const data = {
      email: "admin@gmail.com",
    };
    const response = await request(app)
      .post("/auth/forgot-password")
      .send(data);
    expect(response.status).toBe(200);
  });
  // test("should send email", async () => {
  //   const data = {
  //     email: "admin@gmail.com",
  //     text: "123456",
  //   };
  //   const response = await request(app).post("/auth/send-email").send(data);
  //   expect(response.status).toBe(200);
  // });
  // test("should verification email", async () => {
  //   const data = {
  //     otp: "123456",
  //   };
  //   const response = await request(app).post("/auth/verify-email").send(data);
  //   expect(response.status).toBe(200);
  // });
  // test("should create a new password", async () => {
  //   const data = {
  //     email: "admin@gmail.com",
  //     password: "password",
  //   };
  //   const response = await request(app).put("/auth/newpassword").send(data);
  //   expect(response.status).toBe(200);
  // });
  // test("should delete-otp", async () => {
  //   const data = {
  //     otp: "123456",
  //   };
  //   const response = await request(app).delete("/auth/delete-otp").send(data);
  //   expect(response.status).toBe(200);
  // });
});
