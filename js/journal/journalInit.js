
$(document).ready(function () {



        editor = new wysihtml5.Editor("wysihtml5-editor", {
            toolbar: "wysihtml5-editor-toolbar",
            stylesheets: ["http://yui.yahooapis.com/2.9.0/build/reset/reset-min.css", "css/editor.css"],
            parserRules: wysihtml5ParserRules
        });

        SetMenuSlideOuts();

        var journalVM = new JournalPageViewModel();

        var journalDAL = new JouranlDAL(journalVM);

        var siteID = location;

       journalDAL.GetJournals(siteID, journalVM.loadJournals);


       ko.applyBindings(journalVM);

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

            editor.setValue(linebreak(final_transcript));
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
