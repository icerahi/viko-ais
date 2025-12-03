# VIKO Academic Information System (AIS)

A comprehensive Academic Information System prototype developed for Vilniaus Kolegija (VIKO). This system digitizes the academic process, allowing administrators to manage study data, teachers to grade students, and students to view their academic results.

## 🌐 Live Demo

- **Frontend**: [https://viko-ais.vercel.app](https://viko-ais.vercel.app)
- **Backend API**: [https://viko-ais-backend.vercel.app](https://viko-ais-backend.vercel.app)

## 🌟 Features

- **Role-Based Access Control (RBAC)**: Distinct interfaces and permissions for **Administrators**, **Teachers**, and **Students**.
- **Admin Dashboard**:
  - Manage Students, Teachers, Groups, and Subjects.
  - Assign Teachers to Subjects and Students to Groups.
  - **Search & Filter** capabilities for efficient data management.
- **Teacher Portal**:
  - View assigned subjects.
  - Enter and edit student grades via a secure interface.
- **Student Portal**:
  - View personal grades and subject details.
  - Read-only access ensures data integrity.
- **Modern UI/UX**:
  - Built with **Next.js** and **Tailwind CSS**.
  - Responsive design with dialog-based forms for smooth interaction.
- **Robust Backend**:
  - **Express.js** REST API.
  - **PostgreSQL** database with **Prisma ORM**.
  - Secure authentication using JWT.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Lucide Icons, Sonner (Toast notifications), React Hook Form, Zod.
- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: PostgreSQL, Prisma ORM.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL installed and running
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/icerahi/viko-ais.git
    cd viko-ais
    ```

2.  **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

    - Create a `.env` file in the `backend` directory and configure your database URL:
      ```env
      DATABASE_URL="postgresql://user:password@localhost:5432/viko_ais?schema=public"
      JWT_SECRET="your-super-secret-key"
      PORT=5000
      ```
    - Run database migrations and seed data:
      ```bash
      npx prisma migrate dev --name init
      npx prisma db seed
      ```
    - Start the backend server:
      ```bash
      npm run dev
      ```

3.  **Frontend Setup**

    ```bash
    cd ../frontend
    npm install
    ```

    - Start the frontend development server:
      ```bash
      npm run dev
      ```

4.  **Access the Application**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Login Credentials

The system automatically generates credentials for users created by the Administrator:

**Default Admin Account (from seed):**

- **Login**: `super_admin`
- **Password**: `admin`

## 👥 Authors

- **[MD IMRAN HASAN]**
