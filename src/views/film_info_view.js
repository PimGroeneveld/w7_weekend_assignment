const PubSub = require('../helpers/pub_sub.js');

const FilmInfoView = function (container, film) {
  this.filmsContainer = container;
  this.film = film;
};

FilmInfoView.prototype.render = function () {
  const filmContainer = document.createElement('div');
  filmContainer.classList.add('film');

  // const name = this.createFilmHeading()
  // filmContainer.appendChild(name);
  //
  // const munroInfo = this.createFilmInfo();
  // filmContainer.appendChild(filmInfo);

  this.filmsContainer.appendChild(filmContainer);
};

module.exports = FilmInfoView;
