'use strict';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

document.addEventListener('DOMContentLoaded', function (e) {
  console.log("init");
  document.querySelector('.mypage__menu_list_ul').addEventListener('click', function (e) {
    var tar = e.target;
    if (tar.classList.contains('mypage__menu_list_an')) {
      e.preventDefault();
      Array.from(document.querySelectorAll('.mypage__view_box *')).forEach(function (x) {
        tar.getAttribute('data-name') == x.getAttribute('data-name') ? x.classList.add('on') : x.classList.remove('on');
      });
    }
  });

  document.getElementById('hausForm').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('전송');
    console.log(this.shiphausno.value.trim().length);
  });

  var dataListSetObj = void 0;

  $('#infoModal').on('show.bs.modal', function (event) {
    var inputList = [{
      label: "Haus no",
      name: "hausNo",
      required: true,
      type: "input"
    }, {
      label: "Country",
      name: "fkCountryDetailPk",
      required: true,
      type: "datalist"
    }, {
      label: "State",
      name: "state",
      required: false,
      type: "datalist"
    }, {
      label: "Zipcode",
      name: "zipCode",
      required: true,
      type: "input"
    }, {
      label: "Street(1)",
      name: "street1",
      required: true,
      type: "input"
    }, {
      label: "Street(2)",
      name: "street2",
      required: false,
      type: "input"
    }, {
      label: "City",
      name: "city",
      required: true,
      type: "input"
    }, {
      label: "Email",
      name: "email",
      required: true,
      type: "input"
    }, {
      label: "Tel",
      name: "tel",
      required: true,
      type: "input"
    }, {
      label: "Mob",
      name: "mobile",
      required: false,
      type: "input"
    }, {
      label: "Attn",
      name: "attn",
      required: true,
      type: "input"
    }, {
      label: "Select Type",
      name: "statePk",
      required: true,
      type: "selecbox",
      list: [{
        name: "billing",
        value: 0
      }, {
        name: "ship",
        value: 1
      }]
    }];

    // 백엔드 데이터 통신 부분 
    var getCountryOptList = [_defineProperty({
      value: "Afganistan"
    }, "data-value", 1), _defineProperty({
      value: "Albania"
    }, "data-value", 2), _defineProperty({
      value: "Algeria"
    }, "data-value", 3), _defineProperty({
      value: "test1"
    }, "data-value", 4), _defineProperty({
      value: "test2"
    }, "data-value", 5)];

    var getStateOptList = [_defineProperty({
      value: "A_test_state"
    }, "data-value", 1), _defineProperty({
      value: "B_test_state"
    }, "data-value", 2), _defineProperty({
      value: "C_test_state"
    }, "data-value", 3)];

    var getStateOptList1 = [_defineProperty({
      value: "F_test_state"
    }, "data-value", 1), _defineProperty({
      value: "F_test_state"
    }, "data-value", 2), _defineProperty({
      value: "F_test_state"
    }, "data-value", 3)];
    // 백엔드 데이터 통신 부분

    var target = $(event.relatedTarget);
    var recipient = target.data('whatever');
    var modal = $(this);

    modal.find('.modal-title').text(recipient);
    var bodyInfo = modal.find('.modal_form_body');
    bodyInfo.html('');
    for (var i = 0; i < inputList.length; i++) {
      var label = document.createElement('label'),
        elInput,
        elDataList;

      label.setAttribute('class', 'control-label mypage mypage__address_info_modal_label');
      label.innerHTML = inputList[i].label.trim();
      if (getUpperTrimVal(inputList[i].type) == 'INPUT') {
        elInput = document.createElement('input');
        elInput.setAttribute('placeholder', inputList[i].label);
        elInput.name = inputList[i].name;
        if (inputList[i].required) elInput.required = true;
      }
      if (getUpperTrimVal(inputList[i].type) == "DATALIST") {
        elInput = document.createElement('input');
        elDataList = document.createElement('datalist');
        if (inputList[i].required) elInput.required = true;

        if (getUpperTrimVal(inputList[i].label) == "COUNTRY") {
          dataListSetObj = {
            elInput: elInput,
            elInputId: "doModAddressCountryCon",
            elDataList: elDataList,
            elDataListId: "doModAddressCountryList",
            optListArr: getCountryOptList
          };
          doMakeDataListSet(dataListSetObj);
        } else if (getUpperTrimVal(inputList[i].label) == "STATE") {
          dataListSetObj = {
            elInput: elInput,
            elInputId: "doModAddressStateCon",
            elDataList: elDataList,
            elDataListId: "doModAddressStateList",
            optListArr: getStateOptList
          };
          doMakeDataListSet(dataListSetObj);
        }
        elInput.setAttribute('placeholder', 'Select');
        elInput.classList.add('mypage__mod_address_info_datalist');
      } else if (getUpperTrimVal(inputList[i].label) == "SELECT TYPE") {
        elInput = document.createElement('select');
        elInput.name = inputList[i].name;

        for (var j = 0; j < inputList[i].list.length; j++) {
          var opt = document.createElement('option');
          opt.value = inputList[i].list[j].value;
          opt.textContent = inputList[i].list[j].name;
          elInput.append(opt);
        }
      }
      elInput.setAttribute('class', 'form-control');
      elInput.setAttribute('autocomplete', 'off');
      bodyInfo.append(label, elInput, elDataList);
    }

    console.log(modal.find('form'));
  });

  function doMakeDataListSet(setObj) {

    setObj.elInput.id = setObj.elInputId;
    setObj.elInput.setAttribute('list', setObj.elDataListId);
    setObj.optListArr.forEach(function (opt) {
      var elOpt = document.createElement('option');
      elOpt.value = opt.value;
      elOpt.setAttribute('data-value', opt['data-value']);
      setObj.elDataList.append(elOpt);
    });
    setObj.elDataList.id = setObj.elDataListId;
    return;
  }

  function getUpperTrimVal(val) {
    return val.toUpperCase().trim();
  }
});
