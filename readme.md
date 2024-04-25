# Movies For U

Movies For U is a full-stack application for discovering movies and getting recommendations. It utilizes Django Rest Framework for the backend and React for the frontend. The recommendation system uses sklearn, offering personalized movie suggestions based on metadata analysis.

## Features:

- **Authentication System**: Securely register and log in to manage your movie preferences.
- **Search Movies**: View current popular movies. Easily search for movies based on titles or keywords.
- **Bookmark**: Add movies to your watchlist or bookmark them for future viewing.
- **Movie Recommendations**: Like movies to receive recommendations tailored to your preferences.

## Project Setup

### Backend Setup

1. Install packages

   ```bash
   # Create a virtual environment to isolate our package dependencies locally
   python -m venv env
   env\Scripts\activate

   # Install required packages
   pip install -r requirements.txt
   ```

2. To enable sending email notifications to users (e.g., for account creation, password reset), you need to configure email settings. Create a .env file inside backend/core/ with the following content:

   ```bash
   EMAIL_HOST_USER=youremail@gmail.com
   EMAIL_HOST_PASSWORD=yourpassword
   DOMAIN=localhost:3000
   SITE_NAME=yourwebsitename
   ```

3. To set up backend for recommendation system

   - Create a `.env` file inside `backend/movies` with following content:  
      `TMDB_API_KEY=YOUR_TMDB_API_KEY`
   - Run `notebooks\movie.ipynb` to create `tmdb_5000.csv`, `count_matrix.pkl` and `vectorizer.pkl`. Then, store these files inside `backend\movies\data`.

4. Set up PostgreSQL database
   In backend/core/settings.py, update the DATABASES setting with your PostgreSQL credentials:
   ```py
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'your_database_name',
            'USER': 'your_database_user',
            'PASSWORD': 'your_database_password',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    ```

### Frontend Setup

1. Install packages
   ```bash
   cd frontend
   npm install
   ```
2. To set up tmdb api key, create a `.env` file inside `frontend`
   `REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY`

## Running the server and frontend

```bash
# Run backend
py manage.py runserver
# Run frontend
npm start
```

## Recommendation System

This project incorporates a movie recommendation system using the TMDb Movie Dataset. The recommendation engine is based on metadata, including credits, genres, and keywords. It utilizes sklearn for generating movie recommendations.

- For further experimentation with the recommender, refer to the notebooks in the `notebooks` folder.
