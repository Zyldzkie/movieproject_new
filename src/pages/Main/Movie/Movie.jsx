import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Movie.css';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const userRole = localStorage.getItem('role') || 'user'; // Fetch the role from localStorage

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/movies');
        const data = response.data;
        setMovies(data);

        // Find all featured movies
        const featuredMovies = data.filter(
          (movie) => movie.isFeatured === true || movie.isFeatured === 1
        );

        if (featuredMovies.length > 0) {
          // Randomly select one from the featured movies
          const randomIndex = Math.floor(Math.random() * featuredMovies.length);
          setFeaturedMovie(featuredMovies[randomIndex]);
        } else {
          console.log('No featured movies found. Available movies:', data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();

    // Set favorite movies
    setFavoriteMovies([
      {
        id: 1,
        title: "The Dark Knight",
        poster_path: "https://image.tmdb.org/t/p/original/cz8MjCVSPOq7SKtTRp1APeO6zWh.jpg",
      },
      {
        id: 2,
        title: "The Matrix",
        poster_path: "https://image.tmdb.org/t/p/original/qxHcqkbjvjaD4rTp0Y1ZZCwIj6i.jpg",
      },
    ]);
  }, []);

  const handleEditClick = () => {
    if (featuredMovie) {
      console.log('Featured Movie:', featuredMovie);
      console.log('Navigating to ID:', featuredMovie.id);
      navigate(`/main/movies/form/${featuredMovie.id}`);
    }
  };

  return (
    <div className="movie-layout">
      <div className="left-side">
        <div className="first-row">
          <div className="featured-movie-card">
            {featuredMovie ? (
              <div className="featured-movie-info">
                <img
                  src={featuredMovie.poster_path}
                  alt={featuredMovie.title}
                  className="featured-movie-poster"
                />
                <div className="movie-details">
                  <h2>{featuredMovie.title}</h2>
                  <p>
                    <strong>Release Date:</strong> {featuredMovie.release_date}
                  </p>
                  <p>
                    <strong>Rating:</strong> {featuredMovie.vote_average}
                  </p>
                  <p>
                    <strong>Overview:</strong> {featuredMovie.overview}
                  </p>
                </div>
              </div>
            ) : (
              <p>Loading featured movie...</p>
            )}

            {userRole === 'admin' && ( // Only show the Edit button for admins
              <button className="edit-button" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </div>

          <div className="search-movies-card">
            <h3>Search Movies</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie..."
            />
            <button style={{ backgroundColor: '#F8B319', marginTop: '10px' }}>
              Search
            </button>
          </div>
        </div>

        <div className="second-row">
          <div className="movie-list-card">
            <h3>Movie List</h3>
            <Outlet />
          </div>

          <div className="favorites-container">
            <h3>Favorite Movies</h3>
            {favoriteMovies.length > 0 ? (
              <ul>
                {favoriteMovies.map((movie) => (
                  <li key={movie.id}>
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="favorite-movie-poster"
                    />
                    <p>{movie.title}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No favorites yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
