import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // Fetch recipes for the current page
                const response = await axios.get(`http://localhost:8000/recipe/fetch?page=${currentPage}&limit=4`);
                setRecipes(response.data);
                setLoading(false);
                const totalCount = response.data.totalCount;
                setTotalPages(Math.ceil(totalCount / 4)); // Calculate total pages based on 4 recipes per page

            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError('Error fetching recipes. Please try again later.');
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [currentPage]); // Fetch recipes whenever currentPage changes

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: "center" }}>
                <h2>Recipes Website</h2>
            </div>
            {recipes.length === 0 ? <h3>No Recipes yet !!!</h3> :
                recipes.map(recipe => (
                    <div key={recipe._id}>
                        <h3>{recipe.title}</h3>
                        <p>Author: {recipe.author.name}</p>
                        <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                        <p>Cooking Time: {recipe.cookingTime} mins</p>
                        <p>Servings: {recipe.servings}</p>
                        <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', maxHeight: '400px' }} />
                    </div>
                ))}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
                <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
            </div>
        </div>
    );
};

export default RecipeList;
