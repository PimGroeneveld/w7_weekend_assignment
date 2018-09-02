const Films = require("./models/films.js");
const FilmListView = require("./views/film_list_view.js");
const FilmInfoView = require("./views/film_info_view.js");
const DirectorSelect = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const films = new Films("All");

  const selectElem = document.querySelector('#director-select');
  const directorSelect = new DirectorSelect(selectElem, films.director);
  directorSelect.bindEvents();

  const filmListContainer = document.querySelector('#films');
  const filmListView = new FilmListView(filmListContainer);
  filmListView.bindEvents();

  films.getData();
  films.bindEvents();
})

// two issues still i think:
// list does not state unqique list of directors but all of them
// after click, the correct films get rendered to the screen. Only "All directors" to show everything not working yet. Overall the code is a bit messy since I wasnt very sure how to go about it
// would like to go over this during homework review
