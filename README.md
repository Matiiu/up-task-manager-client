# Up Task Manager

Up Task Manager is a web application designed to streamline project management by enabling users to create and manage projects, add tasks with collaborators, update task statuses, and leave notes. Built with modern technologies like React, Node, Express, TypeScript, MongoDB, Tailwind CSS, and React Query, this app also includes user authentication with JWT for a secure, long-lasting login experience.

## Table of Contents

- [Up Task Manager](#up-task-manager)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Code Style](#code-style)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
    - [Project Creation](#project-creation)
    - [Task Management](#task-management)
    - [Dashboard](#dashboard)
    - [Authentication](#authentication)
  - [Environment Variables](#environment-variables)
  - [Folder Structure](#folder-structure)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication-1)
    - [Projects](#projects)
    - [Tasks](#tasks)
    - [Collaborators](#collaborators)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Project Management**: Create and organize multiple projects.
- **Task Management**: Add tasks to each project, assign collaborators, update statuses, and add notes.
- **Collaborators**: Invite and manage collaborators on tasks.
- **Dashboard**: Access a central dashboard to view and update task statuses in real-time.
- **Authentication**: Secure login with JWT tokens that expire in 30 days for a seamless user experience.

## Technologies Used

- **Frontend**

  - [React](https://reactjs.org/) with TypeScript: A JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for fast UI styling.
  - [React Query](https://tanstack.com/query/latest): Powerful data-fetching library for managing server state in React apps.

- **Backend**

  - [Node.js](https://nodejs.org/): JavaScript runtime for server-side scripting.
  - [Express](https://expressjs.com/): Minimalist web framework for Node.js.
  - [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript for more predictable code.
  - [MongoDB](https://www.mongodb.com/): NoSQL database for storing project and task data.

- **Authentication**
  - [JWT (JSON Web Token)](https://jwt.io/): Provides secure token-based authentication with a 30-day token expiry for extended access.

## Code Style

This project uses [Prettier](https://prettier.io/) for code formatting, ensuring consistent code style across the codebase. The Prettier configuration is set up in the root folder, so code is automatically formatted according to specified rules.

To format code manually, run:

```bash
pnpm run format .
```

To ensure Prettier is applied automatically, you can configure it in your editor or add a pre-commit hook.

## Installation

### Prerequisites

- Node.js
- MongoDB (local instance or MongoDB Atlas for a cloud database)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/up-task-manager.git
   cd up-task-manager
   ```

2. **Install Dependencies**

   - For the backend:
     ```bash
     cd backend
     pnpm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     pnpm install
     ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the `backend` folder and add the following:

     ```plaintext
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRY=30d
     ```

4. **Start the Application**

   - Run the backend server:
     ```bash
     cd backend
     pnpm run dev
     ```
   - Run the frontend:
     ```bash
     cd frontend
     pnpm start
     ```

5. **Access the Application**
   - Open your browser and go to `http://localhost:3000` to access the Up Task Manager interface.

## Usage

### Project Creation

- Users can create projects to organize tasks and plan progress.

### Task Management

- Inside each project, users can create multiple tasks and update their status.
- Tasks support adding collaborators and leaving notes for better collaboration and tracking.

### Dashboard

- The Dashboard provides a real-time overview of all tasks, allowing users to update statuses directly from the interface.

### Authentication

- Secure login is implemented using JWT (JSON Web Token), and tokens are set to expire every 30 days, maintaining user sessions over a long period without frequent reauthentication.

## Environment Variables

The following environment variables are required for the backend:

- `PORT`: The port on which the server runs.
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT token generation.
- `JWT_EXPIRY`: JWT token expiration time, set to 30 days.

## Folder Structure

Here's a high-level overview of the project structure:

```plaintext
plaintext
up-task-manager/
│
├── backend/
│   ├── controllers/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── profiles/
│   │   └── team/
│   ├── models/
│   ├── routes/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── profiles/
│   │   └── team/
│   ├── middleware/
│   ├── utils/
│   ├── app.ts      # Main application entry
│   └── server.ts   # Starts the server
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── projects/
    │   │   ├── tasks/
    │   │   ├── profiles/
    │   │   └── team/
    │   ├── views/
    │   │   ├── projects/
    │   │   ├── tasks/
    │   │   ├── profiles/
    │   │   └── team/
    │   ├── routers/
    │   │   ├── projects/
    │   │   ├── tasks/
    │   │   ├── profiles/
    │   │   └── team/
    │   ├── api/
    │   │   ├── projects/
    │   │   ├── tasks/
    │   │   ├── profiles/
    │   │   └── team/
        │   ├── types/.    # Dynamic types
    │   ├── layouts/       # Shared layouts for consistent structure
    │   ├── hooks/         # Custom React hooks
    │   ├── utils/         # Reusable utilities
    │   ├── App.tsx        # Main React component
    │   └── tailwind.config.js
```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate user and return a JWT.

### Projects

- `GET /api/projects`: Get all projects.
- `POST /api/projects`: Create a new project.
- `PUT /api/projects/:id`: Update a specific project.
- `DELETE /api/projects/:id`: Delete a project.

### Tasks

- `POST /api/projects/:projectId/tasks`: Add a task to a project.
- `PUT /api/tasks/:taskId`: Update task details, including status and notes.
- `DELETE /api/tasks/:taskId`: Delete a task.

### Collaborators

- `POST /api/tasks/:taskId/collaborators`: Add a collaborator to a task.
- `DELETE /api/tasks/:taskId/collaborators/:collaboratorId`: Remove a collaborator from a task.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the MIT License.
