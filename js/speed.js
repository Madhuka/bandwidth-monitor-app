//3rd party image file
var imageURL = "https://jonbainestours.files.wordpress.com/2015/03/02_sirigiya_sri-lanka.jpg"; 
var downloadSize = 5634392; //bytes

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    
    var oProgress = document.getElementById("status");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

//Initiating speed detection function
function InitiateSpeedDetection() {
    ShowProgressMessage("Loading the file, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

//binding a event listern for page
if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

//Measure time for network connection speed and calculation.
function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageURL + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(5);
        var speedbps = (downloadSize / duration).toFixed(5);
        var speedKbps = (speedBps / 1024).toFixed(5);
        var speedMbps = (speedKbps / 1024).toFixed(5);
        ShowProgressMessage([
            "Your connection speed is:", 
            speedBps + " bps", 
            speedbps+ " Bps", 
            speedKbps + " kbps", 
            speedMbps + " Mbps"
        ]);
    }
    getip();
    DBtest();
}

function getip(){
  console.log(myip);
}

function DBtest(){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'speed_check'
});

connection.connect();

connection.query('SELECT * from test', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();
}