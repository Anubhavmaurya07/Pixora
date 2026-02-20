const axios = require("axios");

const BASE_URL = "http://localhost:8000/api/post/create-post";

// ⬇️ Replace this with your real token from login or Postman
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YWRiMGIyMy1lNDAxLTRjOGItYjcyZi1mMzgwZGIwYTZkNmYiLCJpYXQiOjE3NzE1NjQxMjAsImV4cCI6MTc3MjE2ODkyMH0.cX9Nx-JYojNTgyiEB2K02FVZsw1kHs1FgRAhOezUZjQ";

const posts = Array.from({ length: 50 }, (_, i) => ({
  caption: `Post number ${i + 1} by Anubhav`,
  imageUrl: `https://picsum.photos/seed/${i + 1}/600/400`,
}));

async function createPosts() {
  for (const post of posts) {
    try {
      const res = await axios.post(BASE_URL, post, {
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
      });
      console.log("✅ Created:", res.data?.id || post.caption);
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
    }
  }
}

createPosts();