import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Form.css';
import Pagination from '../../Components/Pagination';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);  
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ url: '', description: '' });

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        const movieData = {
          id: response.data.id,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: `https://image.tmdb.org/t/p/original/${response.data.posterPath}`,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
          backdrop_path: `https://image.tmdb.org/t/p/original/${response.data.backdropPath}`,
        };
        setSelectedMovie(movieData);
      })
      .catch((error) => {
        console.error('Load error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        alert('Error! Failed to load movie details.');
      });
    }
  }, [movieId]);

  const handleSearch = useCallback(() => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      headers: {
        Accept: 'application/json',
        Authorization: 
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzBkMDFhODljNzMyMDk4ZDYzZjQ2YTQzYWQ5OTE2NCIsIm5iZiI6MTczMzQxMDIwMC44NDgsInN1YiI6IjY3NTFiZDk4ODAyYmFkMTYwOTFhOGIzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0BE3YmIIEl8N_L_zjJAsoKj9cpleZLybaFda3n7rak',
      },
    })
    .then((response) => {
      setSearchedMovieList(response.data.results);
      setTotalResults(response.data.total_results);
      setTotalPages(Math.ceil(response.data.total_results / rowsPerPage)); 
    })
    .catch((error) => {
      console.error(error);
      alert('Error! Failed to get movies.');
    });
  }, [query, currentPage, rowsPerPage]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    
    // Fetch videos from TMDB API
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
      params: {language: 'en-US'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2U5YzQxODc0ZjZmNDNlNzIwMTI1MDliOTk3ODA4NyIsIm5iZiI6MTczMzUwNDY5Ni40NDMsInN1YiI6IjY3NTMyZWI4MzdmMTg1NjIwMjA4OWJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pFvghKo2N7OPMDYvuT3kr8oefTdNjRPCgchdjCrq3RA'
      }
    };

    axios.request(options)
      .then(response => {
        // Transform TMDB video data to match your format
        const transformedVideos = response.data.results.map(video => ({
          url: `https://www.youtube.com/watch?v=${video.key}`,
          description: video.name,
          type: video.type,
          dateCreated: new Date().toISOString()
        }));
        setVideos(transformedVideos);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        setVideos([]);
      });
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    
    if (!selectedMovie) {
      alert('Please search and select a movie.');
      return;
    }

    try {
  
      const movieResponse = await axios({
        method: movieId ? 'patch' : 'post',
        url: movieId ? `/movies/${movieId}` : `/movies`,
        data: {
          tmdbId: selectedMovie.id,  
          title: selectedMovie.original_title,
          overview: selectedMovie.overview,
          popularity: selectedMovie.popularity,
          releaseDate: selectedMovie.release_date,
          voteAverage: selectedMovie.vote_average,
          backdropPath: 'https://image.tmdb.org/t/p/original' + selectedMovie.backdrop_path,
          posterPath: 'https://image.tmdb.org/t/p/original' + selectedMovie.poster_path,
          isFeatured: 0,
          userId: userId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      


      const savedMovieId = movieResponse.data.id; 
      console.log(savedMovieId)

      const videoPromises = videos.map(video => {
        const videoData = {
          userId: userId,
          movieId: savedMovieId, 
          url: video.url,
          description: video.description,
          dateCreated: new Date().toISOString(),
          dateUpdated: new Date().toISOString()
        };

        console.log('Saving video data:', videoData);

        return axios({
          method: 'post',
          url: `/admin/videos`,
          data: videoData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
      });

      const videoResults = await Promise.all(videoPromises);
      console.log('Videos saved successfully:', videoResults);

      alert('Movie and videos saved successfully!');
      navigate('/main/movies');
    } catch (error) {
      console.error('Save error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        endpoint: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      });
      alert(`Error saving: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setTotalPages(Math.ceil(totalResults / newRowsPerPage)); 
    setCurrentPage(1); 
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  const handleAddVideo = () => {
    if (newVideo.url && newVideo.description) {
      setVideos([...videos, newVideo]);
      setNewVideo({ url: '', description: '' });
    }
  };

  console.log(selectedMovie)

  useEffect(() => {
    if (query) handleSearch();
  }, [currentPage, rowsPerPage]);

  return (
    <>
      <h1>{movieId ? 'Edit Movie' : 'Create Movie'}</h1>

      {!movieId && (
        <>
          <div className='search-container'>
            <label>Search Movie:</label>
            <input type='text' onChange={(event) => setQuery(event.target.value)} />
            <button type='button' onClick={handleSearch}>Search</button>
            <div className='searched-movie' style={{ maxHeight: '300px', overflowY: 'scroll' }}>
              {searchedMovieList.slice(0, rowsPerPage).map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              handlePreviousPage={handlePreviousPage} 
              handleNextPage={handleNextPage} 
              rowsPerPage={rowsPerPage}
              handleRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>
          <hr />
        </>
      )}

      {selectedMovie && (
        <div className='container'>
          <form>
            <div className="image-row" style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                className='poster-image'
                src={selectedMovie.posterPath}
                alt={`${selectedMovie.original_title} poster`}
                style={{ height: '200px' }}
              />
              <img 
              className='backdrop-image'
              src={selectedMovie.backdropPath} 
              alt={`${selectedMovie.original_title} poster`}
              style={{ height: '200px' }}
              />
            </div>
           
            <div className='field'>
              <label>Title:</label>
              <input
                type='text'
                value={selectedMovie.original_title}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, original_title: e.target.value, title: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Overview:</label>
              <textarea
                rows={10}
                value={selectedMovie.overview}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, overview: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Popularity:</label>
              <input
                type='text'
                value={selectedMovie.popularity}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, popularity: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Release Date:</label>
              <input
                type='text'
                value={selectedMovie.release_date}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, release_date: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Vote Average:</label>
              <input
                type='text'
                value={selectedMovie.vote_average}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, vote_average: e.target.value })}
              />
            </div>
            <div className='videos-section'>
              <h3>Videos from TMDB</h3>
              
              {/* Video List */}
              {videos.map((video, index) => (
                <div key={index} className='video-item'>
                  <div>
                    <strong>{video.type}</strong>
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      {video.description}
                    </a>
                  </div>
                  <button type='button' onClick={() => handleRemoveVideo(index)}>Remove</button>
                </div>
              ))}

              {/* Add Custom Video */}
              <div className='add-video'>
                <h4>Add Custom Video</h4>
                <input
                  type='text'
                  value={newVideo.url}
                  onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                  placeholder="New Video URL"
                />
                <input
                  type='text'
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  placeholder="New Video Description"
                />
                <button type='button' onClick={handleAddVideo}>Add Video</button>
              </div>
            </div>
            <button type='button' onClick={handleSave}>Save</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;