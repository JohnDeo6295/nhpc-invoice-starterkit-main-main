🧾 NHPC Invoice Starter Kit

A full-stack invoice management starter kit built with TypeScript, featuring both backend and frontend implementations. Perfect for customizing your own billing system.

📦 Project Structure

nhpc-invoice-starterkit-main
├── backend/          # API + server logic (Prisma, Hono)
├── client/           # Frontend application (React, Next.js, etc.)
├── README.md         # Documentation
├── .env.example      # Example environment variables
└── package.json      # Root project config (optional)

🚀 Features

Full-stack invoice management solution

Backend API with TypeScript support

Database integration using Prisma ORM

Frontend UI for managing clients, products, and invoices

Starter workflows to customize your billing system

🧠 Tech Stack

Layer
Technology
Backend
TypeScript, Node.js, Prisma, Hono
Frontend
React / TypeScript (Next.js or similar)
Database
Prisma-supported DB (SQLite, PostgreSQL, etc.)
Tooling
tsx for running TypeScript directly
🔧 Requirements
Ensure you have installed:
Node.js (recommended: v20 LTS)
npm (Node Package Manager)
A database (SQLite by default, or configure PostgreSQL/MySQL/etc.)
🛠️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-repo/nhpc-invoice-starterkit.git
cd nhpc-invoice-starterkit-main
2️⃣ Backend Setup
cd backend
npm install
Create a .env file:
cp .env.example .env
Set your DATABASE_URL in .env.
Generate Prisma Client:
npx prisma generate
Push schema to the database:
npx prisma db push
Start the backend:
npm run dev
3️⃣ Frontend Setup
cd ../client
npm install
npm run dev
Visit: http://localhost:3000

📌 Scripts
Backend
Command
Description
npm run dev
Run backend in development mode
npx prisma generate
Generate Prisma client
npx prisma db push
Push schema to DB
Frontend
Command
Description
npm run dev
Run frontend in development
🧾 Environment Variables
Your .env should include at least:

DATABASE_URL="your_database_connection_string"
PORT=8787

(Customize based on your project setup)

💡 Contributing

Contributions are welcome! 🎉

Fork the project

Create a feature branch

Commit your changes

Open a Pull Request

✨ With this starter kit, you can quickly spin up a scalable invoice management system and adapt it to your business needs.