var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.send([
    {
      name: '小麦',
      age: 24,
      id: '111'
    },
    {
      name: '小兔',
      age: 24,
      id: '121'
    }
  ]);
});
app.get('/user/:id', function (req, res) {
  console.log('请求进来了--', req.params, req.path);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.send({
    name: `随机名字${req.params.id}`,
    age: 24,
    id: req.params.id,
    introduction: '假设是一个很长的自我介绍'
  });
});
var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
