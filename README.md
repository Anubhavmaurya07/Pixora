# 🪄 **Pixora – Modern Social Media Backend**

Pixora is a **scalable Node.js + Prisma + PostgreSQL** backend powering a modern social media experience — complete with **authentication, posts, likes, comments, follows, personalized feed with cursor pagination, and background job notifications**.

Built for performance and scalability, Pixora integrates **Redis caching** and a **BullMQ job queue** to handle heavy background tasks asynchronously — making it production-ready for large-scale workloads.

---

## 🚀 **Tech Stack**

| Layer                | Technology            |
| -------------------- | --------------------- |
| Language             | Node.js (Express)     |
| ORM                  | Prisma                |
| Database             | PostgreSQL (Neon)     |
| Auth                 | JWT (JSON Web Tokens) |
| Cache / Queue        | **Redis + BullMQ**    |
| Background Jobs      | BullMQ Worker System  |
| Real-time (optional) | Socket.IO             |
| Cloud-ready          | Dockerized setup      |

---

## ⚙️ **Core Features**

### 🧩 Application Logic

* 🔐 **User Authentication** (JWT-based)
* 👤 **Follow System** (followers / following)
* 📝 **Posts CRUD** (create, edit, delete, feed)
* ❤️ **Likes** with atomic transaction safety
* 💬 **Comments** with pagination
* 🧭 **Feed Pagination** using cursor strategy
* 🔔 **Notification System** (async via BullMQ Queue)

---

## ⚡ **Background Jobs with BullMQ + Redis**

Pixora processes heavy operations like notifications asynchronously via **BullMQ**, powered by **Redis**.
This ensures that user requests are never delayed — notifications, cache updates, and analytics all run in the background.

### ⚙️ Architecture

```
Client → API (Express) → BullMQ Queue → Redis → Worker → Notification Service
```

### ✅ Use Cases

* Like / Comment / Follow notifications
* Feed cache invalidation
* Email & push notifications (future-ready)
* Heavy async tasks (e.g., activity analytics)

### 🧠 Example (Notification Queue)

```js
await addNotificationJob({
  receiverId: post.userId,
  actorId,
  type: NotificationType.LIKE,
  postId: post.id,
});
```

---

## 💾 **Caching Layer (Redis)**

Redis is configured as a shared service for:

* BullMQ communication
* Caching of posts, feed results, or session data (optional)

**Supports both local and cloud Redis providers:**

* ✅ Upstash (serverless & free tier)
* ✅ Redis Cloud
* ✅ Render Redis
* ✅ AWS ElastiCache

---

## 📁 **Project Structure**

```
src/
 ├── config/
 │   ├── prisma.js
 │   └── redis.js             # Shared Redis connection
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
 │   │    ├── notification.service.js
 │   │    ├── notification.queue.js
 │   │    └── workers/
 │   │         └── notification.worker.js
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

### 🧾 Notification Table (New)

| Field        | Type     | Description                 |
| ------------ | -------- | --------------------------- |
| `id`         | String   | Unique identifier           |
| `receiverId` | String   | User receiving notification |
| `actorId`    | String   | User performing the action  |
| `type`       | Enum     | `LIKE`, `COMMENT`, `FOLLOW` |
| `postId`     | String?  | Linked post (optional)      |
| `createdAt`  | DateTime | Timestamp                   |
| `read`       | Boolean  | Mark as read/unread         |

---

## 🔔 **Notification System (Async via BullMQ)**

Notifications are now queued instantly and processed in the background for speed and scalability.

### Workflow:

```
1️⃣ User likes a post → addNotificationJob()
2️⃣ Job stored in Redis (BullMQ Queue)
3️⃣ Worker picks up the job
4️⃣ createNotification() executes in background
5️⃣ Notification stored in PostgreSQL
```

### Worker Example

```js
const worker = new Worker(
  "notifications",
  async (job) => {
    const { receiverId, actorId, type, postId } = job.data;
    await createNotification({ receiverId, actorId, type, postId });
  },
  { connection: redis }
);
```

---

## ⚙️ **Environment Variables**

```env
DATABASE_URL=postgresql://user:password@your-neon-db.neon.tech/pixora?sslmode=require
JWT_SECRET=your_jwt_secret
PORT=5000
REDIS_URL=rediss://default:password@your-upstash-db.upstash.io:6379
```

---

## 🧰 **Scripts**

| Command                                                         | Description              |
| --------------------------------------------------------------- | ------------------------ |
| `npm install`                                                   | Install dependencies     |
| `npx prisma migrate dev`                                        | Apply Prisma migrations  |
| `npm run dev`                                                   | Start development server |
| `node src/modules/notifications/workers/notification.worker.js` | Run background worker    |
| `npx prisma studio`                                             | Open Prisma data browser |

---

## 🧠 **Scalability Roadmap**

| Stage     | Feature                                                    |
| --------- | ---------------------------------------------------------- |
| ✅ Done    | Auth, Posts, Likes, Comments, Follows, Feed, Notifications |
| ✅ Done    | Background Jobs (BullMQ + Redis)                           |
| 🚧 Next   | Real-time updates (Socket.IO / WebSockets)                 |
| 🚀 Soon   | Redis caching for feeds & explore                          |
| 🌐 Future | Image uploads (S3/Cloudinary), Explore algorithm, Search   |

---

## 🧑‍💻 **Author**

👋 **Anubhav** — Full Stack Developer
Focused on building modern, scalable systems with Node.js, React, and DevOps.

> *“Code. Scale. Automate. Repeat.”*

---

## 📄 **License**

This project is licensed under the MIT License.
