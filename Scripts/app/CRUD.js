



window.traveloggia.CRUD = function (ko) {
    var self = this;

    this.repository = null;
    this.mapIndex = 0;
    this.siteIndex = 0;
  
  // get methods make ajax call to DB web service  
    // wonder of EF gets child sites and photos 
   this.getMapsSitesPhotos= function ( callback ){

        $.ajax(
           {
               url: "api/Map",
               dataType: "json"
           })
       .done(function (arrayOjson) {

           if (arrayOjson.length > 0) {
               self.repository = arrayOjson;
              callback(arrayOjson);
           }
           else {
               // create a new map 
           }

       })
       .fail(function (x, y, z) {

           alert(z);
       });

    }


   this.createMap = function createMap(observableList, createdMap) {
       var theMap = ko.toJS(createdMap);
       var theData = JSON.stringify(theMap);
       alert(theData);
       $.ajax(
              {
                  url: "api/Map",
                  type: "POST",
                  contentType: "application/json",
                  data: theData
              })
          .done(function (data) {

              var insertedMap = new window.traveloggia.Map(data);
              observableList.push(insertedMap);
              $('#mapSelector').listview('refresh');
          })
          .fail(function (x, y, z) {
              alert(z);
          });

   };


   this.deleteMap =  function deleteMap(deletedMap) {
        var theMap = ko.toJS(deletedMap);
        $.ajax(
              {
                  url: "api/Map",
                  type: "DELETE",
                  contentType: "application/json",
                  data: JSON.stringify(theMap)
              })
          .done(function (data) {

          })
          .fail(function (x, y, z) {
              alert(z);
          });
    }

    //****************Sites*****************************



   //this.getSites= function getSites(mapID) {
   //     var earl = "api/Site/" + mapID;
   //     $.ajax(
   //          {
   //              url: earl,
   //              dataType: "json"
   //          })
   //      .done(function (arrayOjson) {

   //          self.clearPreviousMap();
   //          self.loadSites(arrayOjson);
   //          AddSitesToMap(arrayOjson);


   //          var activePage = $.mobile.activePage[0].id;
   //          if ( ! activePage == "map")
   //              $.mobile.changePage("#map", { transition: "turn" });

   //      })
   //      .fail(function (x, y, z) {

   //          alert(z);
   //      });
   //}




    this.loadSites = function loadSites(arrayOjson, MapName) {
     


        if (arrayOjson[0].Photos && arrayOjson[0].Photos.length > 0) {
            var defaultPhoto = new window.traveloggia.Photo(arrayOjson[0].Photos[0], MapName, defaultSite);
            window.traveloggia.ViewModel.selectedImage(defaultPhoto);
        }


       
        var sitephotos = new Array();
        // i think an inner closure here would enable you to get the photos         
        //for (var i = 0; i < arrayOjson.length; i++) {
        //    var photosite = sites[i];
        //    var photos = $.map(arrayOjson[i].Photos, function (item) {
        //        return new window.traveloggia.Photo(item, MapName, photosite);
        //    });

        //    $.merge(sitephotos, photos);
        //}
        //window.traveloggia.ViewModel.photoList.valueWillMutate();
        //ko.utils.arrayPushAll(window.traveloggia.ViewModel.photoList, sitephotos);
        //window.traveloggia.ViewModel.photoList.valueHasMutated();

        //var activePage = $.mobile.activePage[0].id;
        //if (activePage == "map")
        //    AddSitesToMap(arrayOjson);



    }


};

function getPhotos() {
    var selectedSiteID = $(this)[0].SiteID._latestValue;
}







