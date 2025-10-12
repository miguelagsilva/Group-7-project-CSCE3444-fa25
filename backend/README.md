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

---

#### Get the 'practice' section for a module

- **Method:** `GET`
- **URL Example (for Module ID 4):**
http://127.0.0.1:5000/modules/4/practice

---

#### Get the 'challenge' section for a module

- **Method:** `GET`
- **URL Example (for Module ID 1):**
http://127.0.0.1:5000/modules/1/challenge

---

#### Get the 'quizzes' for a module

- **Method:** `GET`
- **URL Example (for Module ID 2):**
http://127.0.0.1:5000/modules/2/quizzes