import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onDelete, onUpdate, onEdit }) => {
    return (
        <div className="movie-list">
            <h2>All Movies ({movies.length})</h2>
            {movies.length === 0 ? (
                <p className="no-movies">No movies found. Try adjusting your search or filters.</p>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieList;

