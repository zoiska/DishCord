import { useEffect, useState } from "react";
import RecipeTileList from "../../components/RecipeTileList/RecipeTileList";
import { getAllRecipes } from "../../services/RecipeService";
import "./RecipeBrowser.css";

function RecipeBrowser() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes().then((r) => {
      setRecipes(r);
    });
  }, []);

  return (
    <div className="recipe-browser-wrapper">
      <h1 className="title">Recipe Browser</h1>
      <form role="search">
        <input type="search" name="query" placeholder="Search..." />
      </form>
      <div className="recipe-browser">
        <RecipeTileList recipes={recipes} />
      </div>
    </div>
  );
}

export default RecipeBrowser;
