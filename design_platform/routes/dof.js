exports.hello = (v) => {
  return require('node-fetch')
}

exports.numWithCommas =(x) => {
  if(x==null || x== undefined){
    return '0';
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 날짜, 요일 포함된 시간 함수 // Fri, 2019-05-10 / 18:07:52
exports.timeState =(t) =>{
  let weekName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // let newTime = weekName[t.getDay()]+', '+t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+' / '+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();

  let month = ((t.getMonth() + 1) < 10) ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1);
  let date = (t.getDate() < 10) ? '0' + t.getDate() : t.getDate();
  let hours = (t.getHours() < 10) ? '0' + t.getHours() : t.getHours();
  let min = (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes();
  let sec = (t.getSeconds() < 10) ? '0' + t.getSeconds() : t.getSeconds();

  let newTime = weekName[t.getDay()] + ', ' + t.getFullYear() + '-' + month + '-' + date + ' / ' + hours + ':' + min + ':' + sec
  return newTime;
}

exports.nodeEnvMode =() => {
  let apiAddress = "";
  console.log('call nodeENv', process.env.NODE_ENV)
  if (process.env.NODE_ENV == 'prod') {
    console.log("Production Mode API");
    apiAddress = 'http://13.115.241.26:8080';

  } else if (process.env.NODE_ENV == 'dev') {
    console.log("Development Mode API");
    apiAddress = 'http://13.231.219.247:8080';
  }
  return apiAddress;
}

// 년,월,일 포함된 시간 함수 2018-05-10
exports.getShortTime =(t)=> {
  let month = ((t.getMonth() + 1) < 10) ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1);
  let date = (t.getDate() < 10) ? '0' + t.getDate() : t.getDate();
  let newTime = t.getFullYear() + '-' + month + '-' + date;
  return newTime;
}


exports.doNullCheck =(val) => {
  //true 면 값이 있음, false 면 값이 없음
  return (val != "undefined" && (val != null && val.length > 0))?true:false;
}

// 타임스탬프를 new Date형식으로 변한.
exports.timeStampToNewDate = (timestamp) =>{
  let tsp = timestamp;
  let date = new Date();
  date.setTime(tsp);
  return date
}

