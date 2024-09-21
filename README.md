# Quthm Task Management App

## Overview

The **Quthm Task Management App** is a comprehensive backend solution designed to facilitate task management for users. It leverages **Node.js**, **Nest.js**, **Express.js**, **MongoDB**, and **Sockets** for real-time communication, providing a robust platform to manage and monitor tasks efficiently.

Users can create and manage tasks while receiving real-time updates on task statuses, making collaboration and task tracking seamless.

---

## Features

- **Task Management**: Users can create, update, and delete tasks.
- **Real-Time Communication**: Socket-based notifications for task updates.
- **User Authentication**: JWT-based authentication for secure access to user-specific tasks.

---

## Tech Stack

The backend of the Quthm Task Management App was developed using the following technologies:

- **Node.js**: JavaScript runtime for building scalable applications.
- **Nest.js**: Framework for building efficient and scalable server-side applications.
- **Express.js**: Web framework for handling HTTP requests and responses.
- **MongoDB**: NoSQL database for storing and managing task data.
- **Socket.io**: For real-time, bi-directional communication between the client and server.

---

## Installation and Setup

To run the Quthm Task Management App locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://gitlab.com/muhammadwaleed872.tts/task-management-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd quthm-task-management
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up your environment variables by creating a `.env.development` for development in env folder (root director) 

    ```bash
    DATABASE_URL=your_mongodb_uri
    ACCESS_TOKEN_EXPIRY=15m
    REFRESH_TOKEN_EXPIRY='2d'
    JWT_ACCESS_SECRET_KEY=your_jwt_secret
    JWT_REFRESH_SECRET_KEY=your_jwt_secret
    WORKSPACE_EMAIL=youemail@yahoo.com
    WORKSPACE_PASSWORD=password

    ```

5. Run the server in development mode:
    ```bash
    npm run start:dev
    ```

---

## Authentication

This application uses **JWT (JSON Web Token)** for authentication. Users must be authenticated to create, update, or delete tasks. Token-based authentication is used to ensure that each request is made by an authorized user.

---

## Usage

Once the server is running, users can interact with the following task management features:

- **Create a Task**: Users can create new tasks, providing details such as title, description, and due date.
- **Update Tasks**: Modify existing tasks, updating their status or content.
- **Delete Tasks**: Remove tasks that are no longer needed. Only **admin** and **super admin** can delete task.
- **Real-Time Updates**: Receive instant updates when tasks are modified or completed through Socket.io.

---

## Important Note
To revoke jwt i am sending accessToken with less expire time and refreshToken with long expiry time

I have not implemented completely for revoking mechanism in this version.

