const Films = require("./models/films.js");
const FilmListView = require("./views/film_list_view.js");
const FilmInfoView = require("./views/film_info_view.js");
// const DirectorSelect = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  // const selectElem = document.querySelector('#director-select');
  // const directorSelect = new DirectorSelect(selectElem, films.director);
  // directorSelect.bindEvents();

  const filmListContainer = document.querySelector('#films');
  const filmListView = new FilmListView(filmListContainer);
  filmListView.bindEvents();

  const films = new Films();
  films.getData();
})
