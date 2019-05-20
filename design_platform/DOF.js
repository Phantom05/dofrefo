
exports._doQuery =  function(config, f) {
  let body = {};
    let query = connection.query(config.query, (err, result, fields) => {
      // console.log(`database : `, result)
      if (err) {
        console.log(err)
        throw err;
        return; 
      }
      
      body.isResult = true;
      body.data = result;
      return f(body)
    });
  console.log(query.sql)
}


exports._hello =  function(config, f) {
  return 'hello'
}