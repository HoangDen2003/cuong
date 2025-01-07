const request = require("supertest");
const app = require("../../../index");

describe("Auth Controller", () => {
  test("should login", async () => {
    const data = {
      email: "admin@gmail.com",
      password: "admin",
    };
    const response = await request(app).post("/auth/sign-in").send(data);
    expect(response.status).toBe(200);
  });

//   test("should register", async () => {
//     const data = {
//       username: "admin3",
//       email: "admin3@gmail.com",
//       birthday: "2024-01-01",
//       password: "admin2@gmail",
//       confirmPassword: "admin2@gmail",
//       phone: "0912475588",
//       address: "ha noi",
//       role_id: "1",
//     };
//     const response = await request(app).post("/auth/sign-up").send(data);
//     expect(response.status).toBe(200);
//   });

//   test("should reset password", async () => {
//     const data = {
//       email: "lequan180401@gmail.com",
//     };
//     const response = await request(app)
//       .post("/auth/forgot-password")
//       .send(data);
//     expect(response.status).toBe(200);
//   });

//   test("should check otp mail", async () => {
//     const data = {
//       email: "lequan180401@gmail.com",
//       otp: "875171",
//     };
//     const response = await request(app).post("/auth/check-otp-mail").send(data);
//     expect(response.status).toBe(200);
//   });

//   test("should reset password", async () => {
//     const data = {
//       email: "lequan180401@gmail.com",
//       password: "admin2@gmail",
//       confirmPassword: "admin2@gmail",
//     };
//     const response = await request(app).put("/auth/reset-password").send(data);
//     expect(response.status).toBe(200);
//   });
});
