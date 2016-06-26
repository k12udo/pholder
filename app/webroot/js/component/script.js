/** | class **/
var script =  {




    enabled         :  false,
    enabled_export  :  false,




    // add
    add : function(hash, path_to_add) {
        file.add_file_script_loading(hash);
        this_copy = this;
        api = this.api_session_add(path_to_add);
        api.success(function(data) {
            file.add_file_script_selected(hash);
            this_copy.refresh_nav();
        });
        api.error(function() {
            file.add_file_script_error(hash);
        });
    },




    // api - session - add
    api_session_add : function(path_to_add) {
        return $.ajax({
            type:       "GET",
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
            type:       "GET",
            data:       { path : path_to_check },
            url:        "php/api/session/exists.php",
        });
    },

    // api - session - remove
    api_session_remove : function(path_to_remove) {
        return $.ajax({
            type:       "GET",
            data:       { path : path_to_remove },
            url:        "php/api/session/remove.php",
        });
    },

    // api - session - size
    api_session_size : function(path_to_remove) {
        return $.ajax({
            type:       "GET",
            url:        "php/api/session/size.php",
        });
    },




    // disable
    disable : function() {
        this.view_reset();
        this.enabled = false;
    },

    // enable - export
    disable_export : function() {
        this.view_export_reset();
        this.enabled_export = false;
    },




    // enable
    enable : function() {
        this.view_enabled();
        this.enabled = true;
    },

    // enable - export
    enable_export : function() {
        this.view_export_enabled();
        this.enabled_export = true;
    },




    // ready
    ready : function() {
        this_copy = this;
        this_copy.refresh_nav();
        api = this.api_session_empty();
        api.success(function(data) {
            if(data['empty'] != true){
                this_copy.enable();
            }
        });
    },




    // refresh - file
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

    // refresh - nav
    refresh_nav : function() {
              this_copy = this;
              this_copy.view_nav_loading();
        api = this.api_session_size();
        api.success(function(data) {
            this_copy.view_nav_size(
                data['bytes'],
                data['human']
            );
        });
    },




    // remove
    remove : function(hash, path_to_remove) {
              file.add_file_script_loading(hash);
              this_copy = this;
        api = this.api_session_remove(path_to_remove);
        api.success(function(data) {
            file.remove_file_script(hash);
            this_copy.refresh_nav();
        });
        api.error(function() {
            file.add_file_script_error(hash);
        });
    },




    // view - reset
    view_reset : function() {
        $("#files .script").addClass("hidden");
        $("#nav-display-script").addClass("hidden");
        $("#nav-display-script").removeClass("cyan");
        $("#nav-display-script").removeClass("darken-1");
        $("#nav-toggle-script").removeClass("cyan");
        $("#nav-toggle-script-export").addClass("hidden");
        $("#nav-toggle-script-export a").removeClass("cyan");
    },

    // view - enabled
    view_enabled : function() {
        this.view_reset();
        $("#files .script").removeClass("hidden");
        $("#nav-display-script").addClass("cyan");
        $("#nav-display-script").addClass("darken-1");
        $("#nav-display-script").removeClass("hidden");
        $("#nav-toggle-script").addClass("cyan");
        $("#nav-toggle-script-export").removeClass("hidden");
        $("#nav-toggle-script-export a").addClass("cyan");
    },

    // view - nav - loading
    view_nav_loading : function() {
    },

    // view - nav - size
    view_nav_size : function(bytes, human) {
        $("#nav-display-script").html(
            '<span class"size">' + human + '</span>'
        );
    },




    // view - export - reset
    view_export_reset : function() {
        $("body").css("overflow", "auto");
        $("#script-export").addClass("hidden");
    },

    // view - export - enabled
    view_export_enabled : function() {
        this.view_export_reset();
        $("body").css("overflow", "hidden");
        $("#script-export").removeClass("hidden");
    }




}
/** class | **/




/** | listener **/


    // nav - script - click
    $("#nav-toggle-script").click(function() {
        if( script.enabled ){
            script.disable();
        } else {
            script.enable();
        }
    });

    // nav - script - export - click
    $("#nav-toggle-script-export").click(function() {
        if( script.enabled_export ){
            script.disable_export();
        } else {
            script.enable_export();
        }
    });

    // nav - script - export - click
    $("#script-export-nav-close").click(function() {
        script.disable_export();
    });


/** listener | **/
