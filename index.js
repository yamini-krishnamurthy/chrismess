const button = document.querySelector('button')

const changeHeading = function() {
  const heading = document.querySelector('#headingTwo');
  heading.textContent = 'Heading changed!';
}

button.addEventListener('click', changeHeading)
