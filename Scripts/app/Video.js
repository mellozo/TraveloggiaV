


         

$(document).ready(function () {
});

function OnError(x, y, z, a) {
    alert(z);
}



// entry point called by search button
function GetData() {
    var terms = $('#searchTerms').val();
    var query='';
    var words = terms.split(' ') || [];
    for (var i = 0; i < words.length; i++) {
        query += words[i];
        if (i != ( words.length - 1) )
            query += "/";
    }

    var isMobile = GetIsMobile();

    var earl = GetQueryUrl(isMobile, query);

        
    var settings = {
        url:earl, //"http://gdata.youtube.com/feeds/api/videos/-/music/nutcracker/snowflakes?v=2&alt=json-in-script&format=5",
        //crossDomain: true,
        dataType: "jsonp",
        jsonpCallback: "showMyVideos",
        //contentType: "application/json"
    };

    $.ajax(settings)
   .error(OnError)
   .done(function (data) { })
   .always(function (huh) { });

}



function GetIsMobile() {
    var isMobile = false;
    isMobile = jQuery.browser.mobile;
    return isMobile;
}


function GetQueryUrl(isMobile, query) {

    isMobile = true;
    var earl=null;
    if (!isMobile)
        earl = "http://gdata.youtube.com/feeds/api/videos/-/" + query + "?v=2&alt=json-in-script&format=5";
    else {
        // get streaming format for mobile
        earl = "http://gdata.youtube.com/feeds/api/videos/-/" + query + "?v=2&alt=json-in-script&format=1,6";// or 6?
        //alert("getting streaming");
    }

    return earl;
}



function showMyVideos(data) {
    $("#search").trigger("collapse");
    $("#results").trigger("expand");
    $('#listResults').html('');
    var feed = data.feed;
    var entries = feed.entry || [];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var link = entry.link[0].href;
        var id = entry.id.$t.split(':')[3];
        $('<li>' + title + '</li>').append('<button onclick="ShowVideo(\'' + id + '\')" >play</button>').appendTo('#listResults');

    }
}


function ShowVideo(earlking) {
    $("#results").trigger("collapse");
    $("#video").trigger("expand");
    var earl = "http://www.youtube.com/embed/" + earlking + "?enablejsapi=1&origin=http://example.com";

    SetPlayerSize();
   

    $('#player').attr('src', earl);
}

// this needs refinement but placeholder for now
function SetPlayerSize()
{
    var deviceWidth = $(window).width();
    var deviceHeight=$(window).height();

    if (deviceWidth > 320) {
        deviceWidth = (deviceWidth * 90.00) / 100;  //-30;
        deviceHeight = (deviceHeight * 70.00) / 100;
    }
        

    var height = deviceHeight;
    var width=deviceWidth;
    $('#player').css('height', height);
    $('#player').css('width', width);

}
