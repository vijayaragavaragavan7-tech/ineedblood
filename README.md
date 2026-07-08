# 🩸 INeedBlood — Blood Bank Management & Donor Locator System

MERN stack final year project. Full code — backend + frontend.

## Folder Structure
```
bloodbank/
├── backend/     → Node + Express + MongoDB API
└── frontend/    → React + Vite + Tailwind CSS UI
```

## 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy `.env.example` and fill your own values):
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ineedblood?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Run the server:
```bash
npm run dev
```
Server starts at `http://localhost:5000`. You should see:
- `🚀 Server running on port 5000`
- `✅ MongoDB Connected... (db: ineedblood)`

## 2. Frontend Setup

Open a **new terminal**:
```bash
cd frontend
npm install
npm run dev
```
Frontend starts at `http://localhost:5173`.

## 3. Test the Flow
1. Go to `http://localhost:5173`
2. Register as a donor (`/register`)
3. Search donors by blood group / city (`/search`)
4. Raise an emergency request (`/emergency`) — matching donors get an email
5. Login as admin (manually set a user's `role: "admin"` in MongoDB Atlas) → manage inventory & requests at `/dashboard`

## Notes
- **EMAIL_PASS** must be a Gmail **App Password** (not your normal Gmail password) — enable 2FA on your Google account, then generate one at https://myaccount.google.com/apppasswords
- To make a user an admin: open MongoDB Atlas → `ineedblood` database → `users` collection → edit their `role` field to `"admin"`
- Tailwind CSS handles all styling — simple red & white theme, mobile responsive

## API Endpoints Summary
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/profile | Private |
| GET | /api/donors/search | Public |
| PUT | /api/donors/profile | Private (donor) |
| GET | /api/donors | Admin |
| POST | /api/requests | Public |
| GET | /api/requests | Admin |
| PUT | /api/requests/:id | Admin |
| GET | /api/inventory | Public |
| PUT | /api/inventory/:bloodGroup | Admin |
