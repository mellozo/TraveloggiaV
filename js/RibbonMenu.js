$("#menuContainer").draggable({ axis: "x" });


$('#menuToggle').click(function () {

    //  $("#navstrip").animate({ width: 'toggle' }, { duration: 'slow', easing: 'easeOutQuad' });// sadly this breaks flyouts

    var src = $('#menuToggle').attr('src');

    if (src == 'Images/right arrow.png') {
        $("#navstrip").hide('slide', { direction: 'up' }, 1000);
        // $("#navstrip").animate( {width: '0px' }, { duration: 'slow', easing: 'easeOutQuad' });
        $('#menuToggle').attr('src', 'Images/left arrow.png');
        $('#menuToggle').animate({ right: "-70px" }, { duration: 'slow', easing: 'easeOutBack' });
    }
    else {
        $("#navstrip").show("slide", { direction: "down" }, 1000);
        //  $("#navstrip").animate({ width: '70px' }, { duration: 'slow', easing: 'easeOutQuad' });
        $('#menuToggle').attr('src', 'Images/right arrow.png');
        $('#menuToggle').animate({ right: "0px" }, { duration: 'slow', easing: 'easeOutBack' });

    }
});




function SetMenuSlideOuts() {
    $("#navstrip a").hover(function () { $(this).prev().addClass("menuFlyOut"); }, function () {
        $(this).prev().removeClass("menuFlyOut");
    });
};

