const request = require("supertest");
const app = require("../../../index");

describe("Post Controller", () => {
  test("should get a post by id", async () => {
    const postId = 395;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjIyNzY1NCwiZXhwIjoxNzUzNzg1MjU0fQ.KB52Lts-NTJJQXwDi5jQf7aAAW8_-OGisnEXnGH2_Pg';
    const response = await request(app).get(`/post/${postId}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(postId);
  });

  // test("should create a new post", async () => {
  //   const newPost = {
  //     formData: {
  //       user_id: "1",
  //       status: "true",
  //       file: "",
  //       category_id: "1",
  //       translations: [
  //         {
  //           language_id: 1,
  //           title: "New post",
  //           body: "<p>Content new post</p>",
  //         },
  //       ],
  //     },
  //   };
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjIyNzY1NCwiZXhwIjoxNzUzNzg1MjU0fQ.KB52Lts-NTJJQXwDi5jQf7aAAW8_-OGisnEXnGH2_Pg';

  //   const response = await request(app).post("/post/create").send(newPost).set('Authorization', `Bearer ${token}`);
  //   expect(response.status).toBe(200);

  //   expect(response.body.data.status).toBe(newPost.formData.status);
  //   expect(response.body.data.category_id).toBe(newPost.formData.category_id);
  // });

  // test("should update an existing post", async () => {
  //   const postId = 395;
  //   const updatedPost = {
  //     formData: {
  //       user_id: "1",
  //       status: "false",
  //       category_id: "1",
  //       translations: [
  //         {
  //           id: 8,
  //           language_id: 1,
  //           title: "aab new post",
  //           body: "<p>aaab new post</p>",
  //         },
  //       ],
  //     },
  //   };
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjIyNzY1NCwiZXhwIjoxNzUzNzg1MjU0fQ.KB52Lts-NTJJQXwDi5jQf7aAAW8_-OGisnEXnGH2_Pg';

  //   const response = await request(app)
  //     .put(`/post/update/${postId}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(updatedPost);
  //   expect(response.status).toBe(200);
  //   expect(response.body.data.category_id).toBe(
  //     updatedPost.formData.category_id
  //   );
  //   expect(response.body.data.status).toBe(updatedPost.formData.status);
  // });

  // test("should delete a post by id", async () => {
  //   const deletePost = {
  //     formData: { Ids: [391] },
  //   };
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjIyNzY1NCwiZXhwIjoxNzUzNzg1MjU0fQ.KB52Lts-NTJJQXwDi5jQf7aAAW8_-OGisnEXnGH2_Pg';
  //   const response = await request(app).delete("/post/delete").send(deletePost).set('Authorization', `Bearer ${token}`);
  //   expect(response.status).toBe(200);
  // });

  // test("should filter posts by category", async () => {
  //   const categoryId = 1;
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjIyNzY1NCwiZXhwIjoxNzUzNzg1MjU0fQ.KB52Lts-NTJJQXwDi5jQf7aAAW8_-OGisnEXnGH2_Pg';
  //   const response = await request(app).get(
  //     `/post/user/1?categoryId=${categoryId}`).set('Authorization', `Bearer ${token}`);
  //   expect(response.status).toBe(200);
  // });

  // test("get posts by user", async () => {
  //   const user = 1;
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjIyNzY1NCwiZXhwIjoxNzUzNzg1MjU0fQ.KB52Lts-NTJJQXwDi5jQf7aAAW8_-OGisnEXnGH2_Pg';
  //   const response = await request(app).get(`/post/user/${user}`).set('Authorization', `Bearer ${token}`);
  //   expect(response.status).toBe(200);
  // });

  // test("update mutiple posts", async () => {
  //   const updatedPost = {
  //     formData: {
  //       Ids: [395, 394],
  //       value: "2",
  //       type: "category_id",
  //     },
  //   };
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjIyNzY1NCwiZXhwIjoxNzUzNzg1MjU0fQ.KB52Lts-NTJJQXwDi5jQf7aAAW8_-OGisnEXnGH2_Pg';
  //   const response = await request(app)
  //     .patch("/post/update-multiple")
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(updatedPost);
  //   expect(response.status).toBe(200);
  // });

  // test("get all posts", async () => {
  //   const response = await request(app).get("/index");
  //   expect(response.status).toBe(200);
  // });

  // test("get detail post", async () => {
  //   const id = 395;
  //   const response = await request(app).get(`/${id}`);
  //   expect(response.status).toBe(200);
  // });

  // test("get category", async () => {
  //   const response = await request(app).get("/category");
  //   expect(response.status).toBe(200);
  // });

  // test("get language", async () => {
  //   const response = await request(app).get("/language");
  //   expect(response.status).toBe(200);
  // });
});
