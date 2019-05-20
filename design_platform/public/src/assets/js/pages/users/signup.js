
var Module = Module || {}; 
Module.namespace = Module.namespace || namespace;

var signup = Module.namespace('Module.modules.signup'); 
signup.dof = (function(_Module,global){
  function doSignup(){

    document.querySelector('form[data-name="signupForm"]').addEventListener('submit', function (e) {
      e.preventDefault();
    
      let regUsernameCheck = {
        id:this.username.value,
        type:`username`
      }
      let regPasswordCheck = {
        id:this.username.value,
        password:this.password.value,
        type:`password`
      }
      let usernameRes = regLoginCheck(regUsernameCheck);
      let passwordRes = regLoginCheck(regPasswordCheck);
    
      if (usernameRes == true && passwordRes == true) {
    
        let axiosConf = {
          method: 'POST',
          url: '/users/signup',
          data: {
            username: this.username.value.trim(),
            password:this.password.value.trim()
          }
        }
    
        _Module.doAxios(axiosConf, function (val) {
          if (val.isResult == true) {
            console.log('통신 성공', val);
            alert(val.message);
            window.location.href = `/users/login`
          } else {
            alert(val.message);
            console.log(
              sdocument.querySelector('form[data-name="signupForm"]')
            )
          }
    
        })
      } else {
        if(usernameRes == true){
          alert(passwordRes)
        }else{
          alert(usernameRes)
        }
      }
    })
    
  }
  return {
    doSignup:doSignup()
  }
})(Module,window)


