if (!('webkitSpeechRecognition' in window)) {
	upgrade();
} else {

	var recognition = new webkitSpeechRecognition,
		transcript = '',
		final_transcript = "";

	recognition.continuous = true;
  	recognition.interimResults = false;

	recognition.onstart = function() {
		console.log("working");
	};

	recognition.onresult = function() {
		var interim_transcript = "";
		var init_final_transcript = final_transcript;
		for (var i = event.resultIndex; i < event.results.length; ++i) {
	      if (event.results[i].isFinal) {
	         final_transcript += "<p class='row my_results col-md-8 pull-right well'>" + myName + ": " + event.results[i][0].transcript + "</p>";
	      } else {
	        interim_transcript += event.results[i][0].transcript;
	      }
	    }

	    final_transcript =  capitalize(final_transcript);
	    final_span.innerHTML = linebreak(final_transcript);
	    interim_span.innerHTML =linebreak(interim_transcript);

	    if(init_final_transcript != final_transcript){
	    	var latest = final_transcript.substr(init_final_transcript.length);
	    	var msg = latest;
            if(myUA)
            myUA.message(otherURI, msg);
	    }  
	}

	

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

	
	function downloadInnerHtml(filename, elId) {
	    var elHtml = document.getElementById(elId).innerHTML;
	    var link = document.createElement('a');
	    mimeType = 'text/html';

	    link.setAttribute('download', filename);
	    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
	    link.click(); 
	}

	$(function(ready){
		$( "#rec" ).click(function() {
			if($(this).attr('value')=="start") {
				$(this).prop('value', 'stop');
				$(this).html("stop transcription");
				recognition.start();
			}
			else {
				$(this).prop('value', 'start');
				$(this).html("transcribe");
				recognition.stop();
			}
		});

		$("#dl").click(function() {
			downloadInnerHtml("transcript.html", 'final_span');
		});
	})

}