$(function() {

    $('#container').highcharts({

            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: {
                text: 'Network Speedometer'
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
                    text: 'km/h'
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
                        var kmh = this.y;

                        return '<span style="color:#339">' + kmh + ' MB/s</span><br/>';
                    }
                },
                tooltip: {
                    valueSuffix: ' MB/s'
                }
            }]

        },
        // Add speedometer to life
        function(chart) {
            if (!chart.renderer.forExport) {}
        });
});

function testURL() {
console.log("----------Test URL ----------");
    var xhr = new XMLHttpRequest();
	xhr.setRequestHeader( 'Access-Control-Allow-Origin', 'origin');
    xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load", transferComplete);
    var startTime = new Date().getTime();
    xhr.open('GET', 'http://us.speedtest.trc.gov.lk/TRCSL/10MB.zip', true);
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
            speed = (loaded / (1048576)) / (duration / 1000);
            console.log(loaded + ' bytes | ' + total + ' bytes | ' + Math.round((loaded / total) * 100) + '% Downloaded | ' + speed + ' MB/s| ');

            chart = $('#container').highcharts();
            point = chart.series[0].points[0];
            point.update(Math.round(speed * 100) / 100);
        } else {
            //starting phase
        }

    }

    function transferComplete(evt) {
        console.log("The transfer is complete.");
    }
	
}

function test(filename) {
    console.log("----------My Speed - console ----------");
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load", transferComplete);
    var startTime = new Date().getTime();
    xhr.open('GET', './' + filename, true);
    console.log("Speed By Megabyte Per Second");

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
            speed = (loaded / (1048576)) / (duration / 1000);
            console.log(loaded + ' bytes | ' + total + ' bytes | ' + Math.round((loaded / total) * 100) + '% Downloaded | ' + speed + ' MB/s| ');

            chart = $('#container').highcharts();
            point = chart.series[0].points[0];
            point.update(Math.round(speed * 100) / 100);
        } else {
            //starting phase
        }

    }

    function transferComplete(evt) {
        console.log("The transfer is complete.");
    }

    xhr.send();
};