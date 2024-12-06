import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [selectedMovie, setSelectedMovie] = useState(null); // Store selected movie for delete/edit

  const getMovies = () => {
    axios.get('/movies').then((response) => {
      setLists(response.data);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(lists.map((movie) => console.log(movie)))

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
    setSelectedMovie(movie); // Set the movie to delete or edit
    setShowModal(true); // Show modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
    setSelectedMovie(null);
  };

  const handleConfirmDelete = () => {
    if (selectedMovie) {
      handleDelete(selectedMovie.id); // Call delete function
      handleCloseModal(); // Close modal after deletion
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
        <button type="button" onClick={() => navigate('/main/movies/form')}>
          Create New Movie
        </button>
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

                <button
                  className="action-button"
                  onClick={() => handleOpenModal(movie)}
                >
                  &#x270E;
                </button>

                {/* Modal for Delete / Edit */}
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
