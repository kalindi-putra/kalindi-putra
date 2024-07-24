import React, { useState } from 'react';
import axios from 'axios';

const FilterRecipePage = () => {
  const [servings, setServings] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8000/api/recipes/filter', {
        params: {
          servings,
          cookingTime
        }
      });
      setFilteredRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error filtering recipes:', error);
      setError('Error filtering recipes. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Filter Recipes</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
          <label htmlFor="servings">Servings</label>
        </div>
        <div className="input-field">
          <input
            type="number"
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        </div>
        <button className="btn waves-effect waves-light" type="submit" disabled={loading}>
          {loading ? 'Filtering...' : 'Filter Recipes'}
        </button>
        {error && <p className="red-text">{error}</p>}
      </form>
      <div className="filtered-recipes">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div key={recipe._id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>Author: {recipe.author.name}</p>
              <p>Cooking Time: {recipe.cookingTime} mins</p>
              <p>Servings: {recipe.servings}</p>
              <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', maxHeight: '400px' }} />
            </div>
          ))
        ) : (
          <p>No recipes found based on the filter criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FilterRecipePage;
