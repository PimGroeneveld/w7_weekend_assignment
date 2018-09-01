const PubSub = require('../helpers/pub_sub.js');

const FilmInfoView = function (container, film) {
  this.filmsContainer = container;
  this.film = film;
};

FilmInfoView.prototype.render = function () {
  const filmContainer = document.createElement('div');
  filmContainer.classList.add('film');

  const title = this.createFilmHeading()
  filmContainer.appendChild(title);

  const filmInfo = this.createFilmInfo();
  filmContainer.appendChild(filmInfo);

  this.filmsContainer.appendChild(filmContainer);
};

FilmInfoView.prototype.createFilmHeading = function () {
  const title = document.createElement('h2');
  title.classList.add('film-title');
  title.textContent = this.film.title;
  return title;
};

FilmInfoView.prototype.createFilmInfo = function () {
  const filmInfo = document.createElement('ul');
  filmInfo.classList.add('film-info');
  this.populateList(filmInfo);
  return filmInfo;
};

FilmInfoView.prototype.populateList = function (list) {
    const filmDescription = document.createElement('li');
    filmDescription.textContent = `Description: ${this.film.description}`;
    list.appendChild(filmDescription);
    const filmDirector = document.createElement('li');
    filmDirector.textContent = `Director: ${this.film.director}`;
    list.appendChild(filmDirector);
    const filmYear = document.createElement('li');
    filmYear.textContent = `Release year: ${this.film.release_date}`;
    list.appendChild(filmYear);
    const filmScore = document.createElement('li');
    filmScore.textContent = `Rotten Tomatoes score: ${this.film.rt_score}`;
    list.appendChild(filmScore);
  };

module.exports = FilmInfoView;
