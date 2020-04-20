import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Recipe from "./Recipe";
import './App.css';

const App = () => {

  const APP_ID = "20cca979";
  const APP_KEY = "a9f023512840d369a3e6158e98e58966";

const [recipes, setRecipes] = useState([]);
const [search, setSearch] =useState('');
const [query, setQuery] = useState ('curry');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    
    const data = await response.json ();
    setRecipes(data.hits);
    
    
  };

const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
};

  return (
    <div className ="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
        className= "search-bar" 
        input placeholder="Search for ingredients..."
        type="text" 
        value={search} 
        onChange={updateSearch}
        />
          <button
          className="search-button" type="submit">
            Search
          </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};
export default App;
