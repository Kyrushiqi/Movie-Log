// Movie data array
let movies = JSON.parse(localStorage.getItem("movieLog")) || []

// Variables that refer to the HTML document's element id's
let movieFormContainer = document.getElementById("movie-form-container")
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