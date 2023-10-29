# Authentication System
This authentication system is built using Django REST for the backend and React for the frontend. It uses Djoser for authentication functionalities.

## Backend

- The backend utilizes Django REST framework for building a powerful API.
- Authentication functionalities are handled by Djoser, offering features like signup, login, password reset, etc.
- **Backend Setup**  
    ```bash
    cd backend
    py -m venv env
    env\Scripts\activate
    pip install -r requirements.txt
    ```
- To set up email functionality for account creation, you'll need to set up environment variables. Create a `.env` file inside `backend/core/` with the following content:

  ```plaintext
  EMAIL_HOST_USER=youremail@gmail.com
  EMAIL_HOST_PASSWORD=yourpassword
  DOMAIN=localhost:3000
  SITE_NAME=yourwebsitename
  ```

- For more information on using Djoser, refer to the [official documentation](https://djoser.readthedocs.io/en/latest/).

## Frontend
- **Frontend Setup**  
    ```bash
    cd frontend
    npm install
    ```
- The `axios_instance.js` file handles HTTP requests to the backend API.
- It manages access tokens, refresh tokens, and handles token expiration scenarios.
- The `isLoggedIn` context is utilized across various components to manage user authentication and access control.

## Usage
```bash
# Backend
cd backend
py manage.py runserver
```
```bash
# Frontend
cd frontend
npm start
```