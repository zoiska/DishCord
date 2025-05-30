import { useNavigate } from "react-router-dom";
import "./CreateRecepie.css";

function CreateRecepie() {
  const navigate = useNavigate();
  function cancel() {
    navigate("/");
  }

  function create() {
    navigate("/");
  }

  function addIngredient() {
    const ingredient = document.getElementById("group-ingredients");
    const newGroup = document.createElement("div");
    newGroup.className = "group-ingredients";

    newGroup.innerHTML = `
      <input
        id="recipe-ingredients"
        className="recipe-ingredients"
        type="text"
        placeholder="Ingredient"
        minLength="1"
        required
      />
      <input
        id="recipe-ingredients-amount"
        className="recipe-ingredients-amount"
        type="text"
        placeholder="Amount"
        minLength="1"
        required
      />
      <button id="removeIngredient" className="secondary-button" onClick={removeIngredient}>
        -
      </button>
      <button id="addIngredient" className="secondary-button" onClick={addIngredient}>
        +-
      </button>`;

    ingredient.appendChild(newGroup);
  }

  function removeIngredient() {}

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
        <form className="create-recipe-form">
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

          <div className="form-group">
            <label htmlFor="recipe-ingredients">Ingredients</label>
            <div className="group-ingredients">
              <input
                id="recipe-ingredients"
                className="recipe-ingredients"
                type="text"
                placeholder="Ingredient"
                minLength="1"
                required
              />
              <input
                id="recipe-ingredients-amount"
                className="recipe-ingredients-amount"
                type="text"
                placeholder="Amount"
                minLength="1"
                required
              />
              <button className="secondary-button addIngredient" onClick={addIngredient}>
                +
              </button>
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

          <div>
            <label htmlFor="recipe-image">Images</label>
            <input id="recipe-image" type="file" />
            <div className="image-preview"></div>
          </div>
        </form>
      </div>

      <button id="create" className="primary-button" onClick={create}>
        create
      </button>
    </div>
  );
}

export default CreateRecepie;
