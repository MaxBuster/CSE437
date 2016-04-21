<!DOCTYPE html>
<html>
  <head>
    <title>Start Chat - Scribe</title>
  	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  	<meta content="utf-8" http-equiv="encoding">
    <link rel="stylesheet" type="text/css" href="landing_style.css">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  </head>

  <body>
    <div class="container-full">

      <div class="row">
       
        <div class="col-lg-12 text-center v-center">
          
          <h1>Scribe</h1>
          <p class="lead">Start A New Chat</p>
          
          <br>
          
          <form class="col-lg-12" action="chat_page.html" method="get">
            <div class="input-group input-group-lg col-sm-offset-4 col-sm-4">
              <input type="text" class="center-block form-control input-lg" name="myName" placeholder="Your Name">
            </div>
            <div class="input-group input-group-lg col-sm-offset-4 col-sm-4">
              <input type="text" class="center-block form-control input-lg" name="theirName" placeholder="Their Name">
            </div>
            <div class="input-group input-group-lg col-sm-offset-4 col-sm-4">
              <input type="submit" class="btn btn-primary center-block form-control input-lg" value="Start"></input>
            </div>
          </form>
        </div>
        
      </div> <!-- /row -->
    </div> <!-- /container full -->
  </body>