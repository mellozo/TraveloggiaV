
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var recognition;
var editor;
var journalSiteID;
var canrecognize = false;

$(document).ready(function () {

   
// stop one browser detection
    if (!('webkitSpeechRecognition' in window)) {
        alert("no webkit sorry")
        showInfo("info_blocked");
        
    } else {
     
        canrecognize = true;
// step two either create or use html5 declaration..( avoid allow permission prompt)
        start_button.style.display = 'inline-block';
        showInfo("info_start");

        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function () {
            recognizing = true;
            showInfo('info_speak_now');
            start_img.src = 'images/mic-animate.gif';
        };

        recognition.onerror = function (event) {
            if (event.error == 'no-speech') {
                start_img.src = 'images/mic.gif';
                showInfo('info_no_speech');
                ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
                start_img.src = 'images/mic.gif';
                showInfo('info_no_microphone');
                ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
                if (event.timeStamp - start_timestamp < 100) {
                    showInfo('info_blocked');
                } else {
                    showInfo('info_denied');
                }
                ignore_onend = true;
            }
        };



        recognition.onend = function () {
            recognizing = false;
            if (ignore_onend) {
                return;
            }
            start_img.src = 'images/mic.gif';
            if (!final_transcript) {
                showInfo('info_start');
                return;
            }
            showInfo('');

        };

        recognition.onresult = function (event) {
            var interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            final_transcript = capitalize(final_transcript);

            editor.setValue( linebreak(final_transcript));
            interim_span.innerHTML = linebreak(interim_transcript);

            //            $('#interim_textarea').val(linebreak(interim_transcript));
            //if (final_transcript || interim_transcript) {
            //    showButtons('inline-block');
           // }
        };

      
       //var sd = $('#speechDetector');
        //sd.continuous = true;
        //sd.interimResults = true;
        //var final_transcript = '';
    }

});

// step three handle result... this code does not work on the html object


function showInfo(s) {

    var message="";
    switch (s) {
        case"info_start": message="Click on the microphone icon to use speech to text";
            break;
        case"info_speak_now": message="Speak now";
            break;
        case"info_no_speech": message= "No speech was detected. You may need to adjust yourmicrophone settings";
           break;

        case "info_no_microphone": message="No microphone was found. Ensure that a microphone is installed and that icrophone settings are configured correctly."
            break;
            
        case"info_allow": message="Click the 'Allow' button above to enable your microphone."
            break;

        case"info_denied":message = "Permission to use microphone was denied.";
            break;
        case"info_blocked": message="Permission to use microphone is blocked. Web Speech API is not supported by this browser.Upgrade to Chrome version 25 or later.";
            start_img.src = 'images/mic-slash.gif';
            break;
    }
    $('#info').text(message);
}



function startButton(event) {
  
    if (!canrecognize)
        return;

    if (recognizing) {
        recognition.stop();
        return;
    }
    final_transcript = '';
 
  //  recognition.lang = select_dialect.value;
    recognition.start();
  
    //ignore_onend = false;
   // $('#final_textarea').val('');
   //$('#interim_textarea').val('');
    start_img.src = 'images/mic-slash.gif';
    showInfo('info_allow');
   // showButtons('none');
    start_timestamp = event.timeStamp;
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
    return s.replace(first_char, function (m) { return m.toUpperCase(); });
}



function saveJournal() {
    var melness = editor.textareaElement.value;
    insertJournal(melness, journalSiteID, 1);
    
}



