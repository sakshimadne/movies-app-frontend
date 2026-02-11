
import React from "react";
// console.log("FilterPanel movies prop:", movies);

const FilterPanel = ({ movies, filters, onFilterChange, onClearFilters }) => {


const handleFilterChange = (filterName, value) => {
  onFilterChange({ ...filters, [filterName]: value });
};





const genres = (() => {
  console.log("Movies inside FilterPanel:", movies);

  if (!movies || movies.length === 0) return [];

  const unique = [
    ...new Set(
      movies
        .map(m => m?.genre)
        .filter(g => typeof g === "string")
        .map(g => g.trim())
    )
  ];

  console.log("Genres computed:", unique);

  return unique.sort((a, b) => a.localeCompare(b));
})();





    const hasActiveFilters = filters.genre || filters.yearMin || filters.yearMax || filters.minRating;

    return (
        <div className="filter-panel">
            <div className="filter-header">
                <h3>Filters</h3>
                {hasActiveFilters && (
                    <button onClick={onClearFilters} className="clear-filters-btn">
                        Clear All
                    </button>
                )}
            </div>

            <div className="filter-controls">
                {/* Genre Filter */}
            <div className="filter-group">
  <label htmlFor="genre-filter">Genre</label>
  <select
    id="genre-filter"
    value={filters.genre || ""}
    onChange={(e) => handleFilterChange("genre", e.target.value)}
    className="filter-select"
  >
    <option value="">All Genres</option>
    {genres.map((genre) => (
      <option key={genre} value={genre}>
        {genre}
      </option>
    ))}
  </select>
</div>




                {/* Year Range Filter */}
                <div className="filter-group year-filter">
                    <label>Release Year</label>
                    <div className="year-inputs">
                        {/* <input
                            type="number"
                            placeholder="From"
                            value={filters.yearMin || ''}
                            onChange={(e) => handleFilterChange('yearMin', e.target.value ? parseInt(e.target.value) : '')}
                            className="filter-input year-input"
                            min="1900"
                            max="2100"
                        />
                        <span className="year-separator">-</span>
                        <input
                            type="number"
                            placeholder="To"
                            value={filters.yearMax || ''}
                            onChange={(e) => handleFilterChange('yearMax', e.target.value ? parseInt(e.target.value) : '')}
                            className="filter-input year-input"
                            min="1900"
                            max="2100"
                        /> */}
                        <input
  type="number"
  placeholder="From"
  value={filters.yearMin}
  onChange={(e) => handleFilterChange('yearMin', e.target.value)}
  className="filter-input year-input"
  min="1900"
  max="2100"
/>

<input
  type="number"
  placeholder="To"
  value={filters.yearMax}
  onChange={(e) => handleFilterChange('yearMax', e.target.value)}
  className="filter-input year-input"
  min="1900"
  max="2100"
/>

                    </div>
                </div>

                {/* Rating Filter */}
                <div className="filter-group">
                    <label htmlFor="rating-filter">
                        Minimum Rating: {filters.minRating || 0}
                    </label>
                    <input
                        id="rating-filter"
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={filters.minRating || 0}
                        onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                        className="filter-slider"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
