let rowData = document.getElementById("home");
let searchContainer = document.getElementById("searchContainer");
$("#open").click(function () {
  $(".side-nav").animate({ left: 0 }, 500);
  for (let i = 0; i < 5; i++) {
    $(".nav-list ul li").eq(i).animate({
        top: 0
    }, (i + 5) * 100)
}
  $("#open").addClass("d-none");
  $("#close").removeClass("d-none");
});

$("#close").click(function () {
  let navSideBar = $(".nav-tab").innerWidth();
  $(".side-nav").animate({ left: -navSideBar }, 500);
//   $(".nav-list ul li").hide(500);

$(".nav-list ul li").animate({
    top: 300
}, 500)
  $("#close").addClass("d-none");
  $("#open").removeClass("d-none");
});

$(".side-nav .nav-list ul li").click(function (e) {
  let navSideBar = $(".nav-tab").innerWidth();
  $(".side-nav").animate({ left: -navSideBar }, 500);
//   $(".nav-list ul li").hide(500);
  $("#close").addClass("d-none");
  $("#open").removeClass("d-none");
});
  

//
async function home() {
  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    let finalResponse = await api.json();
    displayMeals(finalResponse.meals);
    $('.loading').fadeOut(500,()=>{
      $("body").css("overflow", "visible")
      $('.loading').addClass('d-none');
    }) 
  }
  
  // data in home
  function displayMeals(arr) {
    let cartoona = "";
    
    for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div id='hide'  class="col-md-3">
      <div onclick="getId(${arr[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
      <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
      <div  class="meal-layer position-absolute d-flex align-items-center text-black p-2">
      <h3>${arr[i].strMeal}</h3>
      </div>
      </div>
      </div>
      `;
  }
  rowData.innerHTML = cartoona;
}

home();

// serach

function displaySearch() {
 
  searchContainer.innerHTML = `
    <div  class="row py-4">
    <div class="col-md-6">
    <input type="text" onkeyup="serachByName(this.value)" class="form-control bg-transparent text-white "placeholder="Search By Name">
    </div>
    <div class="col-md-6">
    <input type="text" onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white "placeholder="Search By First Letter">
    </div>
    </div>
    `;
  $("#home").addClass("d-none");
}
//  function getSearchNmae(){

async function serachByName(term) {
  $('.loading').removeClass('d-none')
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let finalResponse = await response.json();
  if (finalResponse.meals) {
    displayMeals(finalResponse.meals);
  } else {
    displayMeals([]);
  }
  $("#home").removeClass("d-none");
  $('.loading').fadeOut(500,()=>{
    $('.loading').addClass('d-none');
    $("body").css("overflow", "visible")
  }) 
}
async function searchByFLetter(term) {
  $('.loading').removeClass('d-none')

  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  let finalResponse = await response.json();
  if (finalResponse.meals) {
    displayMeals(finalResponse.meals);
  } else {
    displayMeals([]);
  }
  $("#home").removeClass("d-none");
  $('.loading').fadeOut(500,()=>{
    $('.loading').addClass('d-none');
    $("body").css("overflow", "visible")
  }) 

}

// category
async function getCategories() {
  $('.loading').removeClass('d-none')

  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  $(".inner-loading").fadeIn(300)
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let finalResponse = await response.json();
  // test(finalResponse.categories.strCategory);
  displayCategories(finalResponse.categories);
  $('.loading').fadeOut(500,()=>{
    $('.loading').addClass('d-none');
    $("body").css("overflow", "visible")
  }) 
  
}

function displayCategories(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
            <div class="col-md-3">
                    <div onclick="getCat('${
                      arr[i].strCategory
                    }')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${
                          arr[i].strCategoryThumb
                        }" alt="" srcset="">
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${arr[i].strCategory}</h3>
                            <p>${arr[i].strCategoryDescription
                              .split(" ")
                              .slice(0, 20)
                              .join(" ")}</p>
                        </div>
                    </div>
            </div>
            `;
  }

  rowData.innerHTML = cartoona;
}
// area
async function getArea() {
  $('.loading').removeClass('d-none')

  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let finalrespone = await respone.json();
  displayArea(finalrespone.meals);
  $('.loading').fadeOut(500,()=>{
    $('.loading').addClass('d-none');
    $("body").css("overflow", "visible")
  }) 
  
}
function displayArea(area) {
  let cartoona = "";
  for (let i = 0; i < area.length; i++) {
    cartoona += `
            <div class="col-md-3">
                    <div onclick="getarea('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${area[i].strArea}</h3>
                    </div>
                    </div>
                    `;
  }
  rowData.innerHTML = cartoona;
}

// Ingredients
async function getIngredients() {
  $('.loading').removeClass('d-none')

  rowData.innerHTML = "";

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  displayIngredients(respone.meals.slice(0, 20));
  $('.loading').fadeOut(500,()=>{
    $('.loading').addClass('d-none');
    $("body").css("overflow", "visible")
  })
}

function displayIngredients(ingered) {
  let cartoona = "";

  for (let i = 0; i < ingered.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div  onclick="getingred('${
                  ingered[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingered[i].strIngredient}</h3>
                        <p>${ingered[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = cartoona;
}

// getById

async function getId(id) {
  $('.loading').removeClass('d-none')

  searchContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let finalResponse = await respone.json();
  displayClickId(finalResponse.meals[0]);
  $('.loading').fadeOut(500,()=>{
    $('.loading').addClass('d-none');
    $("body").css("overflow", "visible")
  })

}

function displayClickId(data) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        data[`strMeasure${i}`]
      } ${data[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = data.strTags?.split(",");
  // let tags = meal.strTags.split(",")
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${data.strMealThumb}"
                    alt="">
                    <h2>${data.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${data.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${data.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${data.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  rowData.innerHTML = cartoona;
}
//
async function getCat(cat) {
  $('.loading').removeClass('d-none')

  rowData.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
  );
  let finalResponse = await respone.json();
  if (finalResponse.meals) {
    displayMeals(finalResponse.meals);
  } else {
    displayMeals([]);
  }
  $('.loading').fadeOut(500,()=>{
    $('.loading').addClass('d-none');
    $("body").css("overflow", "visible")
  })
}
async function getarea(area) {
  $('.loading').removeClass('d-none')

  rowData.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let finalResponse = await respone.json();
  if (finalResponse.meals) {
    displayMeals(finalResponse.meals);
  } else {
    displayMeals([]);
  }
  $('.loading').fadeOut(500,()=>{
    $('.loading').addClass('d-none');
    $("body").css("overflow", "visible")
  })
}
async function getingred(ingered) {
  $('.loading').removeClass('d-none')

  rowData.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingered}`
  );
  let finalResponse = await respone.json();
  if (finalResponse.meals) {
    displayMeals(finalResponse.meals);
  } else {
    displayMeals([]);
  }
  $('.loading').fadeOut(500,()=>{
    $('.loading').addClass('d-none');
    $("body").css("overflow", "visible")
  })
}
//

function showContacts() {
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;

  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });
  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });
  document.getElementById("phoneInput").addEventListener("focus", () => {
    phneInputTouched = true;
  });
  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });
  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });
  document.getElementById("repasswordInput").addEventListener("focus", () => {
    passwordRInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let passwordRInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (phneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (passwordRInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}


// 
$('#home').click(function () { 
  let navSideBar = $(".nav-tab").innerWidth();
  $(".side-nav").animate({ left: -navSideBar }, 500);
//   $(".nav-list ul li").hide(500);
  $("#close").addClass("d-none");
  $("#open").removeClass("d-none");
});
//