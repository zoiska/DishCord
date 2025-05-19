import "./RecipeBrowser.css";
import RecipeTileList from "../../components/RecipeTileList/RecipeTileList";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../../services/RecipeService";

function RecipeBrowser() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes().then((r) => {
      setRecipes(r);
    });
  }, []);

  return (
    <>
      <div className="recipe-browser-wrapper">
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
