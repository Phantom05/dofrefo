


var Module = Module || {};
Module.namespace = namespace;

function namespace(ns_string) {
  var parts = ns_string.split('.'),
    parent = Module,i;

  if (parts[0] === 'Module') {
    parts = parts.slice(1);
  }
  for (i = 0; i < parts.length; i += 1) {
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
}


Module.doQuery = function doQuery(config, f) {
  let body = {};
  let query = connection.query(config.query, (err, result, fields) => {
    // console.log(`database : `, result)
    if (err) {
      console.log(err)
      throw err;
    }
    body.isResult = true;
    body.data = result;
    f(body)
  });
  console.log(query.sql)
};


Module.doAxios = (confg, f) => {
  console.log('axios 시도!')
  axios(confg).then(res => {
      console.log(`Axios : `, res.data)
      return f(res.data)
    })
    .catch(err => console.log(err))
}

Module.regLoginCheck = function(config) {

  if (config.type === 'username' && !(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(config.id))) {

    return '이메일 형식으로 입력해주세요.';

  } else if (config.type === "password") {

    if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(config.password))) {
      return `비밀번호는 숫자,문자,특수문자 조합으로 8~16자리를 사용해야 합니다.`
    }

    if (/(\w)\1\1\1/.test(config.password)) {
      return `비밀번호는 777같은 문자를 4번 이상 사용하실 수 없습니다.`;
    }

    if (config.password.search(config.id) > -1) {
      return `비밀번호에 아이디가 포함되었습니다.`;
    }
  } else if (config.type === '') {
    return false
  }
  return true;
}


Module.getCookie = function(name) {
  var start = document.cookie.indexOf(name + "=");
  var len = start + name.length + 1;
  if ((!start) && (name != document.cookie.substring(0, name.length))) {
    return null;
  }
  if (start == -1) return null;
  var end = document.cookie.indexOf(';', len);
  if (end == -1) end = document.cookie.length;
  return unescape(document.cookie.substring(len, end));
}

Module.setCookie = function(name, value, expires, path, domain, secure) {
  var today = new Date();
  today.setTime(today.getTime());
  if (expires) {
    expires = expires * 1000 * 60 * 60 * 24;
  }
  var expires_date = new Date(today.getTime() + (expires));
  document.cookie = name + '=' + escape(value) +
    ((expires) ? ';expires=' + expires_date.toGMTString() : '') + //expires.toGMTString() 
    ((path) ? ';path=' + path : '') +
    ((domain) ? ';domain=' + domain : '') +
    ((secure) ? ';secure' : '');
}

Module.deleteCookie = function(name, path, domain) {
  if (getCookie(name)) document.cookie = name + '=' +
    ((path) ? ';path=' + path : '') +
    ((domain) ? ';domain=' + domain : '') +
    ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}



Module.toggle = function(obj) {
  var el = document.getElementById(obj);
  if (el.style.display != 'none') {
    el.style.display = 'none';
  } else {
    el.style.display = '';
  }
}


Module.fadeIn = function(id) {
  var level = 0;
  var inTimer = null;
  inTimer = setInterval(function () {
    level = fadeInAction(id, level, inTimer);
  }, 50);
}

Module.fadeInAction = function(id, level, inTimer) {
  level = level + 0.1;
  changeOpacity(id, level);
  if (level > 1) {
    clearInterval(inTimer);
  }
  return level;
}

Module.fadeOut = function(id) {
  var level = 1;
  var outTimer = null;
  outTimer = setInterval(function () {
    level = fadeOutAction(id, level, outTimer);
  }, 50);
}

Module.fadeOutAction = function(id, level, outTimer) {
  level = level - 0.1;
  changeOpacity(id, level);
  if (level < 0) {
    clearInterval(outTimer);
  }
  return level;
}

Module.changeOpacity = function(id, level) {
  var obj = document.getElementById(id);
  obj.style.opacity = level;
  obj.style.MozOpacity = level;
  obj.style.KhtmlOpacity = level;
  obj.style.MsFilter = "'progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (level * 100) + ")'";
  obj.style.filter = "alpha(opacity=" + (level * 100) + ");";
}

Module.numWithCommas = function(x) {
  if (x == null || x == undefined) {
    return '0';
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
