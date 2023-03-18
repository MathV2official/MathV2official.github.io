var imagesFolder = "https://mathv22.netlify.app/Toty/"; // Path to the images folder
var packImages = [
  {name: "VanDijk", ovr: 96, image: "VanDijk.png"},
  {name: "Hernandez", ovr: 94, image: "Hernandez.png"},
  {name: "Mbappe", ovr: 97, image: "Mbappe.png"},
  {name: "Messi", ovr: 98, image: "Messi.png"},
  {name: "Haaland", ovr: 96, image: "Haaland.png"},
  {name: "Benzema", ovr: 97, image: "Benzema.png"},
  {name: "Hakimi", ovr: 94, image: "Hakimi.png"},
  {name: "Courtois", ovr: 96, image: "Courtois.png"},
  {name: "Modric", ovr: 96, image: "Modric.png"},
  {name: "Bellingham", ovr: 95, image: "Bellingham.png"},
  {name: "Eder", ovr: 94, image: "Eder.png"},
  {name: "KDB", ovr: 97, image: "KDB.png"}
]; // List of image filenames and their corresponding OVRs

var packedImages = JSON.parse(getCookie("packedImages") || "[]") || [];

function displayPackedImages() {
  var imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";

  for (var i = 0; i < packedImages.length; i++) {
    var packedImage = packedImages[i];

    // Create the image element
    var image = document.createElement("img");
    image.src = imagesFolder + packedImage.image;
    image.id = packedImage.name;
    imageContainer.appendChild(image);
  }
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }
}

function setCookie(name, value) {
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // Set cookie to expire in 1 year
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to open the pack
function openTOTYPack() {
  var imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";

  // Choose a pack image
  var chosenImage = "TOTY.png"; // Change this to the name of the image you want to use

  // Find the corresponding object from the packImages list
  var packImage = packImages.find(function(image) {
    return image.image === chosenImage;
  });

  if (!packImage) {
    console.log("Error: Pack image not found.");
    return;
  }

  // Create the image element
  var image = document.createElement("img");
  image.src = imagesFolder + chosenImage;
  image.id = packImage.name;
  imageContainer.appendChild(image);

  // Create the counter element
  var counter = document.createElement("div");
  counter.id = "counter";
  counter.innerText = "0";
  imageContainer.appendChild(counter);

  // Start the counter
  var interval = setInterval(function() {
    var currentCounter = parseInt(counter.innerText);
    if (!isNaN(currentCounter) && currentCounter < packImage.ovr) {
      currentCounter++;
      counter.innerText = currentCounter.toString();
    } else {
      clearInterval(interval);
      // Add the packed image to the list
      packedImages.push(packImage);
      var queryString = "?packedImages=" + encodeURIComponent(JSON.stringify(packedImages));
      setTimeout(function() {
        imageContainer.innerHTML = "";
        displayPackedImages();
      }, 3000);
    }
  }, 10);
}



function viewCollection() {
  window.location.href = "totycollection.html";
}
