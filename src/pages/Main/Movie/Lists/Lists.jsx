import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role') || 'user'; // Fetch the user's role
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedMovie(null);
  };

  const handleConfirmDelete = () => {
    if (selectedMovie) {
      handleDelete(selectedMovie.id); 
      handleCloseModal(); 
    }
  };

  const handleEdit = () => {
    if (selectedMovie) {
      navigate(`/main/movies/form/${selectedMovie.id}`);
      handleCloseModal();
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
              <div className="movie-card" key={movie.id}>
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
                    onClick={() => handleOpenModal(movie)}
                  >
                    &#x270E;
                  </button>
                )}

                {showModal && selectedMovie === movie && (
                  <div className="modal">
                    <div className="modal-content">
                      <h4>{selectedMovie.title}</h4>
                      <p>Do you want to edit or delete this movie?</p>
                      <button onClick={handleEdit}>Edit</button>
                      <button onClick={handleConfirmDelete}>Delete</button>
                      <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
