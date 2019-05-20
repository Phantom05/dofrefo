console.log('mypage hello world')

var Module = Module || {};

let mypage = Module.namespace('Module.modules.mypage');
Module.modules.mypage = function (_Module, global) {

  function edirProfileForm(key) {
    edirProfileForm.state = true;
    edirProfileForm.cancleBtnState = 'off'
    let cancleBtn;

    document.getElementById('profileEditForm').addEventListener('submit', function (e) {
      e.preventDefault();

      if (edirProfileForm.state) {
        edirProfileForm.state = false;

        this.editBtn.textContent = 'OK';

        if(edirProfileForm.cancleBtnState =='off'){
          edirProfileForm.cancleBtnState ='on'
          cancleBtn = document.createElement('button');
          cancleBtn.type = 'button';
          cancleBtn.name = ' cancleBtn';
          cancleBtn.setAttribute('class', 'profile__edit_btn cancle');
          cancleBtn.textContent = 'Cancle';
          // cancle 잡아야함 스코프 생각..s
          function tmpFunc(){
            console.log(this)
              this.remove();
              document.getElementById('profileEditForm').editBtn.textContent = 'Edit';
              edirProfileForm.state = true;
              edirProfileForm.cancleBtnState ='off'
              cancleBtn.removeEventListener('click',tmpFunc)
          }
          cancleBtn.addEventListener('click',tmpFunc)
          

          this.append(cancleBtn)
        }

        


      } else {
        

        if(edirProfileForm.cancleBtnState == 'on'){
          edirProfileForm.cancleBtnState ='off';
          console.log(cancleBtn,'f')
        }


        console.log('전송')
        let editAxiosJson = {
          method: 'post',
          url: '/users/mypage/profile',
          data: {
            title: 'hellos',
          }
        }
        doAxios(editAxiosJson, function (data) {
          console.log(data)
          if (data.isResult) {
            console.log('변경 성공');


          } else {
            alert('data를 확인 해주세요.')
          }
        })
      }


      console.log('hello')
    });

    return function () {

    }
  }


  return {
    edirProfileForm: edirProfileForm(),
  }
}(Module, this)
console.log(Module, 'mypage');