import { Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./RandomRecipeButton.css";

function RandomRecipeButton() {
  const navigate = useNavigate();

  const openRandomRecipe = () => {
    navigate("/random");
  };

  return (
    <button className="open-random-recipe-button secondary-button" onClick={openRandomRecipe}>
      <Dices absoluteStrokeWidth={1} size={32} color="var(--color-text)" />
    </button>
  );
}

export default RandomRecipeButton;
