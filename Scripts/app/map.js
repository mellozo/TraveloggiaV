// google api v.3 init code

var map;
var mapOptions;
var currentLocation;
var MarkerArray = [];
var bounds=null;

var mapTypeControlOptions = {
    mapTypeIds: [google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP],
    position: google.maps.ControlPosition.BOTTOM_LEFT
};

function InitMap() {
    // this takes too long
    //if (navigator.geolocation) {
    //    // get the current location using html5 geocoding and pass coords to set opening map view
        
    //    navigator.geolocation.getCurrentPosition(function (position) {
    //        var lat = position.coords.latitude;
    //        var lng = position.coords.longitude;
    //        currentLocation = new google.maps.LatLng(lat, lng);


    //        mapOptions = {
    //            MapTypeControlOptions: mapTypeControlOptions,
    //            center: currentLocation,
    //            zoom: 13

    //        }


    //        if(!map)
    //        map = new google.maps.Map(document.getElementById("map_canvas"),
    //             mapOptions);

    //    });


    //}
    //else {
       // alert("Geolocation API is not supported in your browser.");
        // hard code a place for the map to start
    lat =0;// 52.516274;
    lng = 0;//13.377678;
        currentLocation = new google.maps.LatLng(lat, lng);

        mapOptions = {
            MapTypeControlOptions: mapTypeControlOptions,
            center: currentLocation,
            zoom: 2

        }

       // if(!map)
        map = new google.maps.Map(document.getElementById("map_canvas"),
             mapOptions);

      
        
   // }


    


}

    


function SetMapSize() {

    var deviceWidth = $(window).width();

    if (deviceWidth > 550)
        deviceWidth = (deviceWidth * 66.66666) / 100;  //-30;

    var deviceHeight = $(window).height();// -30;// $('[data-role="page"]').first().height();

    $('#map_canvas').css({ 'width': deviceWidth, 'height': deviceHeight });

    if (map) {
        google.maps.event.trigger(map, 'resize');
        if (bounds != undefined)
            map.fitBounds(bounds);
    }

}
 


function AddSitesToMap(sites) {
    // seemingly redundant list used to clear markers by setting their map property to null and then the array to empty
    MarkerArray = new Array(sites.length);
    bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < sites.length; i++) {

        var latLong = new google.maps.LatLng(sites[i].Latitude, sites[i].Longitude);
        var tip = sites[i].Name;
        var site = sites[i];


        try {

            var market = new google.maps.Marker({ position: latLong, map: map, title: tip });
        }
        catch (error) {

            alert("cant add marker" + error);
        }
        // this is the notorious javascript this problem, each iteration, we need a new scope or something
        (function AttachEventHandlers(site,i) {

            google.maps.event.addListener(market, 'mouseover', function () {
                //window.traveloggia.ViewModel.ClearPreviousSite();
                var koSite = new window.traveloggia.Site(site);
                window.traveloggia.ViewModel.selectedSite(koSite);
              
               if (site.Photos.length > 0) {
                   var mapname = window.traveloggia.ViewModel.selectedMap().MapName();
                   window.traveloggia.ViewModel.loadPhotos(site.Photos);
               }
               else
                   window.traveloggia.ViewModel.selectedImage(null);
            });


            google.maps.event.addListener(market, 'click', function () {
               // window.traveloggia.ViewModel.selectedSite(site);
                window.traveloggia.CRUD.setSiteIndex(i);
                //if (site.Photos.length > 0) {
                //    window.traveloggia.ViewModel.clearPreviousSite();
                //    window.traveloggia.ViewModel.loadPhotos(site.Photos)

                //}
               $.mobile.changePage("#site", { transition: "slide" });
            });


        })(site, i);
      
  
 
        MarkerArray.push(market);
        bounds.extend(latLong);
    }


    if(map)
    map.fitBounds(bounds);

}




function ClearMarkersFromMap() {
    for (var i = 0; i < MarkerArray.length; i++) {
        if (MarkerArray[i]) {
            MarkerArray[i].setMap(null);
        }
    }
    MarkerArray = [];
  

    

}



//function getSize() {

//    var x=  $(window).width();
//    alert(x);
//}


//function LoadKML() {

//    $('#map_canvas').gmap({'callback':function() {         
//      var x =   this.loadKML('dog_feed_1', 'http://kmltools.nobletech.com/kml/Fuenf%20Seidla%20Steig');
//    }
//    });

//    //$('#map_canvas').gmap('loadKML', 'dog_feed_1', 'http://kmltools.nobletech.com/kml/Fuenf%20Seidla%20Steig');

//    //http://www.motherjones.com/environment/2011/01/transcanada-keystone-pipeline-map#spill
//    $('#map_canvas').gmap('loadKML', 'dog_feed_1', 'http://maps.google.com/maps/ms?ie=UTF8&t=m&vpsrc=6&source=embed&oe=UTF8&msa=0&msid=211388461394182029991.0004b5442c27584e8e261&output=kml');
//}

