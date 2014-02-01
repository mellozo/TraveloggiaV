


function insertJournal(journalEntry, siteID, memberID) {

    var Journal = {
       // JournalID: null,
        SiteID: 9778,
       
        Text: journalEntry,
        KeyWords: "",
        DateAdded: new Date().now,
        JournalDate: new Date().now,
        FromPhone: false,
        Title: "yo",
        MemberID: memberID

    }

    $.ajax(
             {
                 url: "http://localhost/TraveloggiaV_Services/api/Journal",
                 type: "POST",
                 dataType: "json",
                 data: Journal

             })
         .done(function (journalEntry) {
             alert("Journal Saved")
             
         })
         .fail(function (x, y, z) {
             alert(z);
         });


}




