
var app = angular.module('TraveloggiaApp', []);



app.controller("JournalController", ['$scope', function ($scope) {

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };


    $scope.Text = "you suck";

    $scope.GetPage = function (id) {
        $scope.$apply(function () {
            $scope.Text = "you still suck";
        })
     
         //alert(id);
         //var i = 0;
         //for (i; i < $scope.Journals.length; i++) {

         //    if ($scope.Journals[i].JournalID == id) {

         //        $scope.safeApply(function () {
         //            $scope.Text = $scope.Journals[i].Text;
                    

         //        });
         //         break;
         //    }

         //}
     };
   


    $.ajax(
           {
               url: "http://localhost:7490/api/Journal/9778",
               type: "GET"
           })
       .done(function (entries) {
           //  alert("done")
           $scope.$apply(function () {
               $scope.Journals = entries;
              
              
           });
           //var tobeInsertedJournal = new window.traveloggia.Map(data);
           //observableList.push(insertedMap);
           //$('#mapSelector').listview('refresh');
       })
       .fail(function (x, y, z) {
           // alert("disaster" + z + y);
       });




}]);