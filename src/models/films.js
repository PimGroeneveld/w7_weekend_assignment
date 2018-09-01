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
    this.filmList = data;
    this.getDirectors(this.filmList);
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

  const filmsByDirector = this.filmList.filter((film) => {

    if (this.director === 'All'){
      return film.director
    } else {
      return film.director === this.director;
    }

  })
  PubSub.publish('Films:data-ready', filmsByDirector);
};

Films.prototype.getDirectors = function(filmList){

  const directorList = this.filmList.map(film => film.director)
  .filter((director, index, directors) => {
    return directors.indexOf(director) === index
  });

  PubSub.publish('Films:director-data-ready', directorList)
  // console.log(directorList); // --> correct list of directors
};

module.exports = Films;
