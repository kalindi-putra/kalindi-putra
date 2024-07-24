// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showRecipes, setShowRecipes] = useState(false); // State to track if recipes should be shown
    const [isAdmin, setIsAdmin] = useState(false); // State to track if user is admin

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/me/fetch', {
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    }
                });
                console.log(response.data);
                setUser(response.data);
                setLoading(false);

                // Check if user is admin based on 'flag' property
                if (response.data.flag === 'Y') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleShowRecipes = () => {
        setShowRecipes(true); // Set showRecipes to true when button is clicked
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {isAdmin && (
                <div>
                    <h3>Admin Options:</h3>
                    {/* Example of admin options */}
                    <button>Manage Users</button>
                    <button>Manage Recipes</button>
                </div>
            )}
            {showRecipes ? (
                <div>
                    <h3>Contributed Recipes:</h3>
                    <ul>
                        {user.contributedRecipes.map(recipe => (
                            <li key={recipe._id}>{recipe.title}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <button onClick={handleShowRecipes}>Show Contributed Recipes</button>
            )}
        </div>
    );
};

export default Profile;
