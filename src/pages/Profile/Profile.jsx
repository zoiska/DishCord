import { Bookmark, Book, Menu, X, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import RecipeTileList from "../../components/RecipeTileList/RecipeTileList";
import { useUserData } from "../../contexts/userDataContext.jsx";
import { filterRecipesByAuthor, getAllRecipes } from "../../services/RecipeService";
import { getUserData } from "../../services/UserService";
import "./Profile.css";

function Profile() {
  const [activeButton, setActiveButton] = useState("tab1");
  const [recipes, setRecipes] = useState([]);
  const [ownRecipes, setOwnRecipes] = useState([]);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  let { userData, setUserData } = useUserData();

  const menuRef = useRef(null);

  useEffect(() => {
    getUserData(setUserData);
  }, [setUserData]);

  useEffect(() => {
    if (!userData?.user?.username) return;
    filterRecipesByAuthor(userData?.user?.username).then((r) => {
      setOwnRecipes(r);
    });

    getAllRecipes().then((r) => {
      setRecipes(r);
    });
  }, [userData]);

  useEffect(() => {
    setFavouriteRecipes(
      recipes.filter((recipe) => userData.user.favoriteRecipes.includes(recipe._id))
    );
  }, [recipes, userData]);

  const handleButtonClick = (tab) => {
    setActiveButton(tab);
  };

  const handleMenuButtonClick = () => {
    setMenuOpen(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-header">
          <button className="menu-button">
            <Menu
              absoluteStrokeWidth={1}
              size={28}
              color="var(--color-primary)"
              onClick={handleMenuButtonClick}
            />
          </button>
          {userData?.user?.username && (
            <h1 className="title">Hello {userData.user.username + "!"}</h1>
          )}
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
                <RecipeTileList
                  recipes={ownRecipes}
                  user={userData.user}
                  setUserData={setUserData}
                />
              </div>
            )}
            {activeButton === "tab2" && (
              <div className="tab-content">
                <RecipeTileList
                  recipes={favouriteRecipes}
                  user={userData.user}
                  setUserData={setUserData}
                />
              </div>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="menu-overlay">
            <div className="menu-container" ref={menuRef}>
              <div className="menu-header">
                <span className="options-title">Options</span>
                <button className="menu-close-button" onClick={() => setMenuOpen(false)}>
                  <X absoluteStrokeWidth={1} size={28} color="var(--color-primary)" />
                </button>
              </div>
              <div className="menu-buttons">
                <button className="option-button">Hello</button>
                <button className="option-button">im</button>
                <button className="option-button">under</button>
                <button className="option-button">the</button>
                <button className="option-button">water</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
