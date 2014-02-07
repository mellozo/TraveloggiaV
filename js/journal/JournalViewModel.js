



function Journal( dbJournal)
{

    var self = this;
    self.Text = ko.observable(dbJournal.Text);
    self.Title=ko.observable(dbJournal.Title);
    self.SiteID = ko.observable(dbJournal.SiteID);
    self.JournalID = ko.observable(dbJournal.JournalID);

}


function JournalPageViewModel() {

    var self = this;

    this.Journals = ko.observableArray([]);

    this.CurrentJournal = ko.observable({ Title: "", Text: "", JornalID: "", SiteID: "" });

    this.NewJournal = function () {

        self.CurrentJournal({ Title: "", Text: "", JornalID: "", SiteID: "" })
        editor.setValue("");
    }

    this.loadJournals = function (arrayOjson) {

        for (var i = 0; i < arrayOjson.length; i++) {
            var j = new Journal(arrayOjson[i]);
            if (i == 0) {
                self.CurrentJournal(j);

                editor.setValue(linebreak(j.Text()));
            }
            self.Journals.push(j);
        }



    }


    this.saveJournal = function ()
    {
        var title = $('#title').val();

            var siteID = location.search.split("=")[1];
            var melness = editor.textareaElement.value;
            journalDAL.insertJournal(melness, siteID, 1,title);
    
        }





}