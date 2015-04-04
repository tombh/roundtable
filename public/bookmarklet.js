var VERSION = '0.0.0'

// Switch where the host server is depending on development/production environment
// Use http://reddit.com/r/thebutton?local to load the bookmarket from your local machine
var urlQuery = window.location.search.replace("?", "");
if( urlQuery == 'local'){
  host = 'localhost:5000'
} else {
  host = 'theroundtable.herokuapp.com'
}

// Open a streaming socket connection to our Round Table server
var ws = new WebSocket('ws://' + host);

var template;

var css = 'http://' + host + '/styles.css';
$('head').append('<link rel="stylesheet" type="text/css" href="' + css + '">');

// Add a div under reddit's button widget to contain our HTML
var div = document.createElement('div');
div.className = 'round-table';
$('.thebutton-form').append(div);

var username = $('#header .user > a').text()

function sendCommand(command, json){
  json['version'] = VERSION // So we know when to update the bookmarklet
  json['command'] = command
  data = JSON.stringify(json)
  ws.send(data)
}

function main(){
  // When first connecting send details about the knight
  sendCommand('RECRUIT', {
    username: username
  })

  // Whenever there's new data, re-render the template
  ws.onmessage = function(event) {
    json = JSON.parse(event.data)
    console.log(json)

    $('.thebutton-form .round-table').html(
      template(json)
    );

    if(username == json.knights[json.on_the_watch]) {
      $('#on-the-watch').append('&nbsp;(<button onclick="return passTheWatch()">Pass</button>)')
    }
  };
}

function passTheWatch() {
  sendCommand('WATCH_PASS', {
    username: username
  });
  return false;
}

// Fetch the template for the embedded HTML
$.ajax({
	url: 'http://' + host + '/embedded.html',
	method: 'GET',
	dataType: 'html',
	success: function(data) {
		template = _.template(data);
    main();
	}
});
