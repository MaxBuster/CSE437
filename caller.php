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
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="script.js"></script>
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
    <div>
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
	<br/>
	<div id="Phone">
        <img src="img/BG(0,0).png" id="BG" />
        <!-- row -->
        <img src="img/One(0,94).png" id="One" />
        <img src="img/Two(71,94).png" id="Two" />
        <img src="img/Three(142,94).png" id="Three" />
        <!-- row -->
        <img src="img/Four(0,143).png" id="Four" />
        <img src="img/Five(71,143).png" id="Five" />
        <img src="img/Six(142,143).png" id="Six" />
        <!-- row -->
        <img src="img/Seven(0,193).png" id="Seven" />
        <img src="img/Eight(71,193).png" id="Eight" />
        <img src="img/Nine(142,193).png" id="Nine" />
        <!-- row -->
        <img src="img/Star(0,241).png" id="Star" />
        <img src="img/Zero(71,241).png" id="Zero" />
        <img src="img/Pound(142,241).png" id="Pound" />
        <!-- row -->
        <img src="img/Search(0,295).png" id="Search" />
        <img src="img/Call(64,295).png" id="Call" />
        <img src="img/Backspace(151,295).png" id="Backspace" />
        <!-- row -->

        <form>
            <input type="tel" name="phone_number" maxlength="13" id="phone_number" />
        </form>
    </div>
    </div>
    <div id="transcript" class="col-xs-6 pull-right table-bordered">
      <span id="final_span"></span>
      </br>
      <span id="interim_span"></span>
    </div>
  </body>
</html>