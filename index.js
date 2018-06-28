class App {
  constructor() {
    const form = document.querySelector('#movieform')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.handleSubmit(event)
    })
    this.movies = []
    this.idCounter = 0;
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
      this.handleTrash(event)
    })

    faveButton.addEventListener('click', (event) => {
      this.handleFavorite(event)
    })

    listItem.appendChild(trashButton)
    listItem.appendChild(faveButton)

    return listItem
  }
  
  handleTrash(event) {
    const list = document.querySelector('#movies')
    const id = event.target.parentElement.getAttribute('id')
    for(let i = 0; i < this.movies.length; i++) {
      if(id == this.movies[i].id) {
        this.movies.splice(i, 1)
      }
    }
    list.removeChild(event.target.parentElement)
  }

  handleFavorite(event) {
    const id = event.target.parentElement.getAttribute('id')
    for(let i = 0; i < this.movies.length; i++) {
      if(id == this.movies[i].id) {
        let fave = this.movies[i].favorite
        fave = this.movies[i].favorite = !fave
        if(fave) {
          event.target.parentElement.classList.add('favorite')
          return
        }
        else {
          event.target.parentElement.classList.remove('favorite')
          return
        }
      }
    }
  }

  handleSubmit(event) {
    //create new movie object
    const movie = {
      title: event.target.moviename.value,
      year: '(' + event.target.releaseyear.value + ')',
      id: ++this.idCounter,
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
