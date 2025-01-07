const request = require("supertest");
const app = require("../../../index");

// ! success: add, update, get all
// ! error

describe("Language Controller", () => {
  test("should get all languages", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
    const response = await request(app)
      .get("/languages")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  // test("should create a language", async () => {
  //   const data = {
  //     name: "Lao",
  //     locale: "la",
  //     flag: "la.png",
  //   };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
  //   const response = await request(app)
  //     .post("/languages/create")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(data);
  //   expect(response.status).toBe(200);
  // });
  // test("should update a language", async () => {
  //   const id = 4;
  //   const data = {
  //     name: "News",
  //     locale: "en",
  //     flag: "en.png",
  //   };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
  //   const response = await request(app)
  //     .put(`/languages/update/${id}`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(data);
  //   expect(response.status).toBe(200);
  // });
  // test("should delete languages", async () => {
  //   const body = { ids: [4] };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzQ0ODExMiwiZXhwIjoxNzU1MDA1NzEyfQ.DF9S8KAvYp46bHoCj08USe21M65rgO6yqGTSEzGcuTU";
  //   const response = await request(app)
  //     .delete(`/languages/delete`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(body);
  //   expect(response.status).toBe(200);
  // });
});
