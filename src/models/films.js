const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const Films = function () {
  this.films = [];
  this.director = director;
};

Films.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/films');
  requestHelper.get((data) => {
    PubSub.publish('Films:data-ready', data);
    // console.log(data); //-> is full list of films
  })
};

module.exports = Films;



const PubSub = require('../helpers/pub_sub');
const Request = require('../helpers/request_helper');

const Munros = function(url, region){

  this.url = url;
  this.munroList = [];
  this.region = region;

};

Munros.prototype.bindEvents = function(){

  this.getData();
  PubSub.subscribe('RegionSelect:region-selected', (event) => {
    this.region = event.detail;
    this.getByRegion();
  })

};

Munros.prototype.getData = function(){

  const request = new Request(this.url);
  request.get((data) => {
    this.munroList = data;
    this.getRegions(this.munroList);
  });

};

Munros.prototype.getByRegion = function(){

  const munrosInRegion = this.munroList.filter((munro) => {

    if (this.region === 'All'){
      return munro.region
    } else {
      return munro.region === this.region;
    }

  })
  PubSub.publish('Munros:data-ready', munrosInRegion);

}


Munros.prototype.getRegions = function(munroList){

  const regionList = this.munroList.map(munro => munro.region)
  .filter((region, index, regions) => {
    return regions.indexOf(region) === index
  });

  PubSub.publish('Munros:region-data-ready', regionList)
};

module.exports = Munros;
