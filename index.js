// Variables that refer to the HTML document's element id's
const movieFormContainer = document.getElementById("movie-form-container")
const moviesContainer = document.getElementById("movies-container")
// let cancelMovieForm = document.getElementById("cancel-btn")
// let addMovieForm = document.getElementById("add-movie-form")

// When clicking Add Movie button, show the movie form
function showAddMovieForm() {
    movieFormContainer.classList.remove("hidden")
}

// When clicking Cancel button on movie form, hide the movie form
function cancelAddMovieForm(){
    movieFormContainer.classList.add("hidden")
}

/*
JSON.stringify() converts an object or array to a JSON string. (object/array -> JSON string)
JSON.parse() converts a JSON string to an object or array. (JSON string -> object/array)
*/

// Movie data array, Retrieving data from local storage.
// JSON.parse(localStorage.getItem("movieLog")) converts the saved JSON string into an array.
// If there’s no saved data, it initializes movies as an empty array.
let movies = JSON.parse(localStorage.getItem("movieLog")) || [];

renderMovies();

function addToLog(){
    // Creates a newMovie object from user input
    const newMovie = {
        title: document.getElementById("titleInput").value,
        director: document.getElementById("directorInput").value,
        genre: document.getElementById("genreInput").value
    }

    movies.push(newMovie) // Add movie to movies array
    saveMovies() // Save the updated array to localstorage
    renderMovies() // Update UI with new movie list
    cancelAddMovieForm() // Hide the form after submission
}

// Save movies to Localstorage, converts movies array to a JSON string and saves it to local storage.
function saveMovies() {
    localStorage.setItem("movieLog", JSON.stringify(movies))
}

// ChatGPT
function removeEntry(index) {
    movies.splice(index, 1);  // Remove movie at index
    saveMovies();  // Save updated array in local storage
    renderMovies();  // Re-render movie list, update UI
}

// From wishlist website, Amanda's code
function renderMovies(){
    moviesContainer.innerHTML = ""; // Clear container before rendering to prevent duplicate entries.

    // Loops through the movies array, creating a new card for each movie and displays it
    movies.forEach((entry, index) => {
        let card = document.createElement("div");
        card.className = "new-movie-card"
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${entry.title}</h5>
                    <p class="card-text">Director: ${entry.director}</p>
                    <p class="card-text">Genre: ${entry.genre}</p>
                    <button class="btn btn-primary" onclick="removeEntry(${index})" id="entryDeleteButton">Delete</button>
                    <button class="btn btn-primary" id="favorite" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        moviesContainer.appendChild(card); // Adds new movie card to the moviesContainer where it will be displayed
    });
}

renderMovies();



// When clicking Add to log button on movie form, it saves every input from movie form to local storage.
// Local storage can save data even when you close the browser.
// Code from tutorial
function addToLog3(){
    var title = document.getElementById("titleInput").value
    var director = document.getElementById("directorInput").value
    var genre = document.getElementById("genreInput").value
    
    localStorage.setItem("mtitle", title)
    localStorage.setItem("mdirector", director)
    localStorage.setItem("mgenre", genre)

    document.writeln(localStorage.getItem("mtitle"))
}

// AI Generated but tweaked to fit in?? -- Doesn't work still
function addToLog2(e) {
    e.preventDefault() // Prevents the default form submission behavior

    // Retrieves the movie title from the input field and removes extra spaces
    // If title is empty, the function exits early (prevents adding empty movies)
    const title = document.getElementById("titleInput").value.trim()
    if (!title) return

    // Creates a new movie object with properties populated from user input fields
    // id is generated to ensure uniqueness
    const newMovie = {
      id: Date.now().toString(),
      title: title,
      director: document.getElementById("directorInput").value.trim(),
      genre: document.getElementById("genreInput").value.trim(),
    }

    movies.unshift(newMovie) // Adds movies to the beginning of the movies array, so the latest movie appears first.
    saveMovies() // saves movies to local storage
    renderMovies() // update the UI and display the new movie
    cancelAddMovieForm() // hides the form after submission
  }

  function saveMovies() {
    localStorage.setItem("movieLog", JSON.stringify(movies))
  }

// Movie data array
// let movies = JSON.parse(localStorage.getItem("movieLog")) || [];
// let movieContainer = document.querySelector("#movieContainer");

// function removeEntry(index) {
//   movies.splice(index, 1)
//   localStorage.setItem("movieLog", JSON.stringify(movies));
//   render();
// }

// function render() {
//   movies.forEach((entry, index) => {
//     let card = document.createElement("div");
//     card.className = "newEntry"
//     card.innerHTML = `
//         <div class="card">
//         <div class="card-body">
//           <img class= "card-img-top" src=${entry.image}>
//           <h5 class="card-title">${entry.item}</h5>
//           <p class="card-text">Description: ${entry.description}</p>
//           <p class="card-text">Price: ${entry.price}</p>
//           <p class="card-text">Link: ${entry.link}</p>
//           <button class="btn btn-primary" onclick="removeEntry(${index})" id="entryDeleteButton">Delete</button>
//           <button class="btn btn-primary" id="favorite" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
//               <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
//             </svg></button>
//         </div>
//         </div>
//       `;
//       movieContainer.appendChild(card);
//   });
// }