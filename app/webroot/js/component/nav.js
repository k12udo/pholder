/** | class **/
var nav =  {


    // resize - disable - script - mobile
    resize : function() {
        if( $("#nav").width() <= "550" ){
            $("#nav-toggle-script").addClass("hidden");
            script.disable();
        } else {
            $("#nav-toggle-script").removeClass("hidden");
        }
    },


}
/** class | **/




/** | listener **/


    // document - ready
    $(document).ready(function() {
        nav.resize();
    });


    // window - resize
    $(window).resize(function() {
        nav.resize();
    });


/** listener | **/
