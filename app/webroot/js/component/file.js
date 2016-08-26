/** | class **/
var file = {




    // global(s)
    size : true,

    // global(s) - active
    active_limit    : 50,
    active_offset   : 0,
    acttve_path     : null,




    // add - file(s)
    add_files : function(files){
        for( index in files ){
            this.add_file(
                files[index]['hash'],
                files[index]['icon'],
                files[index]['name'],
                files[index]['type'],
                files[index]['path']
            );
        }
    },

    // add - file
    add_file : function(hash, icon, name, type, path_to_file){

        // ? - type - dir
        if( type == "directory" ){ dir = true;  }
        else                     { dir = false; }

        // ? - script - enabled
        if( script.enabled ){ script_enabled = "";      }
        else                { script_enabled = "hidden" }

        // remove - existing - html
        $('#' + hash).remove();

        // ? - path - root
        if( path.root == path.current ){
            if( path.root.indexOf(path_to_file) !== -1 ){
                return false;
            }
        }

        // append - html
        $("#files-list").append(
            '<tr id="' + hash + '" class="file" data-path="'+ path_to_file +'" data-directory="' + dir + '" >' +
                '<td class="icon">' +
                    '<i class="small material-icons">' + icon + '</i>' +
                '</td>' +
                '<td class="name">' +
                    '<span class="name">' + name + '</span>' +
                '</td>' +
                '<td class="size">' +
                '</td>' +
                '<td class="script script-add ' + script_enabled + '">' +
                    '<i class="small material-icons">add</i>' +
                '</td>' +
            '</tr>'
        );

        // append - ignore
        if( name == ".." ){
            this.add_file_ignore(hash);
            return true;
        }

        // append - file - size
        if( file.size == true && dir == false ){
            this.add_file_size(hash, path_to_file);
        } else {
            $("#" + hash + " .size").empty();
        }

        // script - refresh - file
        script.refresh_file(hash, path_to_file);

    },

    // add - file - ignore
    add_file_ignore : function(hash) {
        $('#' + hash + ' .script i').remove();
        $('#' + hash + ' .script').removeClass("script-add");
        $('#' + hash + ' .size'  ).empty();
    },

    // add - file - script - loading
    add_file_script_loading : function(hash) {
        $("#" + hash + " .script").html(
            '<div class="progress">' +
                '<div class="indeterminate"></div>' +
            '</div>'
        );
    },

    // add - file - script - ancestor
    add_file_script_selected_ancestor : function(hash) {
        $("#" + hash + " .script").removeClass("script-add");
        $("#" + hash + " .script").removeClass("script-remove");
        $("#" + hash).addClass("script-selected-ancestor");
    },

    // add - file - script - selected
    add_file_script_selected : function(hash) {
        $("#" + hash).addClass("script-selected");
        $("#" + hash + " .script").addClass("script-remove");
        $("#" + hash + " .script").removeClass("script-add");
        $("#" + hash + " .script").html('<i class="small material-icons">remove</i>');
    },

    // add - file - script - child
    add_file_script_selected_child : function(hash) {
        $("#" + hash + " .script").removeClass("script-add");
        $("#" + hash + " .script").removeClass("script-remove");
        $("#" + hash).addClass("script-selected-child");
        $("#" + hash + " .script").html('<i class="small material-icons">check</i>');
    },

    // add - file - script - error
    add_file_script_error : function(hash) {
        $("#" + hash).addClass("script-selected-error");
        $("#" + hash + " .script").html('<i class="small material-icons">error_outline</i>');
    },

    // add - file - size
    add_file_size : function(hash, path_to_file) {
        $('#' + hash + ' .size').empty();
        $('#' + hash + ' .size').append(
            '<div class="progress">' +
                '<div class="indeterminate"></div>' +
            '</div>'
        );
        var api = this.api_get_file_size(path_to_file);
            api.success(function(data) {
                $('#' + hash + ' .size').empty();
                $('#' + hash + ' .size').append(
                    data['size_human']
                );
            });
            api.error(function(data) {
                $('#' + hash + ' .size').empty();
                $('#' + hash + ' .size').append(
                    '<div class="progress red">' +
                        '<div class="indeterminate red"></div>' +
                    '</div>'
                );
            });
    },

    // remove - file - script
    remove_file_script : function(hash) {
        $("#" + hash).removeClass("script-selected");
        $("#" + hash).removeClass("script-selected-child");
        $("#" + hash).removeClass("script-selected-error");
        $("#" + hash + " .script").addClass("script-add");
        $("#" + hash + " .script").removeClass("script-remove");
        $("#" + hash + " .script").html('<i class="small material-icons">add</i>');
    },


    // api - download - file
    api_download_file : function(path_to_file) {
        var this_copy = this;
        var url = "php/api/download.php?path=" + path_to_file;
        window.location = url
    },

    // api - find - files
    api_find_files : function(path_to_file, search_term) {
        return $.ajax({
                    type:       "POST",
                    data:       {
                                    path : path_to_file,
                                    term : search_term
                                },
                    url:        "php/api/find.php",
                    success:    function(data) {
                                    search.display_200();
                                },
                    error:      function() {
                                    search.display_400();
                                }
        });
    },

    // api - get - files
    api_get_files : function(path_to_file) {
            var  thi = this;
            this.active        = true;
        if( this.active_path  == path_to_file ){
            this.active_offset = this.active_limit + this.active_offset;
        } else {
            this.active_path   = path_to_file;
            this.active_offset = 0;
        }
        return $.ajax({
                    type:       "POST",
                    data:       {
                                    path    :        path_to_file,
                                    limit   :   this.active_limit,
                                    offset  :   this.active_offset
                                },
                    url:        "php/api/ls.php",
                    success:    function(data) {
                                    path.display_200();
                                    thi.active = false;
                                },
                    error:      function() {
                                    path.display_400();
                                    thi.active = false;
                                }
        });
    },

    // api - get - file - size
    api_get_file_size : function(path_to_file) {
        return $.ajax({
                    type:       "GET",
                    data:       { path : path_to_file },
                    url:        "php/api/du.php",
                    success:    function(data) {},
                    error:      function() {}
        });
    },


    // clear
    clear : function() {
        this.view_reset();
    },


    // find
    find : function(path_to_file, search_term) {
        this.view_reset();
        this.view_loading();
        var this_copy = this
            api = this.api_find_files(path_to_file, search_term);
            api.success(function(data) {
                this_copy.add_files(data);
                this_copy.view_loading_loaded();
            });
            api.error(function(data) {
                this_copy.view_loading_error();
            });
    },


    // paginate
    paginate : function() {
        this.refresh( this.active_path, false );
    },


    // refresh
    refresh : function(path_to_file, reset = true) {
        if( reset ){
            this.view_reset();
            this.view_loading();
        }
        var this_copy = this
        var api = this.api_get_files(path_to_file)
            api.success(function(data) {
                if( data.length == this_copy.active_limit ){
                    setTimeout( function() {
                        this_copy.refresh( this_copy.active_path, false );
                    }, 100);
                } else {
                    this_copy.view_loading_loaded();
                }
                this_copy.add_files(data)
            });
            api.error(function(data) {
                this_copy.view_loading_error();
            });
    },




    // toggle - size
    toggle_size : function() {
        if( this.size ){
            this.size = false;
            $("#nav-toggle-file-size").removeClass("teal");
        } else {
            this.size = true;
            $("#nav-toggle-file-size").addClass("teal");
        }
        this.refresh( $("#path-input").val() );
    },



    // view - reset
    view_reset : function() {
        $("#files #files-list").empty();
        $("#files .loading").addClass("hidden");
        $("#files .loading .progress").removeClass("red");
        $("#files .loading .progress div").removeClass("red");
    },

    // view - loading
    view_loading : function() {
        $("#files .loading").removeClass("hidden");
    },

    // view - loading - error
    view_loading_error : function() {
        $("#files .loading .progress").addClass("red");
        $("#files .loading .progress div").addClass("red");
        $("#files .loading .progress div").addClass("lighten-2");
    },

    // view - loading - loaded
    view_loading_loaded : function() {
        $("#files .loading").addClass("hidden");
    },


}
/** class | **/




/** | listener **/


    // file - click
    $(document).on('click', '.file', function(){
        if($(this).attr("data-directory") == "true"){
            path.set_path($(this).attr("data-path"));
        } else {
            file.api_download_file( $(this).attr("data-path") );
        }
    });

    // file - click - script - add
    $(document).on('click', '.file .script-add', function(){
                    row = $(this).parent();
        script.add( row.attr("id"), row.attr("data-path") );
        return false;
    });

    // file - click - script - remove
    $(document).on('click', '.file .script-remove', function(){
                       row = $(this).parent();
        script.remove( row.attr("id"), row.attr("data-path") );
        return false;
    });

    // nav - click
    $("#nav-toggle-file-size").click(function() {
        file.toggle_size();
    });


/** listener | **/
