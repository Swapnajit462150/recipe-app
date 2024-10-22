const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDetails = document.querySelector('.recipe-details');

const fetchRecipes = async (recipes) =>{
    recipecontainer.innerHTML = `<h3> Fetching Recipes... </h3>`;
    try{ const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${recipes}`);
        const response =  await data.json();

        recipecontainer.innerHTML ="";
        response.meals.forEach(meal =>{
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML=`<img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish </p>
            <p> Belongs to <span>${meal.strCategory}</span> Category</p>`

            const button =document.createElement("button");
            button.textContent = "view Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click',()=>{
                openRecipePopup(meal);
            });
            
            recipecontainer.appendChild(recipeDiv);
        });
    }catch (error){
        recipecontainer.innerHTML ="<h2> Something Went wrong plese try after some time... </h2>"
    }
}
    const fetchIngredients=(meal)=>{
        let ingrdientsList = "";
        for(let i=1; i<=20; i++){
            const ingredient = meal[`strIngredient${i}`];
            if(ingredient)
{
    const measure = meal[`strMeasure${i}`];
    ingrdientsList +=`<li>${measure} ${ingredient}</li>`

}  else{
    break;
}      }return ingrdientsList;

    }


    const openRecipePopup =(meal)=>{
        recipeDetailsContent.innerHTML =`
        <img src="${meal.strMealThumb}">
        <h3 class="recipeName">${meal.strMeal}</h3>
        <h4 class="recipeIngredients">Ingredents:</h4>
        <ul>${fetchIngredients(meal)}</ul>
        <div class"recipeinstructions">
            <h4 class"instruction"> Instuctions : </h4>
            <p>${meal.strInstructions} </p>
        </div>
        `
        recipeDetailsContent.parentElement.style.display="block"
    }

    recipeCloseBtn.addEventListener('click' , ()=>{
        recipeDetails.style.display="none";
    })


    searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
})