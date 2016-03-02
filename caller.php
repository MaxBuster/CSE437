<?php
include 'vendor/twilio/sdk/Services/Twilio/Capability.php';
 
// put your Twilio API credentials here
$accountSid = 'AC8b30817c60dc275b9e57b9e898716ddf';
$authToken  = 'ad05cbfca2f35d2158e8d26458bfddad';
 
$capability = new Services_Twilio_Capability($accountSid, $authToken);
$capability->allowClientOutgoing('AP3bd06ed684cf585f0f3f13d2ecfdc55f');
$token = $capability->generateToken();
?>
 
<!DOCTYPE html>
<html>
  <head>
    <title>Transcribler</title>
    <script type="text/javascript" src="//media.twiliocdn.com/sdk/js/client/v1.3/twilio.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <link href="http://static0.twilio.com/marketing/bundles/quickstart/client.css" type="text/css" rel="stylesheet" />
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
        Twilio.Device.connect({PhoneNumber:9788443113});
      }

      function hangup() {
        Twilio.Device.disconnectAll();
      }
	  
		var curRes = 0;
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.onresult = function(event) { 
			console.log(event.results[curRes][0].transcript + " : " + event.results[curRes][0].confidence + " : " + event.results[curRes].isFinal);
			if(event.results[curRes].isFinal) {
				curRes++;
			}
		}
		recognition.onend = function() { 
			console.log("Speech recognition ended.");
			recognition.start();
		}
		recognition.start();
    </script>
  </head>


  <body>
    <h1>Transcribler</h1>
    <button class="call" onclick="call();">
      Call
    </button>
    <button class="hangup" onclick="hangup();">
      Hangup
    </button>
  </body>
</html>