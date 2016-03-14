var mysql = require('mysql');

//change for your mysql config
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'speed_check'
});

connection.connect();

connection.query('SELECT * from records', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();