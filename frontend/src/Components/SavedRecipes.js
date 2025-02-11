import { useState, useEffect } from "react";
import LoginError from "./LoginError";
import axios from "axios";

function Saved() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const getSavedRecipe = async () => {
      await axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/recipes/saved`,
          {},
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          setSavedRecipes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSavedRecipe();
  }, []);

  if (token) {
    return (
      <>
        <div className="homeDiv">
          <h2 className="subtitle">Saved Recipes</h2>
          <ul>
            {savedRecipes.length === 0 ? (
              <div>
                <h3 className="blank-text">You have no saved recipes.</h3>
              </div>
            ) : (
              savedRecipes.map((recipe) => (
                <li className="recipe-card" key={recipe.recipeID}>
                  <img src={recipe.imgURL} alt={recipe.name} />
                  <h3>{recipe.name}</h3>
                  <div className="inst">
                    <h4>Instructions</h4>
                    <p>{recipe.instructions}</p>
                  </div>
                  <h4>Time Required: {recipe.time}</h4>
                  <h4>Uploaded by: {recipe.username}</h4>
                </li>
              ))
            )}
          </ul>
        </div>
      </>
    );
  } else {
    return <LoginError />;
  }
}

export default Saved;
