import { ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./RecipeTileList.css";

const RecipeTileList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const tileRefs = useRef([]);

  const handleBookmarkClick = (recipeId) => {
    // handle the bookmark click
    console.log(`Bookmark clicked for recipe ID: ${recipeId}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          entry.target.style.scale = 0.7 + ratio * 0.3;
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      }
    );

    const currentRefs = tileRefs.current;
    currentRefs.forEach((tile) => tile && observer.observe(tile));

    return () => {
      currentRefs.forEach((tile) => tile && observer.unobserve(tile));
    };
  }, [recipes]);

  return (
    <>
      <div className="tile-list">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="tile"
            ref={(el) => (tileRefs.current[recipe.id] = el)}
            onClick={() => setSelectedRecipe(recipe)}
          >
            <Bookmark
              className="bookmark"
              color="yellow"
              size={32}
              onClick={(e) => {
                e.stopPropagation();
                handleBookmarkClick(recipe.id);
              }}
            />
            <div className="tile-content">
              <span className="tile-name">{recipe.name}</span>
              <span className="tile-author">{"- " + recipe.author}</span>
              <div className="tile-ratings">
                <div className="tile-rating-icons">
                  <ThumbsUp color="green" size={20} />
                  <ThumbsDown color="red" size={20} />
                </div>
                <div className="tile-rating-values">
                  <span>{77}</span>
                  <span>{44}</span>
                </div>
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

            <article>
              <div className="ingredient-list">
                <h3>Zutaten</h3>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="ingredient-name">{ingredient.name}</span>
                    <span className="ingredient-amount">{ingredient.amount}</span>
                  </div>
                ))}
              </div>
            </article>

            <article>
              <h3>Zubereitung</h3>
              <p>{selectedRecipe.preparation}</p>
            </article>

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
