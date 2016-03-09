<?php
include 'vendor/twilio/sdk/Services/Twilio/Capability.php';
 
// put your Twilio API credentials here
$accountSid = 'AC8b30817c60dc275b9e57b9e898716ddf';
$authToken  = 'ad05cbfca2f35d2158e8d26458bfddad';
$appSid = 'AP3bd06ed684cf585f0f3f13d2ecfdc55f';
 
$capability = new Services_Twilio_Capability($accountSid, $authToken);
$capability->allowClientOutgoing($appSid);
$token = $capability->generateToken();
?>
 
<!DOCTYPE html>
<html>
  <head>
    <title>Transcribler</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <script type="text/javascript" src="//media.twiliocdn.com/sdk/js/client/v1.3/twilio.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript">

    Twilio.Device.setup("<?php echo $token; ?>");
 
    Twilio.Device.ready(function (device) {
      $("#log").text("Ready");
    });

    Twilio.Device.error(function (error) {
      $("#log").text("Error: " + error.message);
    });

    Twilio.Device.connect(function (conn) {
      $("#log").text("Successfully established call");
    });

    Twilio.Device.disconnect(function (conn) {
      $("#log").text("Call ended");
    });

    function call() {
      var phone_number = document.getElementById("phone_number").value;
      Twilio.Device.connect({PhoneNumber:phone_number});
    }

    function hangup() {
      Twilio.Device.disconnectAll();
    }

    </script>
    <script type="text/javascript" src="speechrec.js"></script>
  </head>


  <body class="panel-body">
    <h1>Transcribler</h1>
    <div id="control" class="col-xs-6 pull-left">
    <input type="text" id="phone_number">
    <br/>
    <button class="call" onclick="call();">
      Call
    </button>
    <button class="hangup" onclick="hangup();">
      Hangup
    </button>
    <button id="rec" value="start">
      Transcribe
    </button>
    </div>
    <div id="transcript" class="col-xs-6 pull-right table-bordered">
      <span id="final_span"></span>
      </br>
      <span id="interim_span"></span>
    </div>
  </body>
</html>