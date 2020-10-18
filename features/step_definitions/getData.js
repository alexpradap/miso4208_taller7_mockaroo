const https = require('https')
var dataObj;

module.exports = {
  loadData: function () {
    //let textResponse = fromLocal();
    let textResponse = fromApi();
    var rows = textResponse.split(/\r\n|\n/);
    var headers = rows[0].split(',');
    dataObj = JSON.parse('{"values": []}');

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
  },

  getValues: function () {
    return dataObj.values[getRandomInt(0, 4)];
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

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
grosoni0,pdudlestone0@whitehouse.gov,KUvYlHrM+415
mdougill1,kcarnihan1@symantec.com,AJafdUpl+355
crainsdon2,fboor2@google.com.br,ZewdBzIc+309
mscouse3,zambrodi3@fastcompany.com,BkfAWcEC+236
spetyt4,aleverington4@cocolog-nifty.com,IkVtdZND+595
dpegden5,bpetr5@ask.com,GALTqFbg+855
marling6,omallison6@nymag.com,YpcGXKkx+866
bdisman7,genglish7@infoseek.co.jp,ZapTOArs+697
relster8,botridge8@drupal.org,OtTQaJcC+106`;
  return csv;
}