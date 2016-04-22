if (!('webkitSpeechRecognition' in window)) {
	upgrade();
} else {

	var recognition = new webkitSpeechRecognition,
		transcript = '',
		final_transcript = '';

	recognition.continuous = true;
  	recognition.interimResults = true;

	recognition.onstart = function() {
		console.log("working");
	};

	recognition.onresult = function() {
		var interim_transcript = "";
		var init_final_transcript = final_transcript;
		for (var i = event.resultIndex; i < event.results.length; ++i) {
	      if (event.results[i].isFinal) {
	        final_transcript += event.results[i][0].transcript + "<br>";
	      } else {
	        interim_transcript += event.results[i][0].transcript;
	      }
	    }

	    final_transcript = capitalize(final_transcript);
	    final_span.innerHTML = linebreak(final_transcript);
	    interim_span.innerHTML = linebreak(interim_transcript);

	    if(init_final_transcript != final_transcript){
	    	var latest = final_transcript.substr(init_final_transcript.length);
	    	var msg = latest;
	    	myUA.message(otherURI, msg);
	    }  
	}

	myUA.on('message', function (msg) {
		console.log("reached" +otherURI);
		var msgbody = msg.body;
        final_transcript += msgbody;
        final_transcript = capitalize(final_transcript);
	    final_span.innerHTML = linebreak(final_transcript);
    });

	var two_line = /\n\n/g;
	var one_line = /\n/g;
	function linebreak(s) {
	  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
	}

	var first_char = /\S/;
	function capitalize(s) {
	  return s.replace(first_char, function(m) { return m.toUpperCase(); });
	}

	recognition.onend = function() {
		console.log("stopped");
	};

	$(function(ready){
		$( "#rec" ).click(function() {
			if($(this).attr('value')=="start") {
				$(this).prop('value', 'stop');
				recognition.start();
			}
			else {
				$(this).prop('value', 'start');
				recognition.stop();
			}
		});
	})

}