import { ThumbsUp, ThumbsDown, Bookmark, X, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./RecipeTileList.css";
import { sentimentRecipe, bookmarkRecipe } from "../../services/InteractionService";

const RecipeTileList = ({ recipes, user }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const tileRefs = useRef([]);

  const handleBookmarkClick = (recipe) => {
    if (!user) {
      console.log("Not logged in");
      return;
    }

    if (recipe.author === user.username) {
      console.log("Cannot bookmark your own recipe");
      return;
    }

    bookmarkRecipe(recipe._id);
  };

  const handleLikeClick = (recipe) => {
    if (!user) {
      console.log("Not logged in");
      return;
    }

    if (recipe.author === user.username) {
      console.log("Cannot like your own recipe");
      return;
    }

    sentimentRecipe(recipe._id, "like");
  };

  const handleDislikeClick = (recipe) => {
    if (!user) {
      console.log("Not logged in");
      return;
    }

    if (recipe.author === user.username) {
      console.log("Cannot dislike your own recipe");
      return;
    }

    sentimentRecipe(recipe._id, "dislike");
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
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      }
    );
    const currentRefs = tileRefs.current;
    Object.values(currentRefs).forEach((tile) => tile && observer.observe(tile));
    return () => {
      Object.values(currentRefs).forEach((tile) => tile && observer.unobserve(tile));
    };
  }, [recipes]);

  return (
    <>
      <div className="tile-list">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="tile"
            ref={(el) => (tileRefs.current[recipe._id] = el)}
            onClick={() => setSelectedRecipe(recipe)}
          >
            <Bookmark
              className="bookmark"
              color="yellow"
              size={32}
              onClick={(e) => {
                e.stopPropagation();
                handleBookmarkClick(recipe);
              }}
              fill={user?.favoriteRecipes?.includes(String(recipe._id)) ? "yellow" : "none"}
            />
            <div className="tile-content">
              <span className="tile-name">{recipe.name}</span>
              <span className="tile-author">{"by " + recipe.author}</span>
              <div className="tile-ratings">
                <div className="tile-rating-icons">
                  <ThumbsUp
                    color="green"
                    size={20}
                    fill={user?.likedRecipes?.includes(String(recipe._id)) ? "green" : "none"}
                  />
                  <ThumbsDown
                    color="red"
                    size={20}
                    fill={user?.dislikedRecipes?.includes(String(recipe._id)) ? "red" : "none"}
                  />
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
          </div>
          <div className="modal-footer" onClick={(e) => e.stopPropagation()}>
            <ThumbsUp
              className="footer-button"
              size={24}
              color="var(--color-primary)"
              absoluteStrokeWidth={1}
              onClick={() => handleLikeClick(selectedRecipe)}
            />
            <ThumbsDown
              className="footer-button"
              size={24}
              color="var(--color-primary)"
              absoluteStrokeWidth={1}
              onClick={() => handleDislikeClick(selectedRecipe)}
            />
            <Bookmark
              className="footer-button"
              size={24}
              color="var(--color-primary)"
              absoluteStrokeWidth={1}
              onClick={() => handleBookmarkClick(selectedRecipe)}
            />
            <MessageCircle
              className="footer-button"
              size={24}
              color="var(--color-primary)"
              absoluteStrokeWidth={1}
            />
            <X
              className="footer-button"
              size={24}
              color="var(--color-primary)"
              absoluteStrokeWidth={1}
              onClick={() => setSelectedRecipe(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeTileList;
