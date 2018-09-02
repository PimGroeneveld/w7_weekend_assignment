const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const Films = function (director) {
  this.films = [];
  this.director = director;
};

Films.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/films');
  requestHelper.get((data) => {
    PubSub.publish('Films:data-ready', data);
    // console.log(data); //-> is full list of films
  })
  requestHelper.get((data) => {
    this.films = data;
    this.getDirectors(this.films);
  })
};

Films.prototype.bindEvents = function(){

  this.getData();
  PubSub.subscribe('DirectorSelect:director-selected', (event) => {
    this.director = event.detail;
    this.getByDirector();
  })

};

Films.prototype.getByDirector = function(){

  const filmsByDirector = this.films.filter((film) => {

    if (this.director === 'All'){
      return film.director
    } else {
      return film.director === this.director;
    }

  })
  PubSub.publish('Films:data-ready', filmsByDirector);
  console.log(filmsByDirector); // gives correct list of director's films after click
};

Films.prototype.getDirectors = function(filmList){

  const directorList = this.films.map(film => film.director)
  .filter((director, index, directors) => {
    return directors.indexOf(director) === index
  });

  PubSub.publish('Films:director-data-ready', directorList)
  // console.log(directorList); // --> correct list of directors
};

module.exports = Films;
