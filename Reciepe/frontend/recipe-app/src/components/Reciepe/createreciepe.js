import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const CreateRecipePage = () => {
  const nav=useNavigate()
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', JSON.stringify(ingredients.split(','))); // Assuming ingredients are comma-separated
    formData.append('instructions', instructions);
    formData.append('cookingTime', cookingTime);
    formData.append('servings', servings);
    formData.append('image', image);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/recipe/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':localStorage.getItem('token')
        }
      });
      console.log('Recipe created:', response.data);
      setLoading(false);
      alert("Reciepe uploaded")
      nav('/')
      // Redirect to home page or show success message
    } catch (error) {
      console.error('Error creating recipe:', error);
      setError('Error creating recipe. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <label htmlFor="ingredients">Ingredients (comma-separated)</label>
        </div>
        <div className="input-field">
          <textarea
            id="instructions"
            className="materialize-textarea"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
          <label htmlFor="instructions">Instructions</label>
        </div>
        <div className="input-field">
          <input
            type="number"
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        </div>
        <div className="input-field">
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
          <label htmlFor="servings">Servings</label>
        </div>
        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Image</span>
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Upload recipe image" />
          </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit" disabled={loading}>
          {loading ? 'Creating Recipe...' : 'Create Recipe'}
        </button>
        {error && <p className="red-text">{error}</p>}
      </form>
    </div>
  );
};

export default CreateRecipePage;
