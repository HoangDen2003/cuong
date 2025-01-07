const request = require("supertest");
const app = require("../../../index");

// ! success: get all, add, update, delete, get a user

describe("User Controller", () => {
  test("should get all users", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  // test("should create a user", async () => {
  //   const data = {
  //     fullname: "test",
  //     avatar: "1.png",
  //     username: "hoangtest",
  //     email: "test@gmail.com",
  //     phone: "012345678",
  //     birthday: "2003-03-11",
  //     password: "passwordtest",
  //     address: "thanh hoa",
  //     role_id: 1,
  //     status: "active",
  //   };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
  //   const response = await request(app)
  //     .post("/users/create")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(data);
  //   expect(response.status).toBe(200);
  // });
  // test("should update a user", async () => {
  //   const id = 2;
  //   const data = {
  //     fullname: "test",
  //     avatar: "1.png",
  //     username: "hoangtest",
  //     email: "test@gmail.com",
  //     phone: "012345678",
  //     birthday: "2003-03-11",
  //     password: "passwordtest",
  //     address: "thanh hoa",
  //     role_id: 1,
  //     status: "active",
  //   };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
  //   const response = await request(app)
  //     .put(`/users/update/${id}`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(data);
  //   expect(response.status).toBe(200);
  // });
  // test("should delete user", async () => {
  //   const body = { ids: [2] };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
  //   const response = await request(app)
  //     .delete(`/users/delete`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(body);
  //   expect(response.status).toBe(200);
  // });
  test("should get a user", async () => {
    const query = { id: 1 };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
    const response = await request(app)
      .get(`/users/get-user?id=${query.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
