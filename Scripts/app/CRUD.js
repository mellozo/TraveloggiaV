



window.traveloggia.CRUD = function (ko) {
    var self = this;

    this.repository = null;
    this.mapIndex = 0;
    this.siteIndex = 0;

    // get methods make ajax call to DB web service  
    // wonder of EF gets child sites and photos 
    this.getMapsSitesPhotos = function (callback) {

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


    this.deleteMap = function deleteMap(deletedMap) {
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

}




