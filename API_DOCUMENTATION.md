# API Data Contract & Documentation
### **Campus Student Services & Event Management System (CampusHub)**
**Frontend:** ReactJS (Vite + Axios)  
**Backend:** Spring Boot (Spring Security + Spring Data JPA + H2 Database)  
**Base URL:** `http://localhost:8080`

---

## 1. Student / User Registration Endpoint

### **HTTP Method & Endpoint URL**
* **Method:** `POST`
* **URL:** `http://localhost:8080/api/register`

### **Purpose of the Endpoint**
Registers a new student/user account in the system database. The backend validates required fields, verifies that the username is unique, and securely encrypts the password with `BCryptPasswordEncoder` before saving.

### **Request Headers**
| Header Key | Header Value | Description |
| :--- | :--- | :--- |
| `Content-Type` | `application/json` | Specifies the JSON payload format |
| `Accept` | `application/json, text/plain, */*` | Expected response format |

### **Request Body & Data Types**
| Field Name | JSON Key | Data Type | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| Username | `username` | `String` | **Yes** | Unique Student ID or username (e.g., `"23-1937-123"`) |
| Password | `password` | `String` | **Yes** | User account password |
| Full Name | `fullName` | `String` | **No** | Student's complete legal name |
| Email | `email` | `String` | **No** | Institutional or campus email address |

### **Successful Response & Status Code**
* **Status Code:** `200 OK`
* **Response Body:**
  ```text
  User registered successfully!
  ```

### **Error Responses & Status Codes**
* **`400 Bad Request` (Missing Required Fields):**
  ```text
  Username and password are required!
  ```
* **`400 Bad Request` (Duplicate Username):**
  ```text
  Username is already taken!
  ```

### **Sample JSON Request & Response**
* **Sample Request Payload:**
  ```json
  {
    "username": "23-1937-123",
    "password": "StudentPassword123!",
    "fullName": "Juan Dela Cruz",
    "email": "juan.delacruz@cit.edu"
  }
  ```
* **Sample Response Payload:**
  ```text
  User registered successfully!
  ```

---

## 2. Student / User Authentication (Login) Endpoint

### **HTTP Method & Endpoint URL**
* **Method:** `POST`
* **URL:** `http://localhost:8080/api/login`

### **Purpose of the Endpoint**
Authenticates existing student credentials against the database. Upon verification, generates and returns an authentication session token and success message which the React client stores in `localStorage` for session persistence.

### **Request Headers**
| Header Key | Header Value | Description |
| :--- | :--- | :--- |
| `Content-Type` | `application/json` | Specifies the JSON payload format |
| `Accept` | `application/json` | Expected response format |

### **Request Body & Data Types**
| Field Name | JSON Key | Data Type | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| Username | `username` | `String` | **Yes** | Registered Student ID or username |
| Password | `password` | `String` | **Yes** | Account password |

### **Successful Response & Status Code**
* **Status Code:** `200 OK`
* **Response Content-Type:** `application/json`
* **Response Body Structure:**
  ```json
  {
    "token": "String",
    "message": "String"
  }
  ```

### **Error Responses & Status Codes**
* **`400 Bad Request` (Missing Required Credentials):**
  ```text
  Username and password are required!
  ```
* **`401 Unauthorized` (Invalid Username or Wrong Password):**
  ```text
  Invalid username or password
  ```

### **Sample JSON Request & Response**
* **Sample Request Payload:**
  ```json
  {
    "username": "23-1937-123",
    "password": "StudentPassword123!"
  }
  ```
* **Sample Response Payload (`200 OK`):**
  ```json
  {
    "token": "dummy-jwt-token-xyz",
    "message": "Login successful"
  }
  ```

---

## 3. Get Student Details by ID Endpoint *(Secured)*

### **HTTP Method & Endpoint URL**
* **Method:** `GET`
* **URL:** `http://localhost:8080/api/user/{id}` (e.g. `http://localhost:8080/api/user/1`)

### **Purpose of the Endpoint**
Retrieves user account information for a specified student ID. This is a protected endpoint that requires HTTP Basic Authentication.

### **Request Headers**
| Header Key | Header Value | Description |
| :--- | :--- | :--- |
| `Authorization` | `Basic <Base64(username:password)>` | HTTP Basic Auth credentials |
| `Accept` | `application/json` | Expected response format |

### **Request Parameters**
| Parameter | Location | Data Type | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Path Variable (`/api/user/{id}`) | `Long` | **Yes** | Unique auto-generated User ID |

### **Request Body**
* None (`GET` request).

### **Successful Response & Status Code**
* **Status Code:** `200 OK`
* **Response Body Structure:**
  ```json
  {
    "id": 1,
    "username": "23-1937-123",
    "fullName": "Juan Dela Cruz",
    "email": "juan.delacruz@cit.edu"
  }
  ```

### **Error Responses & Status Codes**
* **`401 Unauthorized` (Missing or invalid Basic Auth header):**
  ```json
  {
    "timestamp": "2026-08-20T12:00:00.000+00:00",
    "status": 401,
    "error": "Unauthorized",
    "path": "/api/user/1"
  }
  ```
* **`404 Not Found` (User ID does not exist in database):**
  * Empty response body with HTTP Status 404.

### **Sample JSON Request & Response**
* **Request:** `GET http://localhost:8080/api/user/1`
* **Sample Response Payload (`200 OK`):**
  ```json
  {
    "id": 1,
    "username": "23-1937-123",
    "fullName": "Juan Dela Cruz",
    "email": "juan.delacruz@cit.edu"
  }
  ```

---

## 4. Get All Registered Students Endpoint *(Secured)*

### **HTTP Method & Endpoint URL**
* **Method:** `GET`
* **URL:** `http://localhost:8080/api/users`

### **Purpose of the Endpoint**
Lists all registered users in the database excluding sensitive password hashes.

### **Request Headers**
| Header Key | Header Value | Description |
| :--- | :--- | :--- |
| `Authorization` | `Basic <Base64(username:password)>` | HTTP Basic Auth credentials |
| `Accept` | `application/json` | Expected response format |

### **Request Body**
* None (`GET` request).

### **Successful Response & Status Code**
* **Status Code:** `200 OK`
* **Response Body Structure:** JSON Array of User DTOs.

### **Error Responses & Status Codes**
* **`401 Unauthorized`:** Missing or invalid credentials.

### **Sample JSON Request & Response**
* **Request:** `GET http://localhost:8080/api/users`
* **Sample Response Payload (`200 OK`):**
  ```json
  [
    {
      "id": 1,
      "username": "23-1937-123",
      "fullName": "Juan Dela Cruz",
      "email": "juan.delacruz@cit.edu"
    },
    {
      "id": 2,
      "username": "rabanal",
      "fullName": "Rabanal Student",
      "email": "rabanal@example.com"
    }
  ]
  ```

---

## 5. Summary of API Status Codes

| Status Code | Meaning | Occurs When |
| :---: | :--- | :--- |
| **`200 OK`** | Success | Registration succeeded, login authenticated, or data retrieved |
| **`400 Bad Request`** | Client Error | Missing required fields (`username`/`password`) or username already exists |
| **`401 Unauthorized`** | Auth Failure | Invalid password on login, or missing/invalid credentials on protected routes |
| **`404 Not Found`** | Resource Missing | Requested user ID does not exist in the database |
