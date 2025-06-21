import "./RandomRecipe.css";
import { Dices, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllRecipes } from "../../services/RecipeService";

function RandomRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const loadNewRecipe = () => {
    setFadeIn(false);
    setRecipe(null);
    getAllRecipes().then((r) => {
      setRecipe(r[0]);
      setTimeout(() => setFadeIn(true), 50);
    });
  };

  useEffect(() => {
    getAllRecipes().then((r) => {
      setRecipe(r[0]);
      setTimeout(() => setFadeIn(true), 50);
    });
  }, []);

  return (
    <>
      <div className={`random-recipe-wrapper ${fadeIn ? "fade-in" : ""}`}>
        {recipe && (
          <div className="random-recipe-content" onClick={(e) => e.stopPropagation()}>
            <h2>{recipe.name}</h2>
            <article>
              <div className="random-ingredient-list">
                <h3>Zutaten</h3>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="random-ingredient-item">
                    <span className="random-ingredient-name">{ingredient.name}</span>
                    <span className="random-ingredient-amount">{ingredient.amount}</span>
                  </div>
                ))}
              </div>
            </article>
            <article>
              <h3>Zubereitung</h3>
              <p>{recipe.preparation}</p>
            </article>
          </div>
        )}
      </div>
      <div className="random-recipe-nav">
        <button className="next-random-button" onClick={loadNewRecipe}>
          <Dices size={32} color="var(--color-primary)" absoluteStrokeWidth={1} />
        </button>
        <NavLink to="/" className="random-nav-link">
          <X size={32} color="var(--color-primary)" absoluteStrokeWidth={1} />
        </NavLink>
      </div>
    </>
  );
}

export default RandomRecipe;
