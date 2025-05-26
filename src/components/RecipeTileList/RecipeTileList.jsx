import { useState } from "react";
import "./RecipeTileList.css";

const RecipeTileList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>
      <div className="tile-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="tile" onClick={() => setSelectedRecipe(recipe)}>
            {recipe.name}
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className="modal" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRecipe.name}</h2>
            <div className="ingredient-list">
              <h3>Zutaten</h3>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                  <span className="ingredient-name">{ingredient.name}</span>
                  <span className="ingredient-amount">{ingredient.amount}</span>
                </div>
              ))}
            </div>
            <h3>Zubereitung</h3>
            <p>{selectedRecipe.preparation}</p>
            <button
              className="secondary-button floating-close-button"
              onClick={() => setSelectedRecipe(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeTileList;
