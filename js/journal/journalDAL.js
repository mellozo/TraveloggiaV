
function JournalDAL() {

    var self = this;


    this.GetJournals = function (siteID, callback) {

        $.ajax(
                    {
                        url: "http://www.traveloggiaservices.net.rosebloom.arvixe.com/api/Journals/" + siteID,
                        dataType: "json"
                    })
                .done(function (entries) {

                    callback(entries);

                })

                .fail(function (x, y, z) {
                    // alert("disaster" + z + y);
                });

    }


    this.insertJournal = function (journalEntry, siteID, memberID,title) {

        var Journal = {
            // JournalID: null,
            SiteID:siteID,

            Text: journalEntry,
            KeyWords: "",
            DateAdded: new Date().now,
            JournalDate: new Date().now,
            FromPhone: false,
            Title: title,
            MemberID: memberID

        }

        $.ajax(
                 {
                     url: "http://www.traveloggiaServices.net.rosebloom.arvixe.com/api/Journals",
                     type: "POST",
                   
                     data: Journal

                 })
             .done(function (journalEntry) {
                 alert("Journal Saved")

             })
             .fail(function (x, y, z) {
                // alert(z);
             });


    }




   

}
