import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = 'https://movies-app-backend-tau.vercel.app/api/movies';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setMovie(res.data);
        setLoading(false);
      } catch (err) {
        setError('Movie not found', err);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return null;

  return (
    <div className="movie-details-page">
      <button onClick={() => navigate('/')} style={{ marginBottom: 16 }}>← Back</button>
      <div className="movie-details-content">
        <img
          src={movie.imageUrl || `https://via.placeholder.com/500x450/4a5568/ffffff?text=${encodeURIComponent(movie.name)}`}
          alt={movie.name}
          style={{ width: 500, height: 450, borderRadius: 8 }}
        />
        <div style={{ marginLeft: 32 }}>
          <h2>{movie.name}</h2>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>Rating:</strong> {movie.rating}/10</p>
          <p><strong>Description:</strong> {`${movie.name} is a ${movie.genre} film released on ${movie.releaseYear}. The film embodies the defining characteristics of its genre, offering audiences a cinematic experience shaped by its tone.`}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
