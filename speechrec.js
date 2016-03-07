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
		for (var i = event.resultIndex; i < event.results.length; ++i) {
	      if (event.results[i].isFinal) {
	        final_transcript += event.results[i][0].transcript;
	      } else {
	        interim_transcript += event.results[i][0].transcript;
	      }
	    }

	    final_span.innerHTML = final_transcript;
	    interim_span.innerHTML = interim_transcript;
	}

	recognition.onend = function() {
		console.log("stopped");
	};

	$(function(ready){
		/*
			$( ".call" ).click(function() {
			recognition.start();
			});
			$( ".hangup").click(function() {
				recognition.stop();
			});
		*/
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