const PubSub = require("../helpers/pub_sub.js");
const FilmInfoView = require("./film_info_view.js");

const FilmListView = function(container){
  this.container = container;
};

FilmListView.prototype.bindEvents = function(){
  PubSub.subscribe("Films:data-ready", (event) => {
    this.films = event.detail;
    this.render();
    // console.log(event.detail); // -> showing all films
  });
};

FilmListView.prototype.render = function(){
  this.films.forEach((film) => {
    const filmInfoView = new FilmInfoView(this.container, film)
    filmInfoView.render();
    // console.log(film);  // --> films split into own objects
  })
}

module.exports = FilmListView;
