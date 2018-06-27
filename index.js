class App {
  constructor() {
    const form = document.querySelector('#movieform')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.handleSubmit(event)
    })
    this.movies = []
  }

  renderSpan(className, value) {
    const span = document.createElement('span')
    span.classList.add(className)
    span.textContent = value
    return span
  }

  renderButton(value) {
    const button = document.createElement('button')
    button.textContent = value
    return button
  }

  renderListItem(movie) {
    const listItem = document.createElement('li')
    listItem.classList.add('movie')
    listItem.setAttribute('id', `${this.movies.length}`)

    const movieProps = Object.keys(movie)
    movieProps.forEach((prop) => {
      const span = this.renderSpan(prop, movie[prop])
      listItem.appendChild(span)
    })

    //add and bind listeners to favorite and trash button for each list item
    const trashButton = this.renderButton('Trash')

    trashButton.addEventListener('click', (event) => {
      this.handleTrash(event)
    })

    listItem.appendChild(trashButton)

    return listItem
  }
  
  handleTrash(event) {
    const id = event.target.parentElement.getAttribute('id')
    for(let i = 0; i < this.movies.length; i++) {
      if(id == (i+1)) {
        this.movies.pop(this.movies[i])
        const list = document.querySelector('#movies')
        const listItem = document.getElementById(id)
        list.removeChild(listItem)
      }
    }
  }

  handleSubmit(event) {
    //create new movie object
    const movie = {
      title: event.target.moviename.value,
      year: event.target.releaseyear.value,
    }

    //add the movie to the movies array
    this.movies.push(movie)
    
    const listItem = this.renderListItem(movie)

    document.querySelector('#movies').appendChild(listItem)

    //clears text box
    const f = event.target
    f.reset()
    f.moviename.focus()
  }
}

const app = new App()
