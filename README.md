# Lucky 7 - LeetCode For Kids
LeetCode for Kids is a web application that enables children to learn how to program in Python interactively.

# Team Members
- Aminat Usman:Team Coordinator, Frontend Developer
- Miguel Silva: Frontend Development Coordinator / Requirements
Coordinator
- Arnav Saxena: Backend Development Coordinator
- Alfredo Guevara: Backend Developer, Test Coordinator

# Trello Board
https://trello.com/b/BnjQRkx7/group-7-project-csce3444-fa25

## How to Run the Application 
### Backend
0. Requirements:
   - Python 3.x
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
    python3 -m pip install -r requirements.txt
    ```
3. Run the Flask application:
   ```bash
   python3 flask run
   ```
4. The backend server will start running at `http://127.0.0.1:5000/`.
### Frontend
0. Requirements:
   - Node.js v24.x or higher
   - npm 11.x or higher
1. Navigate to the frontend directory:
   ```bash
    cd frontend
    ```
2. Install the required dependencies:
    ```bash
     npm install
     ```
3. Start the React application:
    ```bash
     npm run dev
     ```
     

# Leetcode for Kids API - Quickstart Guide

This document provides quick, copy-and-paste examples for testing the API endpoints using a tool like Postman.

**Base URL:** `http://127.0.0.1:5000`

---

### 1. Get All Modules

Returns a list of all available learning modules.

- **Method:** `GET`
http://127.0.0.1:5000/modules


---

### 2. Get a Single Complete Module

Returns all data associated with a single module, including its learn, practice, challenge, and quiz sections.

- **Method:** `GET`
- **URL Example (for Module ID 2):**

http://127.0.0.1:5000/modules/2

---

### 3. Get a Specific Section from a Module

Returns just one part of a specific module (e.g., only the quiz questions).

#### Get the 'learn' section for a module

- **Method:** `GET`
- **URL Example (for Module ID 3):**

http://127.0.0.1:5000/modules/3/learn

#### Get the 'practice' section for a module

- **Method:** `GET`
- **URL Example (for Module ID 4):**
http://127.0.0.1:5000/modules/4/practice


#### Get the 'challenge' section for a module

- **Method:** `GET`
- **URL Example (for Module ID 1):**
http://127.0.0.1:5000/modules/1/challenge


#### Get the 'quizzes' for a module

- **Method:** `GET`
- **URL Example (for Module ID 2):**
http://127.0.0.1:5000/modules/2/quizzes