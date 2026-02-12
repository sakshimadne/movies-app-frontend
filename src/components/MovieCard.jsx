import { useEffect, useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";

const MovieCard = ({ movie, onDelete }) => {
  const navigate = useNavigate(); 
  // const location = useLocation();

  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const placeholderImage = `https://via.placeholder.com/300x450/4a5568/ffffff?text=${encodeURIComponent(
    movie.name
  )}`;

  const imageUrl =
    imageError || !movie.imageUrl ? placeholderImage : movie.imageUrl;



  return (
    <div className="movie-card"
      onClick={() => navigate(`/movies/${movie._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="movie-image-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: 'relative' }}
      >
        <img
          src={imageUrl}
          alt={movie.name}
          className="movie-image"
          onError={() => setImageError(true)}
        />

        {isHovered && (
          <div className="movie-overlay">
            <button
              className="movie-action-btn edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movies/${movie._id}/edit`);
              }}
            >
              Edit
            </button>

            <button
              className="movie-action-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(movie._id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.name}</h3>
        <div className="movie-details">
          <span>{movie.releaseYear}</span>
          <span> • </span>
          <span>{movie.genre}</span>
        </div>
        <div className="movie-rating">{movie.rating}/10</div>
      </div>
    </div>
  );
};

export default MovieCard;
