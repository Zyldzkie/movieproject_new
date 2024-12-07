import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role') || 'user'; // Fetch the user's role
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [showActionModal, setShowActionModal] = useState(false); // State for action modal
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State for movie details modal
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getMovies = () => {
    axios.get('/movies').then((response) => {
      setLists(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = (id) => {
    const isConfirm = window.confirm('Are you sure you want to delete this movie?');
    if (isConfirm) {
      axios
        .delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          setLists(lists.filter((movie) => movie.id !== id));
        })
        .catch((error) => {
          console.error(error);
          alert('Error deleting the movie!');
        });
    }
  };

  const handleOpenActionModal = (movie) => {
    setSelectedMovie(movie); 
    setShowActionModal(true);
  };

  const handleCloseActionModal = () => {
    setShowActionModal(false);
    setSelectedMovie(null);
  };

  const handleOpenDetailsModal = (movie) => {
    setSelectedMovie(movie);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedMovie(null);
  };

  const handleConfirmDelete = () => {
    if (selectedMovie) {
      handleDelete(selectedMovie.id); 
      handleCloseActionModal();
    }
  };

  const handleEdit = () => {
    if (selectedMovie) {
      navigate(`/main/movies/form/${selectedMovie.id}`);
      handleCloseActionModal();
    }
  };

  return (
    <div className="lists-container">
      <div className="create-container">
        {userRole === 'admin' && ( // Only show the "Create New Movie" button for admins
          <button type="button" onClick={() => navigate('/main/movies/form')}>
            Create New Movie
          </button>
        )}
      </div>

      <div className="movie-list-container">
        {lists.length === 0 ? (
          <p>No movies available</p>
        ) : (
          <div className="movie-grid">
            {lists.map((movie) => (
              <div 
                className="movie-card" 
                key={movie.id}
                onClick={() => handleOpenDetailsModal(movie)} // Open the details modal on click
              >
                <img 
                  src={`${movie.posterPath}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h4>{movie.title}</h4>
                </div>

                {userRole === 'admin' && ( // Only show action buttons for admins
                  <button
                    className="action-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the details modal
                      handleOpenActionModal(movie);
                    }}
                  >
                    &#x270E;
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Movie Details (Poster, Title, Description) */}
      {showDetailsModal && selectedMovie && (
        <div className="modal backdrop">
          <div className="modal-content details-modal">
            
            <img 
              src={selectedMovie.posterPath} 
              alt={selectedMovie.title} 
              className="modal-poster"
            />
            <h4>{selectedMovie.title}</h4>
            <p>{selectedMovie.description}</p>
            <button onClick={handleCloseDetailsModal} className="close-btn">Close</button>
          </div>
        </div>
      )}

      {/* Modal for Editing or Deleting Movie */}
      {showActionModal && selectedMovie && (
        <div className="modal backdrop">
          <div className="modal-content">
            
            <h4>{selectedMovie.title}</h4>
            <p>Do you want to edit or delete this movie?</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleConfirmDelete}>Delete</button>
            <button onClick={handleCloseActionModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lists;
