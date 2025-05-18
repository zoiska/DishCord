import "./RecipeBrowser.css";
import RecipeTileList from "./RecipeTileList";
import { useEffect, useState } from "react";

function RecipeBrowser() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`);
      const data = await response.json();
      setRecipes(data);
    }
    fetchRecipes();
  }, []);

  return (
    <>
      <div className="wrapper">
        <h1>Recipe Browser</h1>
        <form role="search">
          <input type="search" name="query" placeholder="Search..." />
        </form>
        <div className="recipe-browser">
          <RecipeTileList recipes={recipes} />
        </div>
      </div>
    </>
  );
}

export default RecipeBrowser;
