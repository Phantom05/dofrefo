// Common 에는 namespace 함수를 적용 시켜 줘야함.
// 한번에 처리할 수 있는 방법 있는지 확인.

var Module = Module || {}; 
Module.namespace = Module.namespace || namespace;

var header = Module.namespace('Module.modules.header'); 
header.dof = (function(){
  
  return {

  }
})

// console.log(Module,'header')