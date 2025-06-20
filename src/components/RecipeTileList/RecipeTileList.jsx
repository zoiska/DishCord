import { ThumbsUp, ThumbsDown, Bookmark, X, MessageCircle, RefreshCw, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./RecipeTileList.css";
import { sentimentRecipe, bookmarkRecipe } from "../../services/InteractionService";
import { deleteRecipe } from "../../services/RecipeService";

const RecipeTileList = ({ recipes, setRecipes, user, setUserData }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showPopup, setShowPopUp] = useState(false);
  const tileRefs = useRef([]);

  const updateFavorite = (recipeId) => {
    setUserData((prevData) => {
      const user = prevData.user;
      const isFav = user.favoriteRecipes.includes(recipeId);
      const updatedFavorites = isFav
        ? user.favoriteRecipes.filter((id) => id !== recipeId)
        : [...user.favoriteRecipes, recipeId];

      return {
        ...prevData,
        user: {
          ...user,
          favoriteRecipes: updatedFavorites,
        },
      };
    });
  };

  const updateLikeDislike = (recipeId, sentiment) => {
    setUserData((prevData) => {
      const user = prevData.user;
      let updatedLikes = user.likedRecipes;
      let updatedDislikes = user.dislikedRecipes;
      const isLiked = user.likedRecipes.includes(recipeId);
      const isDisliked = user.dislikedRecipes.includes(recipeId);
      if (sentiment === "like") {
        updatedLikes = isLiked
          ? user.likedRecipes.filter((id) => id !== recipeId)
          : [...user.likedRecipes, recipeId];

        if (isDisliked) {
          updatedDislikes = user.dislikedRecipes.filter((id) => id !== recipeId);
        }
      } else if (sentiment === "dislike") {
        updatedDislikes = isDisliked
          ? user.dislikedRecipes.filter((id) => id !== recipeId)
          : [...user.dislikedRecipes, recipeId];

        if (isLiked) {
          updatedLikes = user.likedRecipes.filter((id) => id !== recipeId);
        }
      }

      return {
        ...prevData,
        user: {
          ...user,
          likedRecipes: updatedLikes,
          dislikedRecipes: updatedDislikes,
        },
      };
    });
  };

  const updateLikeDislikeCount = (recipeId, sentiment) => {
    const isLiked = user.likedRecipes.includes(recipeId);
    const isDisliked = user.dislikedRecipes.includes(recipeId);
    if (sentiment === "like") {
      setRecipes((prevRecipes) =>
        prevRecipes.map((r) => {
          if (r._id !== recipeId) return r;

          return {
            ...r,
            likeCount: isLiked ? r.likeCount - 1 : r.likeCount + 1,
            dislikeCount: isDisliked ? r.dislikeCount - 1 : r.dislikeCount,
          };
        })
      );
    } else if (sentiment === "dislike") {
      setRecipes((prevRecipes) =>
        prevRecipes.map((r) => {
          if (r._id !== recipeId) return r;

          return {
            ...r,
            dislikeCount: isDisliked ? r.dislikeCount - 1 : r.dislikeCount + 1,
            likeCount: isLiked ? r.likeCount - 1 : r.likeCount,
          };
        })
      );
    }
  };

  const handleBookmarkClick = (recipe) => {
    if (!user) {
      console.log("Not logged in");
      return;
    }

    if (recipe.author === user.username) {
      console.log("Cannot bookmark your own recipe");
      return;
    }

    updateFavorite(recipe._id);
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

    updateLikeDislike(recipe._id, "like");
    sentimentRecipe(recipe._id, "like");
    updateLikeDislikeCount(recipe._id, "like");
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

    updateLikeDislike(recipe._id, "dislike");
    sentimentRecipe(recipe._id, "dislike");
    updateLikeDislikeCount(recipe._id, "dislike");
  };

  const handleDeleteRecipeClick = () => {
    setShowPopUp(true);
  };

  const handlePopupCancel = () => {
    setShowPopUp(false);
  };

  const handlePopupConfirm = (recipe) => {
    setShowPopUp(false);
    //passt das so mit neuer darstellung?
    setRecipes((prevRecipes) => prevRecipes.filter((r) => r._id !== recipe._id));
    setSelectedRecipe(null);
    deleteRecipe(recipe._id);
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
                  <span>{recipe.likeCount}</span>
                  <span>{recipe.dislikeCount}</span>
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
          {selectedRecipe.author === user.username && (
            <div className="modal-footer" onClick={(e) => e.stopPropagation()}>
              <div className="footer-edit-button-wrapper">
                <X
                  className="footer-edit-button"
                  size={24}
                  color="var(--color-primary)"
                  absoluteStrokeWidth={1}
                  onClick={() => setSelectedRecipe(null)}
                />

                <RefreshCw
                  className="footer-edit-button"
                  size={24}
                  color="var(--color-primary)"
                  absoluteStrokeWidth={1}
                />

                <Trash2
                  className="footer-edit-button"
                  size={24}
                  color="var(--color-primary)"
                  absoluteStrokeWidth={1}
                  onClick={() => handleDeleteRecipeClick()}
                />
              </div>
            </div>
          )}
          {selectedRecipe.author !== user.username && (
            <div className="modal-footer" onClick={(e) => e.stopPropagation()}>
              <div className="footer-button-wrapper">
                <ThumbsUp
                  className="footer-button"
                  size={24}
                  color="transparent"
                  fill={
                    user?.likedRecipes?.includes(String(selectedRecipe._id))
                      ? "var(--color-text)"
                      : "none"
                  }
                />
                <ThumbsUp
                  className="footer-button"
                  size={24}
                  color="var(--color-primary)"
                  absoluteStrokeWidth={1}
                  onClick={() => handleLikeClick(selectedRecipe)}
                />
              </div>

              <div className="footer-button-wrapper">
                <ThumbsDown
                  className="footer-button"
                  size={24}
                  color="transparent"
                  fill={
                    user?.dislikedRecipes?.includes(String(selectedRecipe._id))
                      ? "var(--color-text)"
                      : "none"
                  }
                />
                <ThumbsDown
                  className="footer-button"
                  size={24}
                  color="var(--color-primary)"
                  onClick={() => handleDislikeClick(selectedRecipe)}
                />
              </div>

              <div className="footer-button-wrapper">
                <Bookmark
                  className="footer-button"
                  size={24}
                  color="transparent"
                  fill={
                    user?.favoriteRecipes?.includes(String(selectedRecipe._id))
                      ? "var(--color-text)"
                      : "none"
                  }
                />
                <Bookmark
                  className="footer-button"
                  size={24}
                  color="var(--color-primary)"
                  onClick={() => handleBookmarkClick(selectedRecipe)}
                />
              </div>

              <div className="footer-button-wrapper">
                <MessageCircle className="footer-button" size={24} color="transparent" />
                <MessageCircle
                  className="footer-button"
                  size={24}
                  color="var(--color-primary)"
                  absoluteStrokeWidth={1}
                />
              </div>

              <div className="footer-button-wrapper">
                <X className="footer-button" size={24} color="transparent" />
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
          {showPopup && (
            <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
              <div className="popup">
                Delete this recipe?
                <div className="popup-buttons">
                  <button
                    className="popup-cancel-buttons secondary-button"
                    onClick={handlePopupCancel}
                  >
                    No
                  </button>
                  <button
                    className="popup-cancel-buttons primary-button"
                    onClick={handlePopupConfirm}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RecipeTileList;
