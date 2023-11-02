import pandas as pd
import numpy as np
import pickle
from ast import literal_eval

from sklearn.metrics.pairwise import cosine_similarity


# Parse the stringified features into their corresponding python objects
def parse_stringified_features(df):
    features = ["cast", "crew", "keywords", "genres"]
    for feature in features:
        # Replace NaN values with an empty string
        df[feature] = df[feature].fillna("")

        # df[feature] = df[feature].apply(literal_eval)
        df[feature] = df[feature].apply(lambda x: literal_eval(x) if x else [])


# Get the director's name from the crew feature. If director is not listed, return NaN
def get_director(crew_list):
    for crew in crew_list:
        if crew["job"] == "Director":
            return crew["name"]
    return np.nan


# Returns only the names from given list
def get_names_from_list(x):
    if isinstance(x, list):
        names = [row["name"] for row in x]
        # Check if more than 3 elements exist. If yes, return only first three. If no, return entire list.
        if len(names) > 3:
            names = names[:3]
        return names
    return []


# Convert all strings to lower case and strip names of spaces
def clean_data(x):
    if isinstance(x, list):
        return [str.lower(i.replace(" ", "")) for i in x]
    else:
        # Check if director exists. If not, return empty string
        if isinstance(x, str):
            return str.lower(x.replace(" ", ""))
        else:
            return ""


def create_combined_features_data(df):
    return (
        " ".join(df["cast"])
        + " "
        + df["director"]
        + " "
        + " ".join(df["genres"])
        + " "
        + " ".join(df["keywords"])
    )


def preprocess_df(df):
    # Parse the stringified features into their corresponding python objects
    parse_stringified_features(df)

    # Define new director, cast, genres and keywords features that are in  a suitable form
    df["director"] = df["crew"].apply(get_director)

    for feature in ["cast", "keywords", "genres"]:
        df[feature] = df[feature].apply(get_names_from_list)

    # Apply clean_data function to features
    features = ["cast", "keywords", "director", "genres"]
    for feature in features:
        df[feature] = df[feature].apply(clean_data)

    df["combined_features_data"] = df.apply(create_combined_features_data, axis=1)


df = pd.read_csv("./movies/data/tmdb_5000.csv")


def get_recommendations(input_df):
    preprocess_df(input_df)

    # Load the vectorizer
    with open("./movies/data/vectorizer.pkl", "rb") as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)
    # Load the count matrix
    with open("./movies/data/count_matrix.pkl", "rb") as count_matrix_file:
        count_matrix = pickle.load(count_matrix_file)

    # Transform the combined_features_data of input_df into a count matrix
    count_matrix_input = vectorizer.transform(input_df["combined_features_data"])

    # Calculate cosine similarity
    cosine_sim_input = cosine_similarity(count_matrix, count_matrix_input)

    # Aggregate similarity scores for all movies in input_df
    total_sim_scores = cosine_sim_input.sum(axis=1)

    # Get the indices of the top recommendations
    top_indices = total_sim_scores.argsort()[::-1]

    # top_indices may include movies in input_df
    top_n = 10 + input_df.shape[0]

    # Get the top recommended movies and their corresponding scores
    top_recommendations = df.iloc[top_indices[:top_n]].copy()

    top_scores = total_sim_scores[top_indices[:top_n]]
    top_recommendations["Similarity Score"] = top_scores

    # Exclude rows present in input_df based on 'id'
    top_recommendations = top_recommendations[
        ~top_recommendations["id"].isin(input_df["id"])
    ]

    return top_recommendations
