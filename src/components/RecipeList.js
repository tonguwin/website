// RecipeList.js

import React, { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getCollection('recipes');
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const allTags = [...new Set(recipes.flatMap(recipe => recipe.data.tags))];

  const filteredRecipes = selectedTag
    ? recipes.filter(recipe => recipe.data.tags.includes(selectedTag))
    : recipes;

  return (
    <div>
      <h1>Recipe Blog</h1>
      <div>
        <button onClick={() => setSelectedTag(null)}>All</button>
        {allTags.map(tag => (
          <button key={tag} onClick={() => setSelectedTag(tag)}>
            {tag}
          </button>
        ))}
      </div>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipes/${recipe.id}`}>{recipe.data.title}</a>
            <p>{recipe.data.date}</p>
            <div>
              {recipe.data.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
