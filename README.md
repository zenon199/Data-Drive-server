# Data Drive Backend

A backend app for managing all your saved links and data to cluster them in a single place

## 🚀 Features

- 🔐 JWT-based Authentication
- 📝 Content Management (CRUD operations)
- 🔗 Shareable Content Links
- 🏷️ Tag-based Content Organization
- 🛡️ Secure Password Hashing
- 📦 MongoDB Database Integration
- 🔄 RESTful API Architecture

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **Validation:** Zod
- **CORS:** Enabled for cross-origin requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd data-drive
```

2. Install dependencies:
```bash
cd server
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
```
PORT=3000
DB=your_mongodb_uri
JWT_SEC=your_jwt_secret
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## 📁 Project Structure

```
server/
├── src/
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middlewares/    # Custom middleware
│   ├── utils/          # Utility functions
│   └── index.ts        # Application entry point
├── dist/              # Compiled JavaScript
├── .env              # Environment variables
└── package.json      # Project dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Abhishek
