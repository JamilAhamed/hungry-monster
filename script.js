const foods = searchFood =>{
    const foodsName = document.getElementById("Input-meal").value;
    const foodResult = document.getElementById("Search-result");
    foodResult.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodsName}`)
    .then(res => res.json())
    .then(data => foodDisplay(data))
    .catch(ifError =>{
        const searchDetails = document.getElementById("meals-detail");
        const notFoundAnything = `
        <h4 id= "error"> There is no content you that you search!! Please write some valid Name!!</h4>
        `;
        searchDetails.innerHTML= notFoundAnything;
        const foodResult = document.getElementById("Search-result");
        foodResult.innerHTML = ''; 
        document.getElementById("Input-meal").value = '';
    });
     const foodDisplay = meals =>{
        const mealsName= meals.meals
        const foodResult = document.getElementById("Search-result");
        mealsName.forEach(meal => {
            const mealDiv = document.createElement("div");
            mealDiv.className = "mealDiv";
            const foodInfo = `
            <img onclick="foodDetails(${meal.idMeal})"src="${meal.strMealThumb} ">
            <br>
            <a onclick="foodDetails(${meal.idMeal})">${meal.strMeal} </a>
            `;
            mealDiv.innerHTML = foodInfo;
            foodResult.appendChild(mealDiv);
            const errorMessage = document.getElementById("error")
            if(errorMessage != null){
                document.getElementById("error").innerText = "";
            }
            document.getElementById("Input-meal").value = '';
        });
        }         
}
const foodDetails = id =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => renderDetails(data))
}
const renderDetails = meals =>{
    const mealDetails = document.getElementById("meals-detail");
    const foodDetails= meals.meals[0];
    mealDetails.innerHTML = `
    <div id="foodsDetail">
    <img src="${foodDetails.strMealThumb}">
    <h2>${foodDetails.strMeal}</h2>
    <h4> Ingredients:<h4>
    <ul><li>${foodDetails.strMeasure1} ${foodDetails.strIngredient1}</li> 
    <li>${foodDetails.strMeasure2} ${foodDetails.strIngredient2}</li> 
    <li>${foodDetails.strMeasure3} ${foodDetails.strIngredient3}</li> 
    <li>${foodDetails.strMeasure4} ${foodDetails.strIngredient4}</li> 
    <li>${foodDetails.strMeasure5} ${foodDetails.strIngredient5}</li> 
    <li>${foodDetails.strMeasure6} ${foodDetails.strIngredient6}</li> 
    <li>${foodDetails.strMeasure7} ${foodDetails.strIngredient7}</li> 
    <li>${foodDetails.strMeasure8} ${foodDetails.strIngredient8}</li></ul>    
    </div>
    `;
} 