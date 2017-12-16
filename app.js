// accessing twilio api
const accountSid = 'ACc28c7161489a16390bbcf886a479793c';
const authToken = '48f150182b6a097b38e22fc34ed55ca4';
const client = require('twilio')(accountSid, authToken);

const http = require('http');

// get bitcoin price via coindesk api
// request api
http.get({
  host: 'api.coindesk.com',
  path: '/v1/bpi/currentprice.json'
}, (response) => {
  // get data
  let body = '';
  response.on('data', function(d) {
    body += d;
  });
  response.on('end', function() {
    // manipulate received data
    let parsed = JSON.parse(body);
    // if parseint(parsed.bpi.USD) > initial price + initialprice * x% ???
    // text btc price
    textBtcPrice(parsed.bpi.USD.rate);
  });
})

// sending text message
function textBtcPrice(price) {
  client.messages.create({
    to: '+18609290777',
    from: '+14133726049',
    body: 'Bitcoin is at $' + price
  }, function(err, message) {
    if(err) {
      console.error(err.message);
    }
  });
}
