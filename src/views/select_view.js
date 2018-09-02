const PubSub = require('../helpers/pub_sub');

const DirectorSelect = function(element, selectedDirector){
  this.directors = [];
  this.element = element;
  this.selectedDirector = selectedDirector;
};

DirectorSelect.prototype.bindEvents = function(){
  PubSub.subscribe('Films:director-data-ready', (event) => {
    this.directors = event.detail;
    this.render();
    // console.log(this.directors); // -> is unique list of directors
  })
};

DirectorSelect.prototype.directorSelected = function(){
  PubSub.publish('DirectorSelect:director-selected', this.selectedDirector);
  // console.log(this.selectedDirector); // --> gives off selected director
};

//this should render the list of correct films matching with director choice
DirectorSelect.prototype.render = function(){

  this.directors.forEach((director) => {
    const directorOption = document.createElement('option');
    directorOption.innerHTML = director;
    this.element.appendChild(directorOption);
    // console.log(directorOption); // --> showing all seperate directors, but not unique
  });

  this.element.addEventListener('change', (event) => {
    const selectedDirector = event.target.value;
    this.selectedDirector = selectedDirector;
    this.directorSelected();
  })

  this.directorSelected();

};

module.exports = DirectorSelect;
