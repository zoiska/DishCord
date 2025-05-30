import { useNavigate } from "react-router-dom";
import "./CreateRecepieButton.css";

function CreateRecepieButton() {
  const navigate = useNavigate();

  function toCreateRecepie() {
    navigate("/create-recipe");
  }

  return (
    <button id="createRecepieButton" className="secondary-button" onClick={toCreateRecepie}>
      +
    </button>
  );
}

export default CreateRecepieButton;
