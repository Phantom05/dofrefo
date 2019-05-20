


var Module = Module || {}; 
Module.namespace = Module.namespace || namespace;

var login = Module.namespace('Module.modules.login'); 
login.dof = (function(_Module,global){
  
  function doLogin(){
    document.querySelector('form[data-name="loginForm"]').addEventListener('submit', function (e) {
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
      let passwordRes = _Module.regLoginCheck(regPasswordCheck);
      let usernameRes = _Module.regLoginCheck(regUsernameCheck);
    
      if (usernameRes == true && passwordRes == true) {
        let axiosConf = {
          method: 'POST',
          url: '/users/login',
          data: {
            username: this.username.value.trim(),
            password:this.password.value.trim()
          }
        }
    
        _Module.doAxios(axiosConf, function (val) {
          console.log('통신 성공', val);
    
          if (val.isResult == true) {
            console.log('in')
            console.log('통신 성공', val);
            window.location.href='/users/mypage'
    
          } else {
    
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
    doLogin:doLogin()
  }
})(Module,window)



