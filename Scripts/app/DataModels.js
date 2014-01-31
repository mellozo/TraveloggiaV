


window.traveloggia = window.traveloggia || {};

window.traveloggia.Map = function Map(data) {

    this.MapName = ko.observable(data.MapName);
    this.MapID = ko.observable(data.MapID);
    this.CreateDate = ko.observable(data.CreateDate);
    this.LastRevision = ko.observable(data.LastRevision);
    this.MemberID = ko.observable(data.MemberID);
    this.Sites = ko.observableArray(data.Sites);
}


window.traveloggia.Journal = function Journal(data) {

   this.Text = data.Text;
    this.SiteID = data.SiteID;
}


window.traveloggia.Site = function Site(data) {

    this.SiteID = ko.observable(data.SiteID);
    this.Longitude = ko.observable(data.Longitude);
    this.Latitude = ko.observable(data.Latitude);
    this.MapID = ko.observable(data.MapID);
    this.Name = ko.observable(data.Name);
    this.Address = ko.observable(data.Address);
    this.Description = ko.observable(data.Description);
    this.DateAdded = ko.observable(data.DateAdded);
    this.FromPhone = ko.observable(data.FromPhone);
    this.Photos = ko.observableArray(data.Photos);
}


window.traveloggia.Photo = function Photo(data,mapName) {
    this.PhotoID = ko.observable(data.PhotoID);
    this.FileName = ko.observable(data.FileName);
    this.Caption = ko.observable(data.Caption);
    this.SiteID = ko.observable(data.SiteID);

    this.FromPhone = ko.observable(data.FromPhone);
    this.path = ko.computed( function(){  
        return "http://www.traveloggia.net/upload/1/" + mapName + "/" + this.FileName();
    }, this);

   // this.Site = ko.observable(site);



}

