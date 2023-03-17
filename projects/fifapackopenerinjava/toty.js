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

var packedImages = JSON.parse(getCookie("packedImages") || "[]");

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

// Function to open the pack
function openTOTYPack() {
    var imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = "";
  
    // Select a random pack image
    var randomIndex = Math.floor(Math.random() * packImages.length);
    var packImage = packImages[randomIndex];
  
    // Create the image element
    var image = document.createElement("img");
    image.src = imagesFolder + packImage.image;
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
      if (currentCounter < packImage.ovr) {
        currentCounter++;
        counter.innerText = currentCounter.toString();
      } else {
        clearInterval(interval);
        // Add the packed image to the list
        packedImages.push(packImage);
        var queryString = "?packedImages=" + encodeURIComponent(JSON.stringify(packedImages));
        
        // Remove the image and counter elements after 3 seconds
        setTimeout(function() {
          imageContainer.removeChild(image);
          imageContainer.removeChild(counter);
        }, 3000);
  
        // Create a new image element for the chosen card
        var chosenImage = document.createElement("img");
        chosenImage.src = imagesFolder + packImage.image;
        chosenImage.id = packImage.name;
        imageContainer.appendChild(chosenImage);
  
        // Redirect to the collection page after 3 seconds
        setTimeout(function() {
          window.location.href = "totycollection.html" + queryString;
        }, 3000);
      }
    }, 10);
  }
  

// Function to view the collection
function viewCollection() {
  window.location.href = "totycollection.html";
}

displayPackedImages();
