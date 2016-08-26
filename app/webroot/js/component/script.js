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

    // api - session - display
    api_session_display : function() {
        var url = "php/api/session/display.php?filename=" + $("#script-export-input-filename").val();
        window.location = url
    },

    // api - session - download
    api_session_download : function() {
        var url = "php/api/session/download.php?filename=" + $("#script-export-input-filename").val();
        window.location = url
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

    // api - session - get
    api_session_get : function() {
        return $.ajax({
            type:       "GET",
            url:        "php/api/session/get.php",
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

    // api - session - reset
    api_session_reset : function() {
        return $.ajax({
            type:       "GET",
            url:        "php/api/session/reset.php",
        });
    },

    // api - session - size
    api_session_size : function() {
        return $.ajax({
            type:       "GET",
            url:        "php/api/session/size.php",
        });
    },

    // api - session - sample
    api_session_sample : function() {
        return $.ajax({
            type:       "GET",
            url:        "php/api/session/sample.php",
        });
    },

    // api - set - session - filename
    api_set_session_filename : function(filename_to_set) {
        return $.ajax({
            type:       "GET",
            data:       { filename : filename_to_set },
            url:        "php/api/session/set.php",
        });
    },

    // api - set - session - header
    api_set_session_header : function(header_to_set) {
        return $.ajax({
            type:       "GET",
            data:       { header : header_to_set },
            url:        "php/api/session/set.php",
        });
    },

    // api - set - session - interpreter
    api_set_session_interpreter : function(interpreter_to_set) {
        return $.ajax({
            type:       "GET",
            data:       { interpreter : interpreter_to_set },
            url:        "php/api/session/set.php",
        });
    },

    // api - set - session - footer
    api_set_session_footer : function(footer_to_set) {
        return $.ajax({
            type:       "GET",
            data:       { footer : footer_to_set },
            url:        "php/api/session/set.php",
        });
    },

    // api - set - session - path - prefix
    api_set_session_path_prefix : function(prefix_to_set) {
        return $.ajax({
            type:       "GET",
            data:       { path_prefix : prefix_to_set },
            url:        "php/api/session/set.php",
        });
    },

    // api - set - session - path - suffix
    api_set_session_path_suffix : function(suffix_to_set) {
        return $.ajax({
            type:       "GET",
            data:       { path_suffix : suffix_to_set },
            url:        "php/api/session/set.php",
        });
    },

    // api - session - ready
    api_session_ready : function() {
        return $.ajax({
            type:       "GET",
            url:        "php/api/session/ready.php",
        });
    },

    // api - unset - session - filename
    api_unset_session_filename : function(filename_to_unset) {
        return $.ajax({
            type:       "GET",
            data:       { filename : filename_to_unset },
            url:        "php/api/session/unset.php",
        });
    },

    // api - unset - session - header
    api_unset_session_header : function(header_to_unset) {
        return $.ajax({
            type:       "GET",
            data:       { header : header_to_unset },
            url:        "php/api/session/unset.php",
        });
    },

    // api - unset - session - interpreter
    api_unset_session_interpreter : function(interpreter_to_unset) {
        return $.ajax({
            type:       "GET",
            data:       { interpreter : interpreter_to_unset },
            url:        "php/api/session/unset.php",
        });
    },

    // api - unset - session - footer
    api_unset_session_footer : function(footer_to_unset) {
        return $.ajax({
            type:       "GET",
            data:       { footer : footer_to_unset },
            url:        "php/api/session/unset.php",
        });
    },

    // api - unset - session - path - prefix
    api_unset_session_path_prefix : function(prefix_to_unset) {
        return $.ajax({
            type:       "GET",
            data:       { path_prefix : prefix_to_unset },
            url:        "php/api/session/unset.php",
        });
    },

    // api - unset - session - path - suffix
    api_unset_session_path_suffix : function(suffix_to_unset) {
        return $.ajax({
            type:       "GET",
            data:       { path_suffix : suffix_to_unset },
            url:        "php/api/session/unset.php",
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
        this.refresh_filename();
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
        this.ready_export();
    },

    // ready - export
    ready_export : function() {
        api = this.api_session_get();
        api.success(function(data) {
            $("#script-export-input-filename").val(data['script']['filename']);
            $("#script-export-input-header").val(data['script']['header']);
            $("#script-export-input-interpreter").val(data['script']['interpreter']);
            $("#script-export-input-path-prefix").val(data['script']['path']['prefix']);
            $("#script-export-input-path-suffix").val(data['script']['path']['suffix']);
            $("#script-export-input-footer").val(data['script']['footer']);
        });
        this.refresh_session_sample();
    },




    // refresh - file
    refresh_file : function(hash, path_to_check) {
              file.add_file_script_loading(hash);
        api = this.api_session_exists(path_to_check);
        api.success(function(data) {
            switch(data["exists"]){
                case "ancestor":
                    file.add_file_script_selected_ancestor(hash);
                    file.remove_file_script(hash);
                    break;
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


    // refresh - filename
    refresh_filename : function() {
        if( $('#script-export-input-filename').val().length > 0 ){
            $('#script-export-download').show();
        } else {
            $('#script-export-download').hide();
        }
    },


    // refresh - session - sample
    refresh_session_sample : function() {
        api = this.api_session_sample();
        api.success(function(data) {
            $("#script-export-path").addClass("success");
            $("#script-export-path").removeClass("success");
            $("#script-export-path-sample").html(data);
        });
        api.error(function(data) {
            $("#script-export-path").addClass("error");
            $("#script-export-path").removeClass("error");
            $("#script-export-path-sample").html(data);
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




    // reset
    reset : function() {
        api = this.api_session_reset();
        api.success(function() {
            location.reload();
        });
    },



    /** | set **/

        // set - session - fileename
        set_session_filename : function(input) {
            this_copy = this;
            $(input).removeClass("success");
            api = this.api_set_session_filename($(input).val());
            api.success(function(data) {
                $(input).addClass("success");
                $(input).removeClass("error");
                this_copy.refresh_filename();
            });
            api.error(function() {
                $(input).addClass("error");
                $(input).removeClass("success");
                this_copy.api_unset_session_filename("");
                this_copy.refresh_filename();
            });
        },

        // set - session - header
        set_session_header : function(input) {
            this_copy = this;
            api = this.api_set_session_header($(input).val());
            api.success(function(data) {
                $(input).addClass("success");
                $(input).removeClass("error");
            });
            api.error(function() {
                $(input).addClass("error");
                $(input).removeClass("success");
                unset = this_copy.api_unset_session_header("");
            });
        },

        // set - session - interpreter
        set_session_interpreter : function(input) {
            this_copy = this
            api = this.api_set_session_interpreter($(input).val());
            api.success(function(data) {
                $(input).addClass("success");
                $(input).removeClass("error");
            });
            api.error(function() {
                $(input).addClass("error");
                $(input).removeClass("success");
                unset = this_copy.api_unset_session_interpreter("");
            });
        },

        // set - session - footer
        set_session_footer : function(input) {
            this_copy = this;
            api = this.api_set_session_footer($(input).val());
            api.success(function(data) {
                $(input).addClass("success");
                $(input).removeClass("error");
            });
            api.error(function() {
                $(input).addClass("error");
                $(input).removeClass("success");
                unset = this_copy.api_unset_session_footer("");
            });
        },

        // set - session - path - prefix
        set_session_path_prefix : function(input) {
            this_copy = this;
            api = this.api_set_session_path_prefix($(input).val());
            api.success(function(data) {
                $(input).addClass("success");
                $(input).removeClass("error");
                this_copy.refresh_session_sample();
            });
            api.error(function() {
                $(input).addClass("error");
                $(input).removeClass("success");
                unset = this_copy.api_unset_session_path_prefix("");
            });
        },

        // set - session - path - suffix
        set_session_path_suffix : function(input) {
            this_copy = this;
            api = this.api_set_session_path_suffix($(input).val());
            api.success(function(data) {
                $(input).addClass("success");
                $(input).removeClass("error");
                this_copy.refresh_session_sample();
            });
            api.error(function() {
                $(input).addClass("error");
                $(input).removeClass("success");
                unset = this_copy.api_unset_session_path_suffix("");
            });
        },

        // set - section - reset
        set_session_reset : function() {
            $("#script-export input").removeClass("error");
            $("#script-export input").removeClass("success");
            $("#script-export input").val("");
            $("#script-export textarea").removeClass("error");
            $("#script-export textarea").removeClass("success");
            $("#script-export textarea").val("");
            $("#script-export").removeClass("error");
            $("#script-export").removeClass("success");
            $("#script-export").val("");
            $("#script-export-path").removeClass("error");
            $("#script-export-path").removeClass("success");
            this.api_unset_session_filename("");
            this.api_unset_session_header("");
            this.api_unset_session_interpreter("");
            this.api_unset_session_path_prefix("");
            this.api_unset_session_path_suffix("");
            this.api_unset_session_footer("");
            this.refresh_filename();
            this.refresh_session_sample();
        },

    /** set | **/


    /** | view **/

        // view - reset
        view_reset : function() {
            $("#files .script").addClass("hidden");
            $("#nav-display-script").addClass("hidden");
            $("#nav-display-script").removeClass("cyan");
            $("#nav-display-script").removeClass("darken-1");
            $("#nav-toggle-script").removeClass("cyan");
            $("#nav-toggle-script-export").addClass("hidden");
            $("#nav-toggle-script-export a").removeClass("cyan");
            $("#nav-toggle-script-reset").addClass("hidden");
            $("#nav-toggle-script-reset a").removeClass("cyan");
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
            $("#nav-toggle-script-reset").removeClass("hidden");
            $("#nav-toggle-script-reset a").addClass("cyan");
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

    /** view | **/


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

    // nav - script - reset - click
    $("#nav-toggle-script-reset").click(function() {
        script.reset();
    });

    // nav - script - export - click
    $("#nav-toggle-script-export").click(function() {
        if( script.enabled_export ){
            script.disable_export();
        } else {
            script.enable_export();
        }
    });

    // nav - script - export - click - reset
    $("#script-export-nav-reset").click(function() {
        script.set_session_reset();
    });

    // nav - script - export - click - close
    $("#script-export-nav-close").click(function() {
        script.disable_export();
    });

    // script - export - display
    $("#script-export-display").click(function() {
        script.api_session_display();
    });

    // script - export - download
    $("#script-export-download").click(function() {
        script.api_session_download();
    });

    // script - export - filename - input - on - change
    $('#script-export-input-filename').bind('input propertychange', function() {
        script.set_session_filename(this);
    });

    // script - export - footer - input - on - change
    $('#script-export-input-footer').bind('input propertychange', function() {
        script.set_session_footer(this);
    });

    // script - export - interpreter - input - on - change
    $('#script-export-input-interpreter').bind('input propertychange', function() {
        script.set_session_interpreter(this);
    });

    // script - export - header - input - on - change
    $('#script-export-input-header').bind('input propertychange', function() {
        script.set_session_header(this);
    });

    // script - export - path - prefix - input - on - change
    $('#script-export-input-path-prefix').bind('input propertychange', function() {
        script.set_session_path_prefix(this);
    });

    // script - export - path - suffix - input - on - change
    $('#script-export-input-path-suffix').bind('input propertychange', function() {
        script.set_session_path_suffix(this);
    });




/** listener | **/
