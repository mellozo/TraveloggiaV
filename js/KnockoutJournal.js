



function Journal( dbJournal)
{

    var self = this;
    self.Text = ko.observable(dbJournal.Text);
    self.Title=ko.observable(dbJournal.Title);
    self.SiteID = ko.observable(dbJournal.SiteID);
    self.JournalID = ko.observable(dbJournal.JournalID);

}


function GetJournals(mel) {
    $.ajax(
                    {
                        url: "http://localhost:7490/api/Journal/9778",
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    })
                .done(function (entries) {

                    for (var i = 0; i < entries.length; i++) {
                        var j = new Journal(entries[i]);
                        if (i == 0)
                        {
                            mel.CurrentJournal(j);
                           
                            editor.setValue(linebreak(j.Text()));
                           
                        }
                        mel.Journals.push(j);

                    }
                   

                })

                .fail(function (x, y, z) {
                    // alert("disaster" + z + y);
                });

}


function NewJournal()
{



}


$(document).ready(function () {

   var vm = new JournalPageViewModel();
    GetJournals(vm);
    

    ko.applyBindings(vm);
});


function JournalPageViewModel() {

    var self = this;
    self.Journals = ko.observableArray([]);
    
    self.CurrentJournal = ko.observable({ Title: "", Text: "", JornalID: "", SiteID: "" });

    self.NewJournal = function () {

        self.CurrentJournal({ Title: "", Text: "", JornalID: "", SiteID: "" })
        editor.setValue("");
    }
  
}

