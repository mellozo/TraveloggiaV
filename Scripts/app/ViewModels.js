
function ViewModel() {

    var self = this;

    this.mapList = ko.observableArray();
    this.siteList = ko.observableArray();
    this.photoList = ko.observableArray();
    this.selectedMap = ko.observable();
    this.selectedImage = ko.observable();
    this.selectedSite = ko.observable();


    this.newMapName = ko.observable("");
    this.mapID = ko.observable();
    this.selectedJournal = ko.observable();
    this.screenSize = ko.observable();
    this.currentZoom = ko.observable();
    this.currentCenter = ko.observable();
    

//callback to CRUD.getMapsSitesPhotos
    this.loadMaps = function (arrayOjson) {
        // create models from json
        var maps = $.map(arrayOjson, function (item) { return new window.traveloggia.Map(item); });

        //update view model defaults to most recent map is selected map
        self.selectedMap.valueWillMutate();
        self.selectedMap(maps[window.traveloggia.CRUD.mapIndex]);
        self.selectedMap.valueHasMutated();

        //update view model with list of maps
        self.mapList.valueWillMutate();
        ko.utils.arrayPushAll(window.traveloggia.ViewModel.mapList, maps);
        self.mapList.valueHasMutated();

        self.clearPreviousSite();
        //update view model with default selected maps' sites
        if (arrayOjson[window.traveloggia.CRUD.mapIndex].Sites.length > 0 ) {
            self.loadSites(arrayOjson[window.traveloggia.CRUD.mapIndex].Sites);
        }// end if default map has any sites
    };

    this.ClearPreviousMap=function()
    {
        self.siteList.removeAll();
        self.photoList.removeAll();
    }

    this.ClearPreviousSite = function () {
        self.photoList.removeAll();
    }

    // called by ViewModel.loadMaps
    // load methods stuff view model and call map update
    this.loadSites = function (arrayOjson) {
        //// create models from json
        var sites = $.map(arrayOjson, function (item) { return new window.traveloggia.Site(item); });
        //// update view model selected site        
        self.selectedSite(sites[window.traveloggia.CRUD.siteIndex]);
        //// update view model site list
        self.siteList.valueWillMutate();
        ko.utils.arrayPushAll(window.traveloggia.ViewModel.siteList, sites);
        self.siteList.valueHasMutated();
        // method defined on map.js
        AddSitesToMap(arrayOjson);
        // no longer loading maps/sites/photos all at once too slow with all the new data
        // separate call to load photos
        //if (arrayOjson[window.traveloggia.CRUD.siteIndex].Photos.length > 0)
        //    self.loadPhotos(arrayOjson[window.traveloggia.CRUD.siteIndex].Photos);

        window.traveloggia.CRUD.getPhotos(window.traveloggia.CRUD.mapIndex, window.traveloggia.CRUD.siteIndex, self.selectedSite().SiteID(), this.loadPhotos)
    };




    this.selectSite = function (siteIndex) {
        window.traveloggia.CRUD.setSiteIndex(siteIndex);
        var jsSite = window.traveloggia.CRUD.repository[window.traveloggia.CRUD.mapIndex].Sites[siteIndex];
        var koSite = new window.traveloggia.Site(jsSite);
        window.traveloggia.ViewModel.selectedSite(koSite);

        window.traveloggia.ViewModel.clearPreviousSite();
        var sitePhotos = window.traveloggia.CRUD.repository[window.traveloggia.CRUD.mapIndex].Sites[siteIndex].Photos;

        if (sitePhotos == null)
        {
            window.traveloggia.CRUD.getPhotos(window.traveloggia.CRUD.mapIndex, window.traveloggia.CRUD.siteIndex, self.selectedSite().SiteID(), this.loadPhotos)
        }
        else {
            if (sitePhotos.length > 0)
                window.traveloggia.ViewModel.loadPhotos(sitePhotos);
            else
                window.traveloggia.ViewModel.selectedImage(null);
        }
    }






    this.clearPreviousSite = function()
    {
        self.photoList.removeAll();
    }


    this.loadPhotos = function (arrayOjson){
        var mapname = self.selectedMap().MapName();
        var photos = $.map(arrayOjson, function (item) { return new window.traveloggia.Photo(item, mapname); }); {
           // self.selectedImage.valueWillMutate();
            self.selectedImage(photos[0]);
          //  self.selectedImage.valueHasMutated();
            self.photoList.valueWillMutate();
            ko.utils.arrayPushAll(self.photoList, photos);
            self.photoList.valueHasMutated();
        };

      //  var sitephotos = new Array();
        // i think an inner closure here would enable you to get the photos         
        //for (var i = 0; i < arrayOjson.length; i++) {
        //    var photosite = sites[i];
   

        //    $.merge(sitephotos, photos);
        //}
        //window.traveloggia.ViewModel.photoList.valueWillMutate();
        //ko.utils.arrayPushAll(window.traveloggia.ViewModel.photoList, sitephotos);
        //window.traveloggia.ViewModel.photoList.valueHasMutated();

        //var activePage = $.mobile.activePage[0].id;
        //if (activePage == "map")
        //    AddSitesToMap(arrayOjson);



    }




}// end view model









