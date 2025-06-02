import { useState } from "react";
import { Plus, Minus, ArrowUpFromLine, X, ArchiveRestore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CreateRecipe.css";

function CreateRecipe() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [showPopup, setShowPopUp] = useState(false);

  const create = () => {
    // post recipe to backend
    navigate("/");
  };

  const handleCancelEvent = () => {
    setShowPopUp(true);
  };

  const handleNo = () => {
    setShowPopUp(false);
  };

  const handleYes = () => {
    navigate("/");
    setShowPopUp(false);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addingredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const removeingredient = () => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.slice(0, -1));
  };

  function imagePreview() {}

  return (
    <div>
      <div className="create-recipe-header">
        <h1 className="create-recipe-title">Create A Recipe</h1>
      </div>

      <div className="create-recipe-body">
        <form className="create-recipe-form">
          <div className="form-group">
            <label htmlFor="recipe-title">Recipe Title</label>
            <input
              className="recipe-title"
              type="text"
              placeholder="Kartoffelgratin"
              minLength="1"
              required
            />
          </div>

          <div className="form-group">
            <div className="ingredients-buttons">
              <label htmlFor="recipe-ingredients">Ingredients</label>
              <button
                className="removeingredient secondary-button"
                type="button"
                onClick={removeingredient}
              >
                <Minus absoluteStrokeWidth={1} size={28} color="var(--color-text)" />
              </button>
              <button
                className="addingredient secondary-button"
                type="button"
                onClick={addingredient}
              >
                <Plus absoluteStrokeWidth={1} size={28} color="var(--color-text)" />
              </button>
            </div>
            {ingredients.map((ingredient, index) => (
              <div className="group-ingredients" key={index}>
                <input
                  className="recipe-ingredients-data"
                  type="text"
                  placeholder="Ingredient"
                  minLength="1"
                  required
                  value={ingredient.name}
                  onChange={(e) => {
                    handleIngredientChange(index, "name", e.target.value);
                  }}
                />
                <input
                  className="recipe-ingredients-data"
                  type="text"
                  placeholder="Amount"
                  minLength="1"
                  required
                  value={ingredient.amount}
                  onChange={(e) => {
                    handleIngredientChange(index, "amount", e.target.value);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="recipe-instructions">Instructions</label>
            <textarea
              className="recipe-instructions"
              placeholder="Instructions"
              minLength="1"
              required
            />
          </div>

          <div className="form-group">
            <div className="recipe-image-button">
              <label htmlFor="recipe-image">Images</label>
              <button className="recipe-image secondary-button" onClick={imagePreview}>
                <ArchiveRestore absoluteStrokeWidth={1} size={28} color="var(--color-text)" />
              </button>
            </div>
            <div className="image-preview"></div>
          </div>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Are you sure you want to abbreaken?</h2>
            <div className="popup-buttons">
              <button className="popup-cancel-buttons secondary-button" onClick={handleNo}>
                No
              </button>
              <button className="popup-cancel-buttons primary-button" onClick={handleYes}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-nav-create-recipe">
        <button className="cancel-button" onClick={handleCancelEvent}>
          <X size={32} color="var(--color-primary)" absoluteStrokeWidth={1} />
        </button>
        <button className="create-button" type="button" onClick={create}>
          <ArrowUpFromLine size={32} color="var(--color-primary)" absoluteStrokeWidth={1} />
        </button>
      </div>
    </div>
  );
}

export default CreateRecipe;
