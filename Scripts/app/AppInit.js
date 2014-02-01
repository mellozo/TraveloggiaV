

$(document).on("mobileinit", function () {
    $.support.touchOverflow = true;
    $.mobile.touchOverflowEnabled = true;
});



$(document).ready(function () {

    
    SetMapSize();

    InitMap();

    SetMenuSlideOuts();

    if (!window.traveloggia.ViewModel) {

        window.traveloggia.CRUD = new window.traveloggia.CRUD(ko);
        window.traveloggia.ViewModel = new ViewModel(ko);
        window.traveloggia.CRUD.getMapsSitesPhotos(window.traveloggia.ViewModel.loadMaps);
    }


    ko.applyBindings(window.traveloggia.ViewModel);

    
   


});

$(window).resize(function () {

   // alert("window resized");
    //var activePage = $.mobile.activePage[0].id;
    //if (activePage == "map") {
      //  SetMapSize();
        clearTimeout(this.id);
        this.id = setTimeout(SetMapSize, 300);
    //}
});


