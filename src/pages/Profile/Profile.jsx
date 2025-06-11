import { Bookmark, Book, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import RecipeTileList from "../../components/RecipeTileList/RecipeTileList";
import { getAllRecipes } from "../../services/RecipeService";
import "./Profile.css";

function Profile() {
  const [activeButton, setActiveButton] = useState("tab1");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes().then((r) => {
      setRecipes(r);
    });
  }, []);

  const handleButtonClick = (tab) => {
    setActiveButton(tab);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h1 className="title">Hello Username</h1>
      </div>
      <div className="profile-content">
        <div className="profile-buttons">
          <button
            onClick={() => handleButtonClick("tab1")}
            className={`profile-button ${activeButton === "tab1" ? "active" : ""}`}
          >
            <Book absoluteStrokeWidth={1} size={28} color="var(--color-primary)" />
          </button>
          <button
            onClick={() => handleButtonClick("tab2")}
            className={`profile-button ${activeButton === "tab2" ? "active" : ""}`}
          >
            <Bookmark absoluteStrokeWidth={1} size={28} color="var(--color-primary)" />
          </button>
        </div>
        <div className="profile-tab-content">
          {activeButton === "tab1" && (
            <div className="tab-content">
              <RecipeTileList recipes={recipes} />
            </div>
          )}
          {activeButton === "tab2" && (
            <div className="tab-content">
              <RecipeTileList recipes={recipes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
