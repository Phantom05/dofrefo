var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var dof = require('./dof');
/* GET home page. */
router.get('/', function(req, res, next) {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))

  console.log(
    dof.timeStampToNewDate(1495432101004),'변환!'
  )

  res.render('Index', { title: 'Express' });
});


router.route('/about')
.get(function(req, res, next) {



  res.render('Pages/About/about');
});

module.exports = router;
