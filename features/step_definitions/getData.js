const https = require('https')

module.exports = {
  getData: function () {
    let textResponse = fromLocal();
    //let textResponse = fromApi();
    var rows = textResponse.split(/\r\n|\n/);
    var headers = rows[0].split(',');
    var dataObj = JSON.parse('{"values": []}');

    for (let i = 1; i < rows.length; i++) {
      let data = rows[i].split(',');
      if (data.length == headers.length) {
        let value = "{";
        for (let j = 0; j < headers.length; j++) {
          value = value + '"' + headers[j] + '": "' + data[j] + '"';
          if (j < headers.length - 1) {
            value = value + ", ";
          }
          else {
            value = value  + '}';
          }
        }
        dataObj.values.push(JSON.parse(value));
      }
    }
    return dataObj;
  }
}
  
function fromApi() {
  var options={
    host:"my.api.mockaroo.com",
    path:"/test_habitica.json",
    headers: {
      'X-API-Key': 'cf962fc0',
      'Content-Type': 'application/json'
    }
  };

  let csv = '';
  https.get(options,function(res,error){
    var body = "";
    res.on('data', function(data) {
      body += data;
    });
    
    res.on('end', function() {
      csv = body;
    });
    
    res.on('error', function(e) {
      console.log(e.message);
    });
  });
  return csv;
}

function fromLocal() {
  csv = `user_name,email,password
lromei0,redmonston0@wsj.com,xgNbB2m5Z
adranfield1,schatell1@slate.com,6xLjb8a
jtremontana2,kperegrine2@msn.com,H2RvOJ
csydry3,gpalfreeman3@hud.gov,2Y60hP6OeLC
sgoodding4,kmchirrie4@economist.com,DyiZwmbrwjN1
acuddehy5,plande5@purevolume.com,4NHO0mM2GEp
lblais6,lmoores6@hc360.com,c1agQiYEFrl
abrinded7,ohallt7@hc360.com,upOtaFQ
kbresner8,slampens8@prlog.org,vqG1Cl7Cr2XX
dtrout9,hswinglehurst9@theatlantic.com,uhgo9ZQ9X4iU`;
  return csv;
}