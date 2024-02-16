const cl = console.log;

const recipeform = document.getElementById("recipeform");
const thumbnailimg = document.getElementById("thumbnailimg");
const bannerimg = document.getElementById("bannerimg");
const titleControl = document.getElementById("name")
const foodtype = document.getElementById("foodtype")
const recipeDetails = document.getElementById("recipeDetails")
const durationInput = document.getElementById("durationInput")
const difficulty = document.getElementById("difficulty")
const chipsContainer = document.getElementById('chipsContainer');
const featuredrecipeContainer = document.getElementById("featuredrecipeContainer");

const baseUrl = `https://movie-model-39c1b-default-rtdb.asia-southeast1.firebasedatabase.app/`;
const recipeUrl = `${baseUrl}/recipe.json`;

const makeapicall = async (apiUrl, methodname, bodymsg = null) => {
    let resp = await fetch(apiUrl, {
        method : methodname,
        body : bodymsg,
        "content-type" : "application/json"
    })
    return await resp.json();
}
const imgtobase64 = inputcontrol => {
    return new Promise((resolve, reject) => {
        let file = inputcontrol.files[0];
        if(file){
            let reader = new FileReader;
            reader.onload = e => {
                let imgobj = {
                    title : file.name,
                    type : file.type,
                    filesize : file.size,
                    uploadtime : Date.now(),
                    base64img : e.target.result
                }
                resolve(imgobj);
            }
            reader.readAsDataURL(file)
        }else{
            reject(`something went wrong`);
        }
    })
}
let arr = [];
const onSubmitRecipe = async eve => {
    eve.preventDefault();
    try {
        let addRecipeObj = {
            title : titleControl.value,
            foodtype: foodtype.value,
            thumbimg : await imgtobase64(thumbnailimg),
            bannerimg : await imgtobase64(bannerimg),
            recipeinfo : recipeDetails.value,
            time : durationInput.value,
            difficulty : difficulty.value,
            ingredients : arr
        }
        makeapicall(recipeUrl, "POST", JSON.stringify(addRecipeObj));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Added you recipe",
            showConfirmButton: false,
            timer: 1500
          });
    } catch (error) {
        alert(error);
    }
    eve.target.reset()
    chipsContainer.innerHTML = "";
}
function addChip() {
    const chipInput = document.getElementById('chipInput');
    const chipText = chipInput.value.trim();
    if (chipText !== '') {
      const chipsContainer = document.getElementById('chipsContainer');
      const chip = document.createElement('div');
      chip.classList.add('chip');
      chip.innerHTML = chipText + '<span class="close" onclick="removeChip(this)">&times;</span>';
      chipsContainer.appendChild(chip);
      chipInput.value = '';
      arr.push(chipText);
    }
}
function removeChip(element) {
    const chipsContainer = document.getElementById('chipsContainer');
    chipsContainer.removeChild(element.parentNode);
}

recipeform.addEventListener("submit", onSubmitRecipe)