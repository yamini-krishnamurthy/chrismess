const form = document.querySelector('#movieform')

const addMovie = function(event) {
  //prevents the form from actually submitting
  event.preventDefault()
  console.log(event.target.moviename.value)
  const listItem = document.createElement('li')
  listItem.textContent = event.target.moviename.value + ' ' + event.target.releaseyear.value
  document.querySelector('#movies').appendChild(listItem)
  //clears text box
  form.reset()
}

form.addEventListener('submit', addMovie)
