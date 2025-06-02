import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRecipe.css";

function CreateRecipe() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState(1);

  function cancel() {
    navigate("/");
  }

  function create() {
    navigate("/");
  }

  function addIngridient() {
    setIngredients(ingredients + 1);
    const ingredient = document.getElementsByClassName("form-group-ingridients");
    const newGroup = document.createElement("div");
    newGroup.className = "group-ingridients";

    newGroup.innerHTML = `
      <input
        id="recipe-ingridients"
        className="recipe-ingridients"
        type="text"
        placeholder="Ingridient"
        minLength="1"
        required
      />
      <input
        id="recipe-ingridients-amount"
        className="recipe-ingridients-amount"
        type="text"
        placeholder="Amount"
        minLength="1"
        required
      />
      <input
        id="removeIngridient"
        className="secondary-button"
        type="button"
        value="-"	
        onClick={removeIngridient}
      ></input>
      <input
        id="addIngridient"
        className="secondary-button"
        type="button"
        value="+"
        onClick={addIngridient}
      ></input>`;

    ingredient.appendChild(newGroup);
  }

  function removeIngridient() {
    if (ingredients > 1) {
      setIngredients(ingredients - 1);
    } else {
      console.log("At least one ingredient is required.");
    }
  }

  function imagePreview() {}

  return (
    <div>
      <div className="create-recipe-header">
        <button id="cancel" className="secondary-button" onClick={cancel}>
          abbreaken
        </button>
        <h1 className="create-recipe-title">Create Recipe</h1>
      </div>

      <div className="create-recipe-body">
        <form className="create-recipe-form" onSubmit={create}>
          <div className="form-group">
            <label htmlFor="recipe-title">Recipe Title</label>
            <input
              id="recipe-title"
              className="recipe-title"
              type="text"
              placeholder="Kartoffelgratin"
              minLength="1"
              required
            />
          </div>

          <div className="form-group-ingridients">
            <label htmlFor="recipe-ingridients">Ingredients</label>
            <div className="group-ingridients">
              <input
                id="recipe-ingridients"
                className="recipe-ingridients"
                type="text"
                placeholder="Ingridient"
                minLength="1"
                required
              />
              <input
                id="recipe-ingridients-amount"
                className="recipe-ingridients-amount"
                type="text"
                placeholder="Amount"
                minLength="1"
                required
              />
              <input
                id="removeIngridient"
                className="secondary-button"
                type="button"
                value="-"
                onClick={removeIngridient}
              ></input>
              <input
                id="addIngridient"
                className="secondary-button"
                type="button"
                value="+"
                onClick={addIngridient}
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="recipe-instructions">Instructions</label>
            <textarea
              id="recipe-instructions"
              className="recipe-instructions"
              placeholder="Instructions"
              minLength="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipe-image">Images</label>
            <input id="recipe-image" className="secondary-button" type="file" multiple="true" />
            <div className="image-preview"></div>
          </div>

          <button id="create" className="primary-button" type="submit">
            create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
