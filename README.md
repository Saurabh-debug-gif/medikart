# Clitoria – How to Run Locally (Simple Guide)

Hey! This is a simple MERN project with three parts:
- Backend (Node + Express + MongoDB)
- Frontend (React + Vite)
- Admin (React + Vite)

You can run all three with a single command. Follow the steps below.

---

## 1) Requirements
- Node.js 20.19+ or 22.12+
- npm (comes with Node)
- A MongoDB connection string (Atlas or local)

---

## 2) Set up the Backend environment
Create a file called `.env` inside `CLITORIA/Backend` with this content:

```
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<dbName>?retryWrites=true&w=majority
JWT_SECRET=change-this-secret
```

Notes:
- If you use local MongoDB, you can set `MONGO_URI=mongodb://localhost:27017/mydb`.
- After changing `.env`, restart the backend when running.

---

## 3) Install all dependencies
From the project root folder `CLITORIA` (where this README is):

```bash
npm install
npm run install-all
```

This installs the root tool and then all three apps (Backend, Frontend, Admin).

---

## 4) Start everything (one command)
From the same root `CLITORIA` folder:

```bash
npm run dev
```

- Backend: http://localhost:4000
- Frontend (store): http://localhost:5173
- Admin: http://localhost:5174

If you only want to run one app:
```bash
npm run start:backend
npm run start:frontend
npm run start:admin
```

---

## 5) Quick tests
- Backend health:
```bash
curl http://localhost:4000/
```
Should say: `API Working`

- Medicines:
```bash
curl http://localhost:4000/api/medicine/list
```

- Orders (after placing one from the store app):
```bash
curl http://localhost:4000/api/orders
```

- Signup/Login (optional):
```bash
curl -X POST http://localhost:4000/api/users/signup -H "content-type: application/json" -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"password\":\"pass1234\"}"
```

---

## 6) Common issues
- Port already in use: change the port in `Backend/.env` or in Vite configs.
- CORS errors: the Vite dev servers proxy `/api`, `/uploads`, `/images` to the backend, so use relative URLs like `/api/...` in the browser.
- Node version error: upgrade Node to 20.19+ or 22.12+.
- Mongo connection fails: check `MONGO_URI`, whitelist your IP in Atlas, and restart backend.

---

## 7) That’s it!
If something doesn’t start, send the error message and I’ll help fix it quickly. Have fun! 🎉
