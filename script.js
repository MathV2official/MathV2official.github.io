const circles = document.querySelectorAll('.circle');

circles.forEach((circle) => {
  circle.addEventListener('mouseover', () => {
    circle.style.visibility = 'hidden';
  });
});
