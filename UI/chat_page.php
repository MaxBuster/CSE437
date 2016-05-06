
<!DOCTYPE html>
<html>
  <head>
    <title>Chat Home - Scribe</title>
  	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  	<meta content="utf-8" http-equiv="encoding">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script src="sip-0.7.3.js"></script>
    <script type="text/javascript">
        var myName      = "<?php echo $_POST['myName']; ?>";
        var myURI       = myName + "@scribe.onsip.com";
        // FIXME: Very bad solution to send the password like this
        var myPass        = "<?php echo $_POST['myPass']; ?>";
        var otherURI        = "<?php echo $_POST['theirURI']; ?>";
    </script>
    <script src="UI_config.js"></script>
    <script src="UI_speechrec.js"></script>
    <link rel="stylesheet" type="text/css" href="chat_page_style.css">
  </head>

  <body>
    <div class="container-full">

      <div class="row">
       
        <div class="col-lg-12 text-center v-center">
          
          <h1>Scribe</h1>
        </div>
        
      </div> <!-- /row -->

    </div> <!-- /container full -->

    <div class="container">
      
      <hr>
    
      <div class="row">
          <span class="col-md-2 label label-info pull-right" id="your_name">Your ID</span> <br>
          <span class="col-md-2 label label-info pull-right" id="their_name">Their ID</span> <br>
        
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading"><h3>Video</h3></div>
              <div class="panel-body">
                <video id="video-of-other"></video>
              </div>
            </div>

            <div class="btn-group">
              <button class="btn btn-primary" id="my-video-button">call</button>
            </div>
          </div>

          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading"><h3>Transcription</h3></div>
              <div class="panel-body">
                <span id="final_span"></span>
                </br>
                <span id="interim_span"></span>
              </div>
            </div>

            <div class="btn-group">
              <button class="btn btn-primary" id="rec" value="start">transcribe</button>
              <button class="btn btn-primary" id="dl" value="start">download</button>
            </div>
          </div>
      </div>
      
      <div class="row">
            <div class="col-lg-12">
            <br><br>
              <p class="pull-right">© Copyright 2016 Scribe</p>
            <br><br>
            </div>
        </div>
    </div>
  </body>