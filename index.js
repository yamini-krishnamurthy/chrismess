const button = document.querySelector('button')

const changeHeading = function() {
  const heading = document.querySelector('#heading 2');
  heading.textContent = 'Heading changed!';
}

button.addEventListener('click', changeHeading)
