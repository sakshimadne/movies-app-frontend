import { useState } from 'react';

const MovieForm = ({ onAdd }) => {
    const [movie, setMovie] = useState({
        name: '',
        genre: '',
        releaseYear: '',
        rating: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!movie.name || !movie.genre || !movie.releaseYear || !movie.rating) return;
        onAdd(movie);
        setMovie({ name: '', genre: '', releaseYear: '', rating: '', imageUrl: '' });
    };

    return (
        <form className="movie-form" onSubmit={handleSubmit}>
            <h2>Add New Movie</h2>
            <div className="form-grid">
                <input
                    type="text"
                    name="name"
                    placeholder="Movie Name"
                    value={movie.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre (e.g., Action, Drama)"
                    value={movie.genre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="releaseYear"
                    placeholder="Release Year"
                    value={movie.releaseYear}
                    onChange={handleChange}
                    min="1900"
                    max="2100"
                    required
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (0-10)"
                    value={movie.rating}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    step="0.1"
                    required
                />
            </div>
            <input
                type="url"
                name="imageUrl"
                placeholder="Image URL (optional)"
                value={movie.imageUrl}
                onChange={handleChange}
                className="full-width-input"
            />
            <button type="submit">Add Movie</button>
        </form>
    );
};

export default MovieForm;

