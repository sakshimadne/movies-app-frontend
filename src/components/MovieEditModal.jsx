import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const MovieEditModal = ({ movie, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        genre: '',
        releaseYear: '',
        rating: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (movie) {
            setFormData({
                name: movie.name || '',
                genre: movie.genre || '',
                releaseYear: movie.releaseYear || '',
                rating: movie.rating || '',
                imageUrl: movie.imageUrl || ''
            });
        }
    }, [movie]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.genre || !formData.releaseYear || !formData.rating) {
            alert('Please fill in all required fields');
            return;
        }
        onSave(movie._id, formData);
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit Movie</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="edit-name">Movie Name *</label>
                        <input
                            id="edit-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-genre">Genre *</label>
                        <input
                            id="edit-genre"
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="edit-year">Release Year *</label>
                            <input
                                id="edit-year"
                                type="number"
                                name="releaseYear"
                                value={formData.releaseYear}
                                onChange={handleChange}
                                min="1900"
                                max="2100"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-rating">Rating (0-10) *</label>
                            <input
                                id="edit-rating"
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                min="0"
                                max="10"
                                step="0.1"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-imageUrl">Image URL</label>
                        <input
                            id="edit-imageUrl"
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>, document.body
    );
};

export default MovieEditModal;
