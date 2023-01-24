// Get the search input and the circles container
const searchInput = document.getElementById('search');
const circlesContainer = document.querySelector('.circles-container');

// Listen for changes in the search input
searchInput.addEventListener('input', (event) => {
  // Get the search input value
  const searchValue = event.target.value.toLowerCase();

  // Get all the circles
  const circles = circlesContainer.querySelectorAll('.circle');

  // Loop through the circles and compare the text content to the search input value
  circles.forEach((circle) => {
    if (circle.textContent.toLowerCase().indexOf(searchValue) === -1) {
      // If the text content does not match the search input value, hide the circle
      circle.style.display = 'none';
    } else {
      // If the text content matches the search input value, show the circle
      circle.style.display = 'block';
    }
  });
});
