const form = document.querySelector('#movieform')

const changeHeading = function(event) {
  event.preventDefault()
  console.log(event.target.moviename.value)
  document.querySelector('h1').textContent = event.target.moviename.value
  event.target.moviename.value = ''
}

form.addEventListener('submit', changeHeading)
