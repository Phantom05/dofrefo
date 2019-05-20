
console.log('Index Module',Module);

var Module = Module || {};
console.log('Index Module',Module)

let main = Module.namespace('modules.main');

main = function (_Module, global) {
  console.log(_Module, global);
  let that = _Module.modules.main;
  console.log(that);
 
  function compaireFunc(key) {
    return function (a, b) {
      return a[key] - b[key]
    }
  }

  function counter() {

    return function (tar,kinds) {
      var maxNum = Math.abs(parseInt(tar.getAttribute(`data-count`)));
      var i = 0;
      var repeat = maxNum / 50;
      let inter = setInterval(function () {
        tar.innerHTML = `${_Module.numWithCommas(parseInt(i += repeat))}
        ${kinds}`;
        if (i > maxNum) {
          tar.innerHTML = `${_Module.numWithCommas(parseInt(maxNum))}
          ${kinds}`;
          clearInterval(inter)
          return;
        }
      }, 30);
    }
  }

  function doMainClientAndDesignnerCounter() {
    return function (...tar) {
      const randomStr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
      for (let i = 0; i < tar.length; i++) {
        setTimeout(() => {
          console.log('동작', tar[i].target)
          const inter = setInterval(() => {
            let ram1 = Math.floor(Math.random() * randomStr.length);
            let ram2 = Math.floor(Math.random() * randomStr.length)
            let ram3 = Math.floor(Math.random() * randomStr.length)
            tar[i].target.innerHTML = `${randomStr[ram1]}${randomStr[ram2]}${randomStr[ram3]}`
          }, 10);
          setTimeout(() => {
            clearInterval(inter);
            tar[i].target.innerHTML = numWithCommas(tar[i].value)
          }, 1000 * tar[i].timer);

        }, 1000 * tar[i].delay);

      }
    }
  }

  function makeSlide(){

    return function(...list){
      // console.log(list)

    }
  }

  function mainViewNews(){
    return function(...list){

    }
  }
  return {
    compaireFunc: compaireFunc(),
    doMainClientAndDesignnerCounter: doMainClientAndDesignnerCounter(),
    counter: counter(),
    makeSlide:makeSlide(),
    mainViewNews:mainViewNews(),
  }
}(Module, window)

// 데이터 통신

setTimeout(() => {
  //데이터 통신
  document.querySelectorAll('#bridgeServiceCounter .num').forEach(x => {
    main.counter(x,`<span class="main__count_txt">명</span>`)
  })

  document.querySelectorAll('#projectCounter .num').forEach(x => {
    main.counter(x,`<span class="main__count_txt">개</span>`)
  })
}, 1000);

document.querySelectorAll
main.makeSlide(
  {name:"img1",
   src:"https://cdn.pixabay.com/photo/2015/07/27/19/47/turtle-863336__340.jpg"
  },
  {name:"img2",
   src:"https://cdn.pixabay.com/photo/2015/10/01/21/39/background-image-967820_960_720.jpg"
  },
  {name:"img3",
   src:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
  }
)



// main.dof.doMainClientAndDesignnerCounter({
//   target: document.querySelector(`div[data-name="client_counter"]`),
//   delay: 1,
//   timer: 3,
//   value: 1845
// }, {
//   target: document.querySelector(`div[data-name="designer_counter"]`),
//   delay: 1,
//   timer: 3,
//   value: 2024
// })




$(document).ready(function () {
  $('#recommendSlide').slick({
    autoplay: true,
    infinite: true,
    arrows: true,
    speed: 500,
    dots: true,
    dotsClass: 'bn-controller',
    autoplaySpeed: 2000,
    // appendDots:$(this).siblings('dots-container'),
    prevArrow: `
    <span type='button' class='slick-prev slick-bt'>
        <i class="material-icons slick_bt_icon">keyboard_arrow_right</i>
      </span>
    `,
    nextArrow: `
    <span type='button' class='slick-next slick-bt'>
        <i class="material-icons slick_bt_icon">keyboard_arrow_left</i>
      </span>
    `,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    customPaging: function (slider, i) {
      var thumb = $(slider.$slides[i]).data();
      return '<span class="slide__pageing"></span>';
    },
  });
});