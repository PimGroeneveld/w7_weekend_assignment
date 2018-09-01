const PubSub = require('../helpers/pub_sub');

const DirectorSelect = function(element, selectedDirector){
  this.element = element;
  this.directors = []
  this.selectedDirector = selectedDirector;
};

RegionSelect.prototype.bindEvents = function(){
  PubSub.subscribe('Munros:region-data-ready', (event) => {
    this.regions = event.detail;
    this.render();
  })
};

RegionSelect.prototype.regionSelected = function(){
  PubSub.publish('RegionSelect:region-selected', this.selectedRegion);
};

RegionSelect.prototype.render = function(){

  this.regions.forEach((region) => {
    const regionOption = document.createElement('option');
    regionOption.innerHTML = region;
    this.element.appendChild(regionOption);
  });

  this.element.addEventListener('change', (event) => {
    const selectedRegion = event.target.value;
    this.selectedRegion = selectedRegion;
    this.regionSelected();
  })

  this.regionSelected();

};


module.exports = RegionSelect;
