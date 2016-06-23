/** | class **/
var script =  {


    enabled : false,


    // disable
    disable : function() {
        this.view_reset();
        this.enabled = false;
    },

    // enable
    enable : function() {
        this.view_enabled();
        this.enabled = true;
    },

    // ready
    ready : function() {
    },


    // view - reset
    view_reset : function() {
        $("#files .script").addClass("hidden");
        $("#nav-toggle-script").removeClass("green");
    },

    // view - enabled
    view_enabled : function() {
        this.view_reset();
        $("#files .script").removeClass("hidden");
        $("#nav-toggle-script").addClass("green");
    }


}
/** class | **/




/** | listener **/


    // script - nav - click
    $("#nav-toggle-script").click(function() {
        if( script.enabled ){
            script.disable();
        } else {
            script.enable();
        }
    });


/** listener | **/
