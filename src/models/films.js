const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const Films = function () {
  this.films = [];
};

Films.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/films');
  requestHelper.get((data) => {
    PubSub.publish('Films:data-ready', data);
    // console.log(data); //-> is full list of films
  })
};

module.exports = Films;
