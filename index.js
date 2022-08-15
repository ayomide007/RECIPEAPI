
let result = document.getElementById("result"); 
let searchBtn = document.getElementById("search-btn"); //SEARCH BUTTON VARIABLE
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";  //API URL ASSIGNING TO VARIABLE

searchBtn.addEventListener("click", () => {  //SEARCH BUTTON EVENT
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) { //check if textbox empty and in
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;  //ALERT MESSAGE IF NO THERE'S NO INPUT
  } else {
    fetch(url + userInp) // REQUESTING PROMISE FROM THE URL
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strInstructions);
        let count = 1;
        let ingredients = []; 
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) { //CHECKING THE INPUT VAR FROM THE RETURNS PROMISES
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients);
// DISPLAYING THE RESULT 
        result.innerHTML = `  
    <img src=${myMeal.strMealThumb}>
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
    `;
        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li"); //METHOD CREATING HTML ELEMENT FOR THE RESULT
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => { //EVENT HANDLER FOR CLOSING RESULT POP UPS
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;  //CATCHING ERROR 
      });
  }
});