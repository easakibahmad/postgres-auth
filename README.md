### Step 1: Initialize a Node.js Project  
npm init -y

### Step 2: Install Dependencies  
npm install express
npm install -D typescript ts-node @types/express @types/node

### Step 3: Configure TypeScript  
npx tsc --init
add below code in tsconfig.json file:
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  }
}

### Step 4: Create the Express App  
import express, { Request, Response } from 'express';

add this into server.ts: 
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

### Step 5: Add Scripts in `package.json`  
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js"
}

### Step 6: Run the Application  
npm run dev

### Step 7: Install ts-node-dev
npm install --save-dev ts-node-dev

### Step 8: Update package.json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
}

### Step 9: Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
sudo -i -u postgres
psql
SELECT usename FROM pg_user; // check users
/q (exit)

### Step 10: If you need to set or reset the password for the default user (postgres)
ALTER USER postgres WITH PASSWORD 'yourpassword';
CREATE DATABASE yourdbname;

### Step 11: Replace password and db name in db url
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/yourdbname

### Step 12: Install postgresql in project
npm install pg dotenv
npm install --save-dev @types/pg