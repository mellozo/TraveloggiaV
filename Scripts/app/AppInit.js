

$(document).on("mobileinit", function () {
    $.support.touchOverflow = true;
    $.mobile.touchOverflowEnabled = true;
});



$(document).ready(function () {



    SetMapSize();

    InitMap();

    SetMenuSlideOuts();

    if (window.traveloggia.ViewModel ===undefined) {

        window.traveloggia.CRUD = new window.traveloggia.CRUD(ko);
        window.traveloggia.ViewModel = new ViewModel(ko);

        if (Modernizr.localstorage && localStorage["repository"]) {

            var mapIndex = localStorage["MapIndex"];
            var siteIndex = localStorage["SiteIndex"];
            if (mapIndex)
                window.traveloggia.CRUD.mapIndex = mapIndex;
            if (siteIndex)
                window.traveloggia.CRUD.siteIndex = siteIndex;


            try
            {// JSON.parse only works in chrome how sucky
                var repo = JSON.parse(localStorage["repository"]);
                window.traveloggia.CRUD.repository = repo;
                window.traveloggia.ViewModel.loadMaps(repo);
              }
                catch(error)
                {
                    window.traveloggia.CRUD.getMapsSitesPhotos(window.traveloggia.ViewModel.loadMaps);
                }

        }
        else
        {
            window.traveloggia.CRUD.getMapsSitesPhotos(window.traveloggia.ViewModel.loadMaps);
        }

    }

    ko.applyBindings(window.traveloggia.ViewModel);

});

$(window).resize(function () {

        clearTimeout(this.id);
        this.id = setTimeout(SetMapSize, 300);
   
});


