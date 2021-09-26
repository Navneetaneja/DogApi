var start = 0;
var loadIndex=0;
var data=null;
const ul = document.createElement("ul");
const container = document.getElementsByClassName("container")[0];
const select = document.getElementById("dropdown");
let dogBreed = [];
var breedData = null;
ul.className = "row";
container.appendChild(ul);

/* change color of names of dog according to breeds*/

const changeTextColor = (breed, text) => {
//   console.log(breed, text);
  switch (breed) {
    case "Toy":
      text.style.color = "red";
      break;
    case "Hound":
      text.style.color = "darkgreen";
      break;
    case "Terrier":
      text.style.color = "brown";
      break;
    case "Working":
      text.style.color = "orange";
      break;
    case "Mixed":
      text.style.color = "blue";
      break;
    case "Sporting":
      text.style.color = "purple";
      break;
    case "Non-Sporting":
      text.style.color = "royalblue";
      break;
    case "Herding":
      text.style.color = "cyan";
      break;
    default:
      text.style.color = "black";
      break;
  }
};

/* adding images of dog */
/* initially adding 10 images of dog and giving load more button to add more images */

const addDogImage = () => {
  for (var i = start; i < start + 10; i++) {
    const li = document.createElement("li");
    let img = document.createElement("img");
    img.src = data[i].image.url;
    img.className = "imageOfDog rounded";
    let text = document.createTextNode(data[i].name);

    // console.log(img);
    li.style.textAlign="center";
    li.appendChild(img);
    li.appendChild(text);
    li.className = "col-12 col-sm-6 col-md-4 element";
    changeTextColor(data[i].breed_group, li);
    ul.appendChild(li);
  }

  if (loadIndex == 0) {
    const btn = document.createElement("button");
    const textNode = document.createTextNode("Load More...");
    btn.className="bg-info text-white rounded btn-set";
    btn.style.border="none";
    btn.appendChild(textNode);
    btn.onclick = addDogImage;
    container.appendChild(btn);
  }
  start += 10;
  loadIndex+=10;
};

/* adding 10 images of image on load of document  */

window.addEventListener("load", () => {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var responseJSON = JSON.parse(xhrRequest.response);
    // console.log(responseJSON);
    data = responseJSON;

    responseJSON.forEach((element) => {
      if (
        !dogBreed.includes(element.breed_group) && element.breed_group !== undefined &&
        element.breed_group !== null && element.breed_group.length != 0
      ) {
        dogBreed.push(element.breed_group);
        const option = document.createElement("option");
        const text = document.createTextNode(element.breed_group);
        option.appendChild(text);
        select.appendChild(option);
      }
    });
    addDogImage();
  };
  xhrRequest.open("get", "https://api.thedogapi.com/v1/breeds", true);
  xhrRequest.send();
});

/* adding images of dog breed wise */

const addBreedImage = () => {
//   console.log(data);
  for (var i = 0; i < breedData.length; i++) {
    const li = document.createElement("li");
    let img = document.createElement("img");
    img.src = breedData[i].image.url;
    img.className = "imageOfDog rounded";
    const textNode = document.createTextNode(breedData[i].name);
    // console.log(img);
    li.style.textAlign="center";
    li.appendChild(img);
    li.appendChild(textNode);
    li.className = "col-12 col-sm-6 col-md-4 element";
    ul.appendChild(li);
  }
};

/* filtering data of image by changing values of dropdown */

select.addEventListener("change", (e) => {
  var type = e.target.value;
//   console.log(type);
  ul.innerHTML = "";
  if(type=="Random")
  {
    start=0;
    addDogImage();
  }
  else{
  breedData = data.filter((dog) => dog.breed_group == type);
//   start = 0;
  addBreedImage();
  }
});
