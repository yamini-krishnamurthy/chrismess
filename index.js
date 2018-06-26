const form = document.querySelector('#movieform')

const renderTitle = function(event) {
  const title = document.createElement('b')
  title.textContent = event.target.moviename.value + ' '
  return title
}

const renderYear = function(event) {
  const year = document.createElement('em')
  year.setAttribute("class", "year")
  console.log(year)
  year.textContent = event.target.releaseyear.value
  return year
}

const renderListElement = function(event) {
  console.log(event.target.moviename.value)
  //using createElement is more safe as compared to innerHTML
  const listElement = document.createElement('li')
  listElement.appendChild(renderTitle(event))
  listElement.appendChild(renderYear(event))
  return listElement
}

const addMovie = function(event) {
  //prevents the form from actually submitting
  event.preventDefault()
  console.log(event.target.moviename.value)
  document.querySelector('#movies').appendChild(renderListElement(event))
  //clears text box
  form.reset()
}

form.addEventListener('submit', addMovie)
