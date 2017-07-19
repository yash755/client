var apiKey,
    session,
    sessionId,
    token,
    myid,
    response;
    

var data = new Array();
var i=0;

$(document).ready(function() {
  // See the confing.js file.
if (SAMPLE_SERVER_BASE_URL) {
    // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
    $.get(SAMPLE_SERVER_BASE_URL + '/room/session', function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;
     /* console.log("token",token)*/
      initializeSession(-1);
    });
  }
});

function initializeSession(id) {


if (id == -1){
  session = OT.initSession(apiKey, sessionId);

  session.on({
    connectionCreated: function (event) {
      data[i] = event.connection
      i = i+1
    /*  message(-1)*/
    }
  });

  // Connect to the session
  session.connect(token, function(error) {
  }); 
}

  session.on('sessionDisconnected', function(event) {
    console.log('You were disconnected from the session.', event.reason);
  });

  


  
/*  }*/


/*  function message(id){  */

    var ids = id
            
   /* console.log("ID",id,data)*/
  // Receive a message and append it to the history
  var msgHistory = document.querySelector('#history');
  session.on('signal:msg', function(event) {
  /*  console.log("Even",event);*/
    var msg = document.createElement('p');
    var j;
    for (j = 0; j < data.length; j++) {

    if (data[j].connectionId == event.from.connectionId) {
        ids = j;
        break;
      }
    }
    msg.textContent = event.data;
/*    console.log("Connection id",data[0].connectionId)*/
    msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
    msgHistory.appendChild(msg);
    msg.scrollIntoView();
  });


//Set

var form = document.querySelector('form');
var msgTxt = document.querySelector('#msgTxt');

// Send a signal once the user enters data in the form
form.addEventListener('submit', function(event) {
  event.preventDefault();

/*console.log("IDS",session.connection.connectionId)

var j;
for (j = 0; j < data.length; j++) {
  if (data[j].connectionId == session.connection.connectionId) {
      myid = j;
      break;
      }
  }*/

if (ids != -1){
  session.signal({
      to:data[ids],
      type: 'msg',
      data: msgTxt.value
    }, function(error) {
      if (error) {
        console.log('Error sending signal:', error.name, error.message);
      } else {
        msgTxt.value = '';
      }
    });
}

});
}
/*}*/