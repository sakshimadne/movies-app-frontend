import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation, useParams } from "react-router-dom";


import './App.css';
import MovieList from './components/MovieList';

import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import MovieEditModal from './components/MovieEditModal';
import MovieAddModal from './components/MovieAddModal';

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


  // Ref for scrolling to form at bottom
  const formRef = useRef(null);

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

 useEffect(() => {
    fetchMovies();
  }, []);
  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleAddMovie = async (movie) => {
    try {
      await axios.post(API_URL, movie);
      fetchMovies(); // Refresh list
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

  const handleUpdateMovie = async (id, updatedMovie) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedMovie);
      fetchMovies();
      setIsEditModalOpen(false);
      setEditingMovie(null);
    } catch (error) {
      console.error("Error updating movie", error);
    }
  };

  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    setIsEditModalOpen(true);
  };

  // const handleCloseEditModal = () => {
  //   setIsEditModalOpen(false);
  //   setEditingMovie(null);
  // };
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
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


//   return (
//     <div className="app-container">
//       <h1>🎬 Movie Management App</h1>

//       <button
//       className="nav-add-btn" 
//       onClick={() => setIsAddOpen(true)}
//         >
//         + Add Movie
//       </button>

//       <SearchBar
//         searchQuery={searchQuery}
//         onSearchChange={setSearchQuery}
//       />

//       <FilterPanel
//         movies={movies}
//         filters={filters}
//         onFilterChange={setFilters}
//         onClearFilters={handleClearFilters}
//       />

//       <MovieList
//         movies={filteredMovies}
//         onDelete={handleDeleteMovie}
//         onUpdate={handleUpdateMovie}
//         onEdit={handleEditClick}
//       />
      
//       <MovieAddModal
//     isOpen={isAddOpen}
//     onClose={() => setIsAddOpen(false)}
//     onAdd={handleAddMovie}
// />
// <MovieEditModal
//         movie={editingMovie}
//         isOpen={isEditModalOpen}
//         onClose={handleCloseEditModal}
//         onSave={handleUpdateMovie}
//       />



//     </div>
//   );

return (
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
      movies={filteredMovies}
      onDelete={handleDeleteMovie}
    />

    {/* Add Modal */}
    <MovieAddModal
      isOpen={isAddOpen}
      onClose={() => setIsAddOpen(false)}
      onAdd={handleAddMovie}
    />

    {/* Edit Modal (URL controlled) */}
    <MovieEditModal
      movie={editingMovie}
      isOpen={isEditModalOpen}
      onClose={handleCloseEditModal}
      onSave={handleUpdateMovie}
    />
  </div>
);


}

export default App;




// ***************
