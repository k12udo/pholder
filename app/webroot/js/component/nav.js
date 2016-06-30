/** | class **/
var nav =  {


    // resize - disable - script - mobile
    resize : function() {
        if( $("#nav").width() <= "480" ){
            $("#nav-toggle-script").addClass("hidden");
            script.disable();
        } else {
            $("#nav-toggle-script").removeClass("hidden");
        }
    },


}
/** class | **/




/** | listener **/


    // window - resize
    $(window).resize(function() {
        nav.resize();
    });


/** listener | **/
