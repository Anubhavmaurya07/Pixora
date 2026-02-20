# 🪄 **Pixora – Modern Social Media Backend**

Pixora is a **scalable Node.js + Prisma + PostgreSQL** backend that powers a full-fledged social media experience — complete with **authentication, posts, likes, comments, follows, a personalized feed with cursor pagination, and real-time-ready notifications**.

---

## 🚀 **Tech Stack**

| Layer                    | Technology            |
| ------------------------ | --------------------- |
| Language                 | Node.js (Express)     |
| ORM                      | Prisma                |
| Database                 | PostgreSQL            |
| Auth                     | JWT (JSON Web Tokens) |
| Cache / Queue (optional) | Redis + BullMQ        |
| Real-time (optional)     | Socket.IO             |
| Cloud-ready              | Dockerized setup      |

---

## ⚙️ **Features**

### 🧩 Core

* 🔐 **User Authentication** (JWT-based login/register)
* 👤 **Follow System** (followers / following counts)
* 📝 **Posts CRUD** (create, edit, delete, fetch)
* ❤️ **Like System** with toggle + atomic transactions
* 💬 **Comments** with pagination
* 🧭 **Infinite Feed** using cursor pagination (Instagram-style)
* 🔔 **Notification System** (like, comment, follow)

### ⚡ Advanced (Scalability Ready)

* 🧱 Transaction-safe like toggles via Prisma `$transaction`
* 🚦 Pagination cursor encoding/decoding
* 📦 Modular folder structure (`repository`, `service`, `controller`, `routes`)
* 🔥 Built for **real-time integration** (Socket.IO or Web Push)
* 💾 Ready for Redis caching layer
* 🧰 Background job queue compatible (BullMQ)

---

## 📁 **Project Structure**

```
src/
 ├── config/
 │   └── prisma.js
 │
 ├── modules/
 │   ├── auth/
 │   ├── users/
 │   ├── posts/
 │   ├── comments/
 │   ├── likes/
 │   ├── follows/
 │   ├── feed/
 │   ├── notifications/
 │   └── ...
 │
 ├── utils/
 │   ├── ApiError.js
 │   ├── cursor.js
 │   └── ...
 │
 └── app.js
```

---

## 🧠 **Database Schema Overview**

### User

* `followers`, `following`, `posts`
* `notificationsReceived`, `notificationsSent`

### Post

* `likes`, `comments`, `notifications`

### Notification

* Type enum: `LIKE`, `COMMENT`, `FOLLOW`
* Linked to both `actor` (trigger) and `receiver` (target)

### Like

* Unique compound key: `(userId, postId)`

---

## 🔥 **Feed Pagination Logic**

Pixora uses **cursor-based pagination** instead of offset-based for performance.

```
/feed?limit=10&cursor=<encodedCursor>
```

Each cursor encodes the last visible post’s `{ createdAt, id }` and ensures no duplicates or skips — just like Instagram’s feed scrolling.

---

## 💌 **Notifications**

Triggered automatically when:

* Someone likes your post
* Someone comments on your post
* Someone follows you

Supports:

* Fetch API (`GET /notifications`)
* Mark as read (`PUT /notifications/read`)

Easily extendable to:

* WebSockets (real-time)
* Redis pub/sub
* Web Push (FCM)

---

## 🧱 **Environment Variables**

```
DATABASE_URL=postgresql://user:password@localhost:5432/pixora
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 🧰 **Scripts**

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm install`            | Install dependencies     |
| `npx prisma migrate dev` | Apply DB migrations      |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |

---

## 🧠 **Scalability Roadmap**

| Stage     | Feature                                                  |
| --------- | -------------------------------------------------------- |
| ✅ Done    | Auth, CRUD, Feed, Likes, Comments, Notifications         |
| 🚧 Next   | Real-time updates via Socket.IO                          |
| 🚀 Soon   | Redis caching & Background jobs                          |
| 🌐 Future | Image uploads (S3/Cloudinary), Explore algorithm, Search |

---

## 🧑‍💻 **Author**

👋 **Anubhav** — Full Stack Developer
Focused on building modern, scalable web apps with React, Node.js, and DevOps excellence.

> *“Code. Scale. Automate. Repeat.”*

---

## 📄 **License**

This project is licensed under the MIT License.
