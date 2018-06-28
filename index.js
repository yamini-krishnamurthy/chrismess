class App {
  constructor() {
    const form = document.querySelector('#movieform')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.handleSubmit(event)
    })

    this.list = document.querySelector('#movies')
    this.movies = []
    this.load()
  }

  renderSpan(className, value) {
    const span = document.createElement('span')
    span.classList.add(className)
    span.textContent = value
    return span
  }  

  save() {
    localStorage.setItem('movies', JSON.stringify(this.movies))
  }

  load() {
    const movies = JSON.parse(localStorage.getItem('movies')) || []

    if(movies)
      movies.forEach(movie => this.addMovie(movie))
  }

  renderButton(className) {
    const button = document.createElement('button')
    button.classList.add(className)
    if(className == 'trash')
      button.innerHTML = '<i class="far fa-trash-alt" title="trash movie"></i>'
    else 
      button.innerHTML = '<i class="fas fa-star" title="favorite movie"></i>'
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
    const trashButton = this.renderButton('trash')
    const faveButton = this.renderButton('fave')

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

  addMovie(movie) {
    //add the movie to the movies array
    this.movies.push(movie)

    const listItem = this.renderListItem(movie)

    if (movie.favorite) {
      listItem.classList.add('favorite')
    }

    this.list.appendChild(listItem)
  }

  handleTrash(event, movie) {
    //better way to handle deletion: pass the listItem as an argument to this function
    //also pass the movie as an argument so it can easily be popped out
    const list = document.querySelector('#movies')
    const listItem = event.target.closest('.movie')
    list.removeChild(listItem)
    this.movies.splice(this.movies.indexOf(movie), 1)
    this.save()
  }

  handleFavorite(event, movie) {
    const listItem = event.target.closest('.movie')
    movie.favorite = listItem.classList.toggle('favorite')
    this.save()
  }

  handleSubmit(event) {
    //create new movie object
    const movie = {
      title: event.target.moviename.value,
      year: '  (' + event.target.releaseyear.value + ')',
    }

    this.addMovie(movie)
    this.save()

    //clears text box
    const f = event.target
    f.reset()
    f.moviename.focus()
  }
}

const app = new App()
