

document.addEventListener('DOMContentLoaded',function(e){

  document.querySelector('.mypage__menu_list_ul').addEventListener('click',function(e){
    let tar = e.target;
    if(tar.classList.contains('mypage__menu_list_an')){
      e.preventDefault();
      Array.from(document.querySelectorAll('.mypage__view_box *')).forEach(x=>{
         (tar.getAttribute('data-name') == x.getAttribute('data-name'))
         ?x.classList.add('on')
         :x.classList.remove('on')
      })
    }
  });


  document.getElementById('hausForm').addEventListener('submit',function(e){
    e.preventDefault();
    console.log('전송')
    console.log(
      this.shiphausno.value.trim().length
    )
  })





  $('#infoModal').on('show.bs.modal', function (event) {
    const inputList = [
      {label:"Haus no",name:"hausNo",required:true,type:"input"},
      {label:"Country",name:"fkCountryDetailPk",required:true,type:"datalist"},
      {label:"State",name:"state",required:false,type:"datalist"},
      {label:"Zipcode",name:"zipCode",required:true,type:"input"},
      {label:"Street(1)",name:"street1",required:true,type:"input"},
      {label:"Street(2)",name:"street2",required:false,type:"input"},
      {label:"City",name:"city",required:true,type:"input"},
      {label:"Email",name:"email",required:true,type:"input"},
      {label:"Tel",name:"tel",required:true,type:"input"},
      {label:"Mob",name:"mobile",required:false,type:"input"},
      {label:"Attn",name:"attn",required:true,type:"input"},
      {label:"Attn",name:"attn",required:true,type:"input"},
      {label:"Select Type",name:"statePk",required:true,type:"selecbox",
        list:[
          {name:"billing",value:0},
          {name:"shopping",value:1}
        ]}
    ];

    // 백엔드 데이터 통신 부분 
    const getCountryOptList = [
      {value:"Afganistan",["data-value"]:1},
      {value:"Albania",["data-value"]:2},
      {value:"Algeria",["data-value"]:3},
    ];

    const getStateOptList =[
      {value:"A_test_state",["data-value"]:1},
      {value:"B_test_state",["data-value"]:2},
      {value:"C_test_state",["data-value"]:3},
    ]
    // 백엔드 데이터 통신 부분
    
    const target = $(event.relatedTarget); 
    const recipient = target.data('whatever');
    const modal = $(this);
    
    modal.find('.modal-title').text(recipient)
    const bodyInfo = modal.find('.modal_form_body');
    bodyInfo.html('');
    for(let i = 0 ; i < inputList.length ; i ++){
      let label = document.createElement('label'), elInput,elDataList;

      // dropbox
      label.setAttribute(
        'class',
        'control-label mypage mypage__address_info_modal_label');
      label.innerHTML=inputList[i].label.trim();
      if (getUpperTrimVal(inputList[i].type) =='INPUT'){
        elInput = document.createElement('input');

          elInput.name = inputList[i].name;
        if(inputList[i].required) elInput.required = true;
      }
      if(getUpperTrimVal(inputList[i].type) =="DATALIST"){
        elInput = document.createElement('input');
        elDataList = document.createElement('datalist');
        if(inputList[i].required) elInput.required = true;

        if(getUpperTrimVal(inputList[i].label) =="COUNTRY"){
          let dataListSetCountryObj={
            elInput:elInput,
            elDataList:elDataList,
            elDataListId : "doModAddressCountryList",
            optListArr:getCountryOptList,
          }
          doMakeDataListSet(dataListSetCountryObj);
        }else if (getUpperTrimVal(inputList[i].label) =="STATE"){
          let dataListSetCountryObj={
            elInput:elInput,
            elDataList:elDataList,
            elDataListId : "doModAddressStateList",
            optListArr:getStateOptList,
          }
          doMakeDataListSet(dataListSetCountryObj);

        }
        elInput.classList.add('mypage__mod_address_info_datalist')
      }else if(getUpperTrimVal(inputList[i].label) == "SELECT TYPE"){
        console.log('in')
        elInput = document.createElement('select');
        elInput.name = inputList[i].name;

        for(let j = 0; j <2; j++){
          let opt = document.createElement('option');
          opt.value = inputList[i].list[j].value;
          opt.textContent = inputList[i].list[j].name
          console.log(opt)
          elInput.append(opt)
        }
      }
      elInput.setAttribute(
        'class',
        'form-control');
      bodyInfo.append(label,elInput,elDataList)
    }
  });

  function doMakeDataListSet(setObj){
    setObj.elInput.setAttribute('list',setObj.elDataListId)
    setObj.optListArr.forEach(opt=>{
      const elOpt = document.createElement('option');
      elOpt.value = opt.value;
      elOpt.setAttribute('data-value',opt['data-value'])
      setObj.elDataList.append(elOpt)
    })
    setObj.elDataList.id = setObj.elDataListId;
    return;
  }

  function getUpperTrimVal(val){
    return val.toUpperCase().trim()
  }





  // document.getElementById('addressInfoModalForm').addEventListener('submit',function(e){
  //   let count = 0;
  //   Array.prototype.forEach.call(document.querySelectorAll('#addressInfoModalForm input'), x =>{
  //     if(!x.value.trim().length) count++
  //   })

  //   if(count){
  //     e.preventDefault();
  //     alert('빈칸을 모두 입력해주세요.');
  //     return
  //   }
  // })
});
