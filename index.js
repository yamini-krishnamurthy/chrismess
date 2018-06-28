class App {
  constructor() {
    const form = document.querySelector('#movieform')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.handleSubmit(event)
    })
    this.movies = []
    this.list = document.querySelector('#movies')
  }

  renderSpan(className, value) {
    const span = document.createElement('span')
    span.classList.add(className)
    span.textContent = value
    return span
  }

  renderButton(className, value) {
    const button = document.createElement('button')
    button.classList.add(className)
    button.textContent = value
    return button
  }

  renderListItem(movie) {
    const listItem = document.createElement('li')
    listItem.classList.add('movie')
    listItem.setAttribute('id', this.idCounter)

    const movieProps = Object.keys(movie)
    movieProps.forEach((prop) => {
      if(prop == 'favorite' || prop == 'id')
        return
      const span = this.renderSpan(prop, movie[prop])
      listItem.appendChild(span)
    })

    //add and bind listeners to favorite and trash button for each list item
    const trashButton = this.renderButton('trash', 'Trash')
    const faveButton = this.renderButton('fave', 'Favorite')

    trashButton.addEventListener('click', (event) => {
      this.handleTrash(event, movie)
    })

    faveButton.addEventListener('click', (event) => {
      this.handleFavorite(event, movie)
    })

    listItem.appendChild(trashButton)
    listItem.appendChild(faveButton)

    return listItem
  }
  
  handleTrash(event, movie) {
    //better way to handle deletion: pass the listItem as an argument to this function
    //also pass the movie as an argument so it can easily be popped out
    const list = document.querySelector('#movies')
    const listItem = event.target.closest('.movie')
    list.removeChild(listItem)
    this.movies.splice(this.movies.indexOf(movie), 1)
  }

  handleFavorite(event, movie) {
    const listItem = event.target.closest('.movie')
    movie.favorite = listItem.classList.toggle('favorite')
  }

  handleSubmit(event) {
    //create new movie object
    const movie = {
      title: event.target.moviename.value,
      year: '  (' + event.target.releaseyear.value + ')',
    }

    //add the movie to the movies array
    this.movies.push(movie)
    
    const listItem = this.renderListItem(movie)

    this.list.appendChild(listItem)

    //clears text box
    const f = event.target
    f.reset()
    f.moviename.focus()
  }
}

const app = new App()
