// Variables that refer to the HTML document's element id's
const movieFormContainer = document.getElementById("movie-form-container")
const moviesContainer = document.getElementById("movies-container")

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
// JSON.parse(localStorage.getItem("movieLog")) converts the saved JSON string into an array. movieLog is a key stored in a browser's local storage.
// If there’s no saved data, it initializes movies as an empty array.
let movies = JSON.parse(localStorage.getItem("movieLog")) || [];

renderMovies();

// When clicking Add to log button on movie form, it saves every input from movie form to local storage.
// Local storage can save data even when you close the browser.
function addToLog(){
    // Creates a newMovie object from user input
    const newMovie = {
        title: document.getElementById("titleInput").value,
        director: document.getElementById("directorInput").value,
        genre: document.getElementById("genreInput").value,
        rating: document.getElementById("ratingInput").value,
        watchStatus: document.getElementById("watchStatusInput").value,
        notes: document.getElementById("notesInput").value,
        image: document.getAnimations("imageInput").value
    }

    movies.push(newMovie) // Add newMovie object to movies array
    saveMovies() // Save the updated array to localstorage
    renderMovies() // Update UI with new movie list
    cancelAddMovieForm() // Hide the form after submission
}

// Save movies to Localstorage, converts movies array to a JSON string and saves it to local storage.
function saveMovies() {
    localStorage.setItem("movieLog", JSON.stringify(movies))
}

// ChatGPT
function removeMovies(index) {
    movies.splice(index, 1);  // Remove movie at index
    saveMovies();  // Save updated array in local storage
    renderMovies();  // Re-render movie list, update UI
}

function editMovies(index){
    showAddMovieForm()
    // TODO: Save original input values onto a new edit movie form
    //removeMovies(index)
}

// Base is from wishlist website
function renderMovies(){
    moviesContainer.innerHTML = ""; // Clear container before rendering to prevent duplicate entries.

    // Loops through the movies array, creating a new card for each movie and displays it
    // <img class= "card-image" src=${entry.image}> --> for poster image in the future
    movies.forEach((entry, index) => {
        let card = document.createElement("div");
        card.className = "new-movie-card"
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${entry.title}</h5>
                    <p class="card-text">Director: ${entry.director}</p>
                    <p class="card-text">Genre: ${entry.genre}</p>

                    <p class="card-rating">Rating:
                    <select id="rating-${index}" class="form-select form-select-sm mt-3">
                        <option value="⭐" ${entry.rating === "⭐" ? "selected" : ""}>⭐</option>
                        <option value="⭐⭐" ${entry.rating === "⭐⭐" ? "selected" : ""}>⭐⭐</option>
                        <option value="⭐⭐⭐" ${entry.rating === "⭐⭐⭐" ? "selected" : ""}>⭐⭐⭐</option>
                        <option value="⭐⭐⭐⭐" ${entry.rating === "⭐⭐⭐⭐" ? "selected" : ""}>⭐⭐⭐⭐</option>
                        <option value="⭐⭐⭐⭐⭐" ${entry.rating === "⭐⭐⭐⭐⭐" ? "selected" : ""}>⭐⭐⭐⭐⭐</option>
                    </select>
                    </p>

                    <p class="card-watch-status">Watch Status:
                    <select id="watchStatus-${index}" class="form-select form-select-sm mt-3">
                        <option value="Not Watched" ${entry.watchStatus === "Not Watched" ? "selected" : ""}>Not Watched</option>
                        <option value="Watching" ${entry.watchStatus === "Watching" ? "selected" : ""}>Watching</option>
                        <option value="Completed" ${entry.watchStatus === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                    </p>
                    
                    <p class="card-notes">Notes: ${entry.notes}</p>

                    <button class="btn btn-outline-danger" onclick="removeMovies(${index})" id="entryDeleteButton">Delete</button>
                    <button class="btn btn-outline-dark" onclick="editMovies(${index})" id="edit-btn">Edit</button>
                    <button class="btn btn-outline-primary" id="favorite" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        moviesContainer.appendChild(card); // Adds new movie card to the moviesContainer where it will be displayed
        
        // Added event listener to update rating status in localStorage
        let ratingDropdown = document.getElementById(`rating-${index}`);
        ratingDropdown.addEventListener("change", function () {
            movies[index].rating = this.value;
            saveMovies(); // Save updated status
        });

        // Ensure dropdown reflects stored watchStatus, ChatGPT
        // let watchStatusDropdown = document.getElementById(`watchStatus-${index}`);
        // watchStatusDropdown.value = entry.watchStatus; 

        // Added event listener to update watch status in localStorage, ChatGPT
       let watchStatusDropdown = document.getElementById(`watchStatus-${index}`);
        watchStatusDropdown.addEventListener("change", function () {
            movies[index].watchStatus = this.value;
            saveMovies(); // Save updated status
        });

    });
}

renderMovies();