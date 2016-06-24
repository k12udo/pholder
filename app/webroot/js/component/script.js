/** | class **/
var script =  {


    enabled : false,


    // add
    add : function(hash, path_to_add) {
        console.log(hash);
        api = this.api_session_add(path_to_add);
    },


    // api - session - add
    api_session_add : function(path_to_add) {
        return $.ajax({
                    type:       "POST",
                    data:       { path : path_to_add },
                    url:        "php/api/session/add.php",
                    success:    function(data) {
                                },
                    error:      function() {
                                }
        });
    },


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


    // remove
    remove : function(path_to_remove) {
        console.log(path_to_remove);
    },


    // view - reset
    view_reset : function() {
        $("#files .script").addClass("hidden");
        $("#nav-toggle-script").removeClass("cyan");
    },

    // view - enabled
    view_enabled : function() {
        this.view_reset();
        $("#files .script").removeClass("hidden");
        $("#nav-toggle-script").addClass("cyan");
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
