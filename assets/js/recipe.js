const cl = console.log;

const recipeimg = document.getElementById('recipeinfo');
const recipeimg2 = document.getElementById('recipeinfo2');
const ingredients = document.getElementById('ingredients');
const card = document.getElementById('card');
const heading = document.getElementById('pri-heading')

const baseUrl = `https://movie-model-39c1b-default-rtdb.asia-southeast1.firebasedatabase.app/`;
const recipeUrl = `${baseUrl}/recipe.json`;




const makeapicall = async(apiUrl, methodname, bodymsg= null) => {
    try {
        let resp = await fetch(apiUrl, {
            method : methodname,
            body : bodymsg,
            "content-type" : "application/json"
        })
        return await resp.json();
    } catch (error) {
        cl(error)
    }
}

const recipeimgtemp = eve => {
    recipeimg.innerHTML = `<img src="${eve.thumbimg.base64img}" alt="foodimg" title="foodimg">`;
    recipeimg2.innerHTML = `<img src="${eve.bannerimg.base64img}" alt="foodimg" title="foodimg">`;
}

const direction = eve => {
    card.innerHTML = `
                <div class='card-header'>
                    <h4 class='m-0'>Follow Instruction : </h4>
                </div>
                <div class='card-body'>
                    <p class='m-0'>
                        ${eve.recipeinfo}
                    </p>
                </div>
    `
}
const title = eve => {
    heading.innerHTML = `<h2 class="pri-heading">
                            ${eve.title}
                        </h2>
                        `
}

const imgTemp = eve => {
    let result = '';
    eve.forEach((ele,i) => {
        result += `
                <li>
                    <input type="checkbox" id="${i+1}">
                    <label for="${i+1}" class="m-0 ml-4">${ele}</label>
                </li>
        `
    });
    ingredients.innerHTML = result;
}

document.addEventListener('DOMContentLoaded', async() => {
    let currentUrl = new URL(window.location.href);
    let queryparams = new URLSearchParams(currentUrl.search);
    let getrecipeid = queryparams.get('recipeid');
    let recipeUrl = `${baseUrl}/recipe/${getrecipeid}.json`;
    let data = await makeapicall(recipeUrl, "GET");
    cl(data)
    recipeimgtemp(data);
    imgTemp(data.ingredients)
    direction(data)
    title(data)
})


$('.owl-carousel').owlCarousel({
    margin:10,
    dots:true,
    responsive:{
        0:{
            items:1,
            loop: true,
            autoplay: true
        },
        600:{
            items:1
        },
        1000:{
            items:1,
        }
    }
})



