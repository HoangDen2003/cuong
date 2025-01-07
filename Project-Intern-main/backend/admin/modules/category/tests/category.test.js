const request = require("supertest");
const app = require("../../../index");

// ! success: add, update, get all
// ! error:

describe("Category Controller", () => {
  test("should get all categories", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
    const response = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  // test("should create a category", async () => {
  //   const data = {
  //     name: "test",
  //   };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
  //   const response = await request(app)
  //     .post("/categories/create")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(data);
  //   expect(response.status).toBe(200);
  // });
  // test("should update a category", async () => {
  //   const id = 1;
  //   const data = {
  //     name: "News",
  //     slug: "news",
  //   };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
  //   const response = await request(app)
  //     .put(`/categories/update/${id}`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(data);
  //   expect(response.status).toBe(200);
  // });
  // test("should delete categories", async () => {
  //   const body = { ids: [3] };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
  //   const response = await request(app)
  //     .delete(`/categories/delete`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(body);
  //   expect(response.status).toBe(200);
  // });
});
