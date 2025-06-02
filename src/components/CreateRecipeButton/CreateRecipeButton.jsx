import { useNavigate } from "react-router-dom";
import "./CreateRecipeButton.css";

function CreateRecipeButton() {
  const navigate = useNavigate();

  function toCreateRecipe() {
    navigate("/create-recipe");
  }

  return (
    <button id="createRecipeButton" className="secondary-button" onClick={toCreateRecipe}>
      +
    </button>
  );
}

export default CreateRecipeButton;
