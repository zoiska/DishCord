import React, { useState } from "react";
import "./RecipeTileList.css";

const RecipeTileList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>
      <div className="tile-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="tile" onClick={() => setSelectedRecipe(recipe)}>
            <h2>{recipe.name}</h2>
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className="modal" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRecipe.name}</h2>
            <p>{selectedRecipe.preparation}</p>
            <button className="floating-close-button" onClick={() => setSelectedRecipe(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeTileList;
