const cl = console.log;

const toggleicon = document.getElementById("toggle");
const recipeform = document.getElementById("recipeform");
const thumbnailimg = document.getElementById("thumbnailimg");
const bannerimg = document.getElementById("bannerimg");
const titleControl = document.getElementById("name")
const foodtype = document.getElementById("foodtype")
const recipeDetails = document.getElementById("recipeDetails")
const durationInput = document.getElementById("durationInput")
const difficulty = document.getElementById("difficulty")
const featuredrecipeContainer = document.getElementById("featuredrecipeContainer")

const baseUrl = `https://movie-model-39c1b-default-rtdb.asia-southeast1.firebasedatabase.app/`;
const recipeUrl = `${baseUrl}/recipe.json`;

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})
const makeapicall = async (apiUrl, methodname, bodymsg = null) => {
    let resp = await fetch(apiUrl, {
        method : methodname,
        body : bodymsg,
        "content-type" : "application/json"
    })
    return await resp.json();
}
const objtoarr = obj => {
    let recipeArr = [];
    for (const key in obj) {
       let data = obj[key];
       data.id = key;
       recipeArr.push(data);
    }
    return recipeArr;
}

const loader = eve => {
    let getid = eve.closest('.recipe-img').id;
    let currentUrl = new URL(window.location.href);
    let queryparams = new URLSearchParams();
    queryparams.set('recipeid', getid)
    currentUrl.search = queryparams;
    let recipeUrl = `${currentUrl.origin}/recipe.html${currentUrl.search}`
    window.location.href = recipeUrl;
}

const recipobjtem= obj => {
    let div = document.createElement('div');
    div.className = "col-lg-3 col-md-6 col-12";
    div.innerHTML = `
                    <figure class="recipe-img" id="${obj.id}">
                        <a href="javascript:;" class="d-flex" onclick="loader(this)">
                            <img src="${obj.bannerimg.base64img}" alt="">
                            <div class="hover-recipe"></div>
                            <div class="hover-text">view recipe</div>
                        </a>
                    <figcaption>
                        <h2 class="text-uppercase py-3 m-0">${obj.title}</h2>
                        <hr class="m-0">
                        <div class="recipe-time py-2 d-flex text-capitalize">
                        <span>
                            <i class="fa-regular fa-clock"></i> ${obj.time} minutes</span>
                        <span>${obj.foodtype} </span>
                        </div>
                        <hr class="m-0">
                    </figcaption>
                </figure>
            `
            featuredrecipeContainer.prepend(div);   
}
const recipetemp = eve => {
    eve.forEach(ele => {
        recipobjtem(ele)
    });
}
async function init(){
    try{
        let data = await makeapicall(recipeUrl, "GET");
        let arrobj = objtoarr(data)
        recipetemp(arrobj);
    }catch(err){
        alert(err)
    }
}
init();

const onclick = eve => {
    eve.target.classList.toggle("fa-bars");
    eve.target.classList.toggle("fa-xmark");
}
toggleicon.addEventListener("click", onclick);