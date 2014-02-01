
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var recognition;
var editor;
var canrecognize = false;

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



