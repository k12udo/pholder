/** | class **/
var script =  {


    enabled : false,


    // add
    add : function(hash, path_to_add) {
        file.add_file_script_loading(hash);
        api = this.api_session_add(path_to_add);
        api.success(function(data) {
            file.add_file_script_selected(hash);
        });
        api.error(function() {
            file.add_file_script_error(hash);
        });
    },


    // api - session - add
    api_session_add : function(path_to_add) {
        return $.ajax({
                    type:       "POST",
                    data:       { path : path_to_add },
                    url:        "php/api/session/add.php",
        });
    },

    // api - session - empty
    api_session_empty : function() {
        return $.ajax({
                    type:       "GET",
                    url:        "php/api/session/empty.php",
        });
    },

    // api - session - exists
    api_session_exists : function(path_to_check) {
        return $.ajax({
                    type:       "POST",
                    data:       { path : path_to_check },
                    url:        "php/api/session/exists.php",
        });
    },

    // api - session - remove
    api_session_rm : function(path_to_remove) {
        return $.ajax({
                    type:       "POST",
                    data:       { path : path_to_remove },
                    url:        "php/api/session/rm.php",
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
        var this_copy = this;
        api = this.api_session_empty();
        api.success(function(data) {
            if(data['empty'] != true){
                this_copy.enable();
            }
        });
    },


    // refresh
    refresh_file : function(hash, path_to_check) {
              file.add_file_script_loading(hash);
        api = this.api_session_exists(path_to_check);
        api.success(function(data) {
            switch(data["exists"]){
                case "parent":
                    file.add_file_script_selected(hash);
                    break;
                case "child":
                    file.add_file_script_selected(hash);
                    file.add_file_script_selected_child(hash);
                    break;
                default:
                    file.remove_file_script(hash);
            }
        });
    },


    // remove
    remove : function(hash, path_to_remove) {
              file.add_file_script_loading(hash);
        api = this.api_session_rm(path_to_remove);
        api.success(function(data) {
            file.remove_file_script(hash);
        });
        api.error(function() {
            file.add_file_script_error(hash);
        });
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
