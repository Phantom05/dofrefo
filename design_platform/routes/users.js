var express = require('express');
var router = express.Router();
var pagePath = 'Pages/Users';
var dof = require('./dof');
var path = require('path');
/* GET users listing. */
let dummy = {};

// user main
router.route('/')
.get(function(req, res, next) {
  console.log('login user / ')
  res.render(`${pagePath}/user`)
});

// login
router.route('/login')
.get(function(req, res, next) {
  console.log('login router get')
  res.render(`${pagePath}/Auth/login`)
})
.post(function(req, res, next) {
  console.log('login router post')
  let userCheck;
  userCheck = true;
  if(userCheck){
    req.body.isResult = true;
    res.json(req.body);
  }else{
    console.log()
    res.json(req.body);
  }
});

// mypage
router.route('/mypage')
.get(function(req, res, next) {
  console.log('mypage router get');
  req.session.ouath = true;
  if(req.session.ouath){
    res.render(`${pagePath}/Mypage/mypage`,{pageName:'applied'});
  }else{
    res.render(`error`,{message:`세션이 만료 되었습니다.`});
  }
})

// mypage profile
router.route('/mypage/profile')
.post(function(req, res, next) {
  console.log('mypage profile router post');
  console.log(req.body)
  req.body.isResult = true;
  res.json(req.body)
})

// signup
router.route('/signup')
.get(function(req, res, next) {
  console.log('signup router get')
  res.render(`${pagePath}/Auth/signup`)
})
.post(function(req, res, next) {
  console.log('signup router post');
  console.log('in')
  req.body.isResult = true;
  if(req.body.isResult){
    req.body.message = '회원가입을 축하합니다.';
    res.json(req.body)
  }else{
    req.body.message = '회원가입에 실패하였습니다.';
    res.json(req.body)
  }
});



module.exports = router;
