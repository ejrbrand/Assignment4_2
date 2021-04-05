var express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })  
app.use(bodyParser.json())

var id = '';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dkultima101",
  database: "test"
});
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});
/*
connection.query('SELECT * FROM patient_info', function(err, rows, fields) 
{
  if (err) throw err;

  console.log(rows[0]);
});
*/


app.get('/SPA-1.html', (req, res) => {
  res.sendFile('./pages/SPA-1.html', { root: __dirname });
});

app.get('/healthvitals.html', (req, res) => {
  res.sendFile('./pages/healthvitals.html', { root: __dirname });
});

app.get('/reports.html', (req, res) => {
  res.sendFile('./pages/reports.html', { root: __dirname });
});

app.get('/', function (req, res) {
  console.log(req.body);
  connection.query("SELECT * FROM patient_info", req.body, function (err, result) {
    if (err) throw err;
    res.send("Created " + JSON.stringify(result));
  });
  //res.send("Received"+req.body)
});

app.post('/', function (req, res) {
  //console.log(req.body.gender)
  var name = req.body.firstName + " " + req.body.lastName;
  var gender = req.body.gender;
  var age = req.body.age;
  var notes = req.body.notes;
  var photo = "test";

  data = req.body;
  console.log(data.firstName);
  console.log(data.gender);
  //res.send();
  connection.query("INSERT INTO patient_info(patient_name, patient_gender, patient_age, patient_otherDetails, patient_photo)\
  VALUES (?, ?, ?, ?, ?)", [name, gender, age, notes, photo], function (err, result) {
    if (err) throw err;
    res.send("Created " + JSON.stringify(result));
  });

  //connection.query()

  //res.send("Received"+req.body)
  
});

app.post('/', function (req, res) {
  //console.log(req.body.gender)
  var name = req.body.firstName + " " + req.body.lastName;
  var gender = req.body.gender;
  var age = req.body.age;
  var notes = req.body.notes;
  var photo = "test";

  data = req.body;
  //console.log(data.firstName);
  //console.log(data.gender);
  //res.send();
  connection.query("INSERT INTO patient_info(patient_name, patient_gender, patient_age, patient_otherDetails, patient_photo)\
  VALUES (?, ?, ?, ?, ?)", [name, gender, age, notes, photo], function (err, result) {
    if (err) throw err;
    res.send("Created " + JSON.stringify(result));
  });

  connection.query('SELECT id FROM patient_info WHERE patient_name = ' + quotes(name) + ' AND patient_gender = ' + quotes(gender) + ' AND patient_age = ' + quotes(age) + ' AND patient_otherDetails = ' + quotes(notes) + ' AND patient_photo = ' + quotes(photo),
    (err, rows)=> {
    if (err) throw err;
    result.json(rows[0].id);
    id = rows[0].id;
    console.log("test" + rows[0].id);
    console.log("test" + id);


})

  //res.send("Received"+req.body)
});

function quotes(string) {
  return '"' + string +  '"';
}

app.post('/vitals', function (req, res) {
  //console.log(req.body.gender)
  var height = req.body.height
  var weight = req.body.weight;
  var bodyTemp = req.body.bodyTemp;
  var pulseRate = req.body.pulseRate;
  var BP = req.body.BP;
  var medications = req.body.medications;
  var notes = req.body.notes;

  data = req.body;
  console.log(data.height);
  console.log(data.weight);
  console.log(id);

  //res.send();

  connection.query('UPDATE patient_info SET patient_height=?, patient_weight=?, patient_bodyTemp=?, patient_pulse=?, patient_BP=?, patient_medications=?,\
  patient_notes=? WHERE id = ?', [height, weight, bodyTemp, pulseRate, BP, medications, notes, id]);

  //connection.query()

  //res.send("Received"+req.body)
  
});


app.listen(port, () => console.log(`listening on port ${port}!`));