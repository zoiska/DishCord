import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CreateRecipeButton.css";

function CreateRecipeButton() {
  const navigate = useNavigate();

  function toCreateRecipe() {
    navigate("/create-recipe");
  }

  return (
    <button className="create-recipe-button secondary-button" onClick={toCreateRecipe}>
      <Plus absoluteStrokeWidth={1} size={32} color="var(--color-text)" />
    </button>
  );
}

export default CreateRecipeButton;
