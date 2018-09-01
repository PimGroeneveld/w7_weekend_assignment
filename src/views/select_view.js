const PubSub = require('../helpers/pub_sub');

const DirectorSelect = function(selectElement, selectedDirector){
  this.selectElement = element;
  this.directors = []
  this.selectedDirector = selectedDirector;
};

DirectorSelect.prototype.bindEvents = function(){
  PubSub.subscribe('Films:director-data-ready', (event) => {
    this.directors = event.detail;
    this.render();
  })
};

DirectorSelect.prototype.directorSelected = function(){
  PubSub.publish('DirectorSelect:director-selected', this.selectedDirector);
};

DirectorSelect.prototype.render = function(){

  this.directors.forEach((director) => {
    const directorOption = document.createElement('option');
    directorOption.innerHTML = director;
    this.element.appendChild(directorOption);
  });

  this.element.addEventListener('change', (event) => {
    const selectedDirector = event.target.value;
    this.selectedDirector = selectedDirector;
    this.directorSelected();
  })

  this.directorSelected();

};

module.exports = DirectorSelect;
