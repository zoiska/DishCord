import { useState } from "react";
import "./RecipeTileList.css";
import { ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";

const RecipeTileList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>
      <div className="tile-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="tile" onClick={() => setSelectedRecipe(recipe)}>
            <div className="tile-content">
              <p className="tile-name">{recipe.name}</p>
              <p className="tile-author">{"- " + recipe.author}</p>
            </div>
            <div className="tile-ratings">
              <div className="tile-rating-icons">
                <ThumbsUp color="green" />
                <ThumbsDown color="red" />
              </div>
              <div className="tile-rating-values">
                <span>{77}</span>
                <span>{44}</span>
              </div>
            </div>
            {recipe.imageUrls && recipe.imageUrls.length > 0 && (
              <img
                className="tile-image"
                src={`${import.meta.env.VITE_API_URL}${recipe.imageUrls[0]}`}
                alt={recipe.name}
              />
            )}
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
