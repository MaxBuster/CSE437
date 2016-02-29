<!-- <html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
		<script type="text/javascript" src="http://media.twiliocdn.com/sdk/js/client/v1.3/twilio.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> </script>
	</head>

	<body>
		<script type="text/javascript">
		    // Set up with TOKEN, a string generated server-side
		    Twilio.Device.setup(token);
		    /*
		    Twilio.Device.ready(function(device) {
			  // The device is now ready
			  console.log("Twilio.Device is now ready for connections");
			});
			*/
		</script>

		<div id="voicecall">
			<form>
			<input type="tel" name="Phone Number" >
			<button >Call</button>
			</form>
		</div>
		
		<div id="transcript">
			
		</div>
	</body>
</html> -->

<?php
include 'vendor/twilio/sdk/Services/Twilio/Capability.php';
 
// put your Twilio API credentials here
$accountSid = 'AC8b30817c60dc275b9e57b9e898716ddf';
$authToken  = 'ad05cbfca2f35d2158e8d26458bfddad';
 
$capability = new Services_Twilio_Capability($accountSid, $authToken);
$capability->allowClientOutgoing('APabe7650f654fc34655fc81ae71caa3ff');
$token = $capability->generateToken();
echo $token;
?>
 
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Client Monkey 1</title>
    <script type="text/javascript"
      src="//media.twiliocdn.com/sdk/js/client/v1.3/twilio.min.js"></script>
    <script type="text/javascript"
      src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js">
    </script>
    <link href="http://static0.twilio.com/marketing/bundles/quickstart/client.css"
      type="text/css" rel="stylesheet" />
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
 
      function call() {
        Twilio.Device.connect();
      }
    </script>
  </head>
  <body>
    <button class="call" onclick="call();">
      Call
    </button>
 
    <div id="log">Loading pigeons...</div>
  </body>
</html>