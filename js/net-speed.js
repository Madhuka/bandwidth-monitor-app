function drawingchart() {
  $('#container').highcharts({

      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      },

      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#FFF'],
              [1, '#333']
            ]
          },
          borderWidth: 0,
          outerRadius: '109%'
        }, {
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#333'],
              [1, '#FFF']
            ]
          },
          borderWidth: 1,
          outerRadius: '107%'
        }, {
          // default background
        }, {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }]
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: 'Mbps'
        },
        plotBands: [{
          from: 0,
          to: 60,
          color: '#55BF3B' // green
        }, {
          from: 60,
          to: 80,
          color: '#DDDF0D' // yellow
        }, {
          from: 80,
          to: 100,
          color: '#DF5353' // red
        }]
      },

      series: [{
        name: 'NetworkSpeed',
        data: [0],
        dataLabels: {
          formatter: function() {
            var speedmbps = this.y;

            return '<span style="color:#339">' + speedmbps + ' Mbps</span><br/>';
          }
        },
        tooltip: {
          valueSuffix: ' Mbps'
        }
      }]

    },


    // Add speedometer to life
    function(chart) {
      if (!chart.renderer.forExport) {}
    });
}

$(function() {

  //loading dashboard in initial
  $('#pagefeature').load('myspeed.html', function(responseTxt, statusTxt, xhr) {
    if (statusTxt == "success")
      drawingchart();


  });


});

function getDetails() {
  var isp = null;
  $.getJSON("http://ip-api.com/json",
    function(data) {
      isp = data.isp;
      //console.log(isp);
      $("#msgbar").append('<br>Internet service provider: ' + isp);

    });

}

function getip() {
  return (myip);
}

function getServerURL(location) {
  var endpoint = 'http://95.211.150.11/TRCDF/';
  if (location == 'USA'){
  endpoint = 'http://207.244.91.98/TRCDF/';
  }
  return endpoint;
  
  
}

function testURL() {
  //console.log("----------Test URL ----------");
  var xhr = new XMLHttpRequest();
  //xhr.setRequestHeader('Access-Control-Allow-Origin', 'origin');
  xhr.addEventListener("progress", updateProgress);
  xhr.addEventListener("load", transferComplete);
  var startTime = new Date().getTime();
  //xhr.open('GET', 'http://eu.speedtest.trc.gov.lk/TRCSL/10MB.zip', true);
  //http://localhost:3000/
  var url = 'http://95.211.150.11/TRCDF/10MB.zip';
  xhr.open('GET', url, true);
  xhr.send();

  // progress on transfers from the server to the client (downloads)
  function updateProgress(oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total;
      var now = new Date().getTime();
      var duration = now - startTime;
      printRecord(oEvent.loaded, oEvent.total, duration);
    } else {
      // Unable to compute progress information since the total size is unknown
    }
  }

  function printRecord(loaded, total, duration) {
    if (duration > 0) {
      speed = ((loaded * 8) / (1048576)) / (duration / 1000);
      //console.log(loaded + ' bytes | ' + total + ' bytes | ' + Math.round((loaded / total) * 100) + '% Downloaded | ' + speed + ' Mbps| ');
      chart = $('#container').highcharts();
      point = chart.series[0].points[0];
      point.update(Math.round(speed * 100) / 100);
    } else {
      //starting phase
    }

  }



  function transferComplete(evt) {
    console.log("The transfer is complete.");
    console.log(evt);
  }

}

function setMeterZero() {
  chart = $('#container').highcharts();
  point = chart.series[0].points[0];
  point.update(0);



}

function show(name) {
  $('#pagefeature').html('');
  var filename = name + '.html';
  $('#pagefeature').load(filename);
}

function loaddashboard() {
  var filename = 'myspeed.html';
  $('#pagefeature').load(filename, function(responseTxt, statusTxt, xhr) {
    if (statusTxt == "success")
      drawingchart();

    if (statusTxt == "error")
      alert("Error: " + xhr.status + ": " + xhr.statusText);
  });

}
myToken = null;
function getToken() {
var ip = getip();
if(typeof(Storage) !== "undefined") {

	myToken = localStorage.getItem("myToken");
}
if(myToken == null){
  $.post("http://localhost:3000/api/net_speeds",{ 'ip':ip},
    function(data) {
	if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
	myToken = data.Token;
	localStorage.setItem("myToken", myToken);
} else {
    // Sorry! No Web Storage support..
	myToken = data.Token;
}
	  myToken = data.Token;
      console.log(data.Token);
    });
	}
  }
var filelocation = null;

function test(filename, location) {
  filelocation = location;
  setMeterZero();
getToken();
  var d = new Date();
  var n = d.getTime();
  //console.log("----------My Speed - console ----------");
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("progress", updateProgress);
  xhr.addEventListener("load", transferComplete);
  var startTime = new Date().getTime();
  filename = $('input[name=optradio]:checked').val() + 'MB' + filename
  console.log(filename);
  //var usurl = 'http://207.244.91.98/TRCDF/10MB.zip';
  xhr.open('GET', getServerURL(location)+'' + filename + '?' + n, true);

  console.log("Speed By Megabits Per Second");

  


  // progress on transfers from the server to the client (downloads)
  function updateProgress(oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total;
      var now = new Date().getTime();
      var duration = now - startTime;
      printRecord(oEvent.loaded, oEvent.total, duration);
    } else {
      // Unable to compute progress information since the total size is unknown
    }
  }
  var mySpeed = 0;

  function printRecord(loaded, total, duration) {
    resetProgressBar();

    if (duration > 0) {
      $('button').prop('disabled', true);
      downloadPrecentage = Math.round((loaded / total) * 100)
      speed = ((loaded * 8) / (1048576)) / (duration / 1000);
      console.log(loaded + ' bytes | ' + total + ' bytes | ' + Math.round((loaded / total) * 100) + '% Downloaded | ' + speed + ' Mbps| ');

      chart = $('#container').highcharts();
      mySpeed = Math.round(speed * 100) / 100
      point.update(mySpeed);

      //update progress bar
      $("#progressbar").addClass('show')
      $('.progress-bar').attr('style', 'width:' + downloadPrecentage + '%');
      $('.progress-bar').text(downloadPrecentage + '% Downloading... ')
    } else {
      //starting phase
    }

  }

  function getDateTime() {
    var now = new Date();
    console.log(now.format("m/dd/yy"));
    // Returns, e.g., 6/09/07
    return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  }

  function resetProgressBar() {

    $("#msgbar").hide();
    $("#msgbar").html('..')
    $('.progress-bar').attr('class', 'progress-bar progress-bar-default progress-bar-striped');
    $('.progress-bar').attr('style', 'width:' + 0 + '%');
    $('.progress-bar').text('0% Downloading... ')


  }

  function transferComplete(evt) {
    console.log("The transfer is complete.");
    var testedfilesize = $('input[name=optradio]:checked').val();
    $('.progress-bar').text('File Download Completed');
    $('button').prop('disabled', false);
    $("#msgbar").show();
    point = chart.series[0].points[0];
    point.update(0);
    $("#msgbar").html('<strong>Your Speed is ' + mySpeed + ' Mbps</strong><br>Your IP address: ' + getip() + '<br>Date and Time of Test: ' + getDateTime() + '<br>Download Server Location: ' + filelocation + '<br>Tested File Size: ' + testedfilesize + 'MB');
    getDetails();
    $('.progress-bar').attr('class', 'progress-bar progress-bar-success progress-bar-striped');

  }

  xhr.send();
};