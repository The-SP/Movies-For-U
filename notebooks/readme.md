## Movie Recommendation System

This project implements a movie recommendation system using the TMDb 5000 Movie Dataset. The system is based on metadata including credits, genres, and keywords.

1. Data: Download the dataset and store it inside the data/ directory. [Link to Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata)

2. Recommendation Algorithm: The system leverages metadata such as the top actors, director, related genres, and movie plot keywords. It uses sklearn's CountVectorizer and cosine_similarity to generate similarity scores.

3. Weighted Rating Filtering: The results are then filtered using IMDB's weighted rating (wr) formula to discard low rated movies and prioritize highly rated and popular movies.