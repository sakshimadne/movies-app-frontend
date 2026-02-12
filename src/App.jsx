import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import './App.css';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import MovieEditModal from './components/MovieEditModal';
import MovieAddModal from './components/MovieAddModal';
import MovieDetails from './components/MovieDetails';

const API_URL = 'https://movies-app-backend-tau.vercel.app/api/movies';

function App() {
    const navigate = useNavigate();  
  const location = useLocation();   
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    yearMin: '',
    yearMax: '',
    minRating: 0
  });
  const [editingMovie, setEditingMovie] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const moviesPerPage = 9; 

useEffect(() => {
  setCurrentPage(1);
}, [searchQuery, filters]);


  useEffect(() => {
  const match = location.pathname.match(/\/movies\/(.+)\/edit/);

  if (match) {
    const movieId = match[1];
    const movieToEdit = movies.find(m => m._id === movieId);

    if (movieToEdit) {
      setEditingMovie(movieToEdit);
      setIsEditModalOpen(true);
    }
  } else {
    setIsEditModalOpen(false);
    setEditingMovie(null);
  }
}, [location.pathname, movies]);



  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddMovie = async (movie) => {
    try {
      await axios.post(API_URL, movie);
      fetchMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie", error);
    }
  };
  const handleEditClick = (movie) => {
  setEditingMovie(movie);
  setIsEditModalOpen(true);
};



const handleUpdateMovie = async (id, updatedMovie) => {
  try {
    await axios.put(`${API_URL}/${id}`, updatedMovie);
    await fetchMovies();
    navigate("/");  
  } catch (error) {
    console.error("Error updating movie", error);
  }
};


  const handleCloseEditModal = () => {
  navigate("/");
};


  const handleClearFilters = () => {
    setFilters({
      genre: '',
      yearMin: '',
      yearMax: '',
      minRating: 0
    });
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      !filters.genre ||
      movie.genre?.toLowerCase().trim() === filters.genre.toLowerCase().trim();

    const matchesYearMin =
      !filters.yearMin || movie.releaseYear >= Number(filters.yearMin);

    const matchesYearMax =
      !filters.yearMax || movie.releaseYear <= Number(filters.yearMax);

    const matchesRating =
      !filters.minRating || movie.rating >= Number(filters.minRating);

    return matchesSearch && matchesGenre && matchesYearMin && matchesYearMax && matchesRating;
  });

 const indexOfLastMovie = currentPage * moviesPerPage;
const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

const currentMovies = filteredMovies.slice(
  indexOfFirstMovie,
  indexOfLastMovie
);

const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);



return (
  <Routes>


    <Route
      path="/"
      element={
        <div className="app-container">
          <h1>🎬 Movie Management App</h1>

          <button
            className="nav-add-btn"
            onClick={() => setIsAddOpen(true)}
          >
            + Add Movie
          </button>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <FilterPanel
            movies={movies}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
          />

          <MovieList
  movies={currentMovies}
  totalMovies={filteredMovies.length}
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  onDelete={handleDeleteMovie}
/>


          <MovieAddModal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onAdd={handleAddMovie}
          />

          <MovieEditModal
            movie={editingMovie}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onSave={handleUpdateMovie}
          />
        </div>
      }
    />

    
    <Route
      path="/movies/:id/edit"
      element={
        <div className="app-container">
          <h1>🎬 Movie Management App</h1>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <FilterPanel
            movies={movies}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
          />

          <MovieList
            movies={filteredMovies}
            onDelete={handleDeleteMovie}
          />
        



          <MovieEditModal
            movie={editingMovie}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onSave={handleUpdateMovie}
          />
        </div>
      }
    />

 
    <Route path="/movies/:id" element={<MovieDetails />} />

  </Routes>
);



}

export default App;
