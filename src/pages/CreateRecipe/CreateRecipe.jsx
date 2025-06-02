import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRecipe.css";

function CreateRecipe() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const cancel = () => {
    navigate("/");
  };

  const create = () => {
    // post recipe to backend
    navigate("/");
  };

  const addIngridient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const removeIngridient = () => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.slice(0, -1));
  };

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

          <div className="form-group-ingridients">
            <label htmlFor="recipe-ingridients">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div className="group-ingridients" key={index}>
                <input
                  id="recipe-ingridients"
                  className="recipe-ingridients"
                  type="text"
                  placeholder="Ingridient"
                  minLength="1"
                  required
                  value={ingredient.name}
                  onChange={(e) => {
                    handleIngredientChange(index, "name", e.target.value);
                  }}
                />
                <input
                  id="recipe-ingridients-amount"
                  className="recipe-ingridients-amount"
                  type="text"
                  placeholder="Amount"
                  minLength="1"
                  required
                />
              </div>
            ))}
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

          <button id="create" className="primary-button" type="button" onClick={create}>
            create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
