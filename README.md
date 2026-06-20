# Vibe Coding

Vibe Coding is a full-stack web application built using Angular for the frontend and Node.js with Express.js for the backend. The application uses MySQL/TiDB as its database and follows a REST API architecture.

## Tech Stack

### Frontend
- Angular
- TypeScript
- RxJS
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MySQL (Local Development)
- TiDB Cloud (Production)



### Clone the Repository

### Frontend Setup

```bash
git clone https://github.com/ankitsendhav8/vibe-coding-frontend.git
cd vibe-coding-frontend
npm install
npm start
```

Frontend will run on:

```text
http://localhost:4200
```


### Backend Setup

```bash
git clone https://github.com/ankitsendhav8/Vibe-Coding.git
cd Vibe-Coding/vibe-coding-backend
npm install
npm start
```

Backend will run on:

```text
http://localhost:3000
```


## Environment Variables

Create a `.env` file inside the `Vibe-Coding/vibe-coding-backend` folder:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:4200

== MYSQL CONNECTION

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=vibecodingdb

== TIDB Connection

DB_SERVER=gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com
DB_PORT=4000
DB_NAME=vibecodingdb
DB_USER=your_user
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

## Live Application

### Frontend

https://vibe-coding-frontend-ikrw.onrender.com
## Database

The application uses:

- MySQL for local development
- TiDB Cloud for production deployment

Update database credentials in the `.env` file before running the application.

## Author

**Ankit Sendhav**

GitHub: https://github.com/ankitsendhav8
