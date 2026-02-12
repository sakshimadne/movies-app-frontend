import MovieCard from './MovieCard';

const MovieList = ({
  movies,
  totalMovies,
  currentPage,
  totalPages,
  onPageChange,
  onDelete
}) => {
  return (
    <div className="movie-list">
      <h2>All Movies ({totalMovies})</h2>

      {movies.length === 0 ? (
        <p className="no-movies">
          No movies found. Try adjusting your search or filters.
        </p>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* PAGINATION CONTROLS */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;
