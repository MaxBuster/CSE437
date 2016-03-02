if (!('webkitSpeechRecognition' in window)) {
	upgrade();
} else {

	var recognition = new webkitSpeechRecognition,
		transcript = '';

	recognition.onstart = function() {
		console.log("working");
	};

	recognition.onresult = function() {
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			transcript += event.results[i][0].transcript;
			document.getElementById("transcript").innerHTML = transcript;
		}
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