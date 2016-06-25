/** | class **/
var file = {


    // add - file(s)
    add_files : function(files){
        for( index in files ){
            this.add_file(
                files[index]['dir'],
                files[index]['hash'],
                files[index]['icon'],
                files[index]['name'],
                files[index]['path']
            );
        }
    },

    // add - file
    add_file : function(dir, hash, icon, name, path_to_file){

        // ? - script - enabled
        if( script.enabled ){ script_enabled = "";      }
        else                { script_enabled = "hidden" }

        // remove - existing - html
        $('#' + hash).remove();

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
                    '<div class="progress">' +
                        '<div class="indeterminate"></div>' +
                    '</div>' +
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
        this.add_file_size(hash, path_to_file);

        // script - refresh - file - exists
        script.refresh_file_exists(hash, path_to_file);

    },

    // add - file - ignore
    add_file_ignore : function(hash) {
        $('#' + hash + ' .script i').remove();
        $('#' + hash + ' .script').removeClass("script-add");
        $('#' + hash + ' .size'  ).empty();
    },

    // add - file - script - loading
    add_file_script_loading : function(hash) {
        $("#" + hash + " .script i").html(
            '<div class="preloader-wrapper small active">' +
                '<div class="spinner-layer spinner-blue-only">' +
                    '<div class="circle-clipper left">' +
                        '<div class="circle"></div>' +
                    '</div>' +
                    '<div class="gap-patch">' +
                        '<div class="circle"></div>' +
                    '</div>' +
                    '<div class="circle-clipper right">' +
                        '<div class="circle"></div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
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
        var api = this.api_get_file_size(path_to_file);
            api.success(function(data) {
                $('#' + hash + ' .size').empty();
                $('#' + hash + ' .size').append(
                    data['size']
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
        return $.ajax({
                    type:       "POST",
                    data:       { path : path_to_file },
                    url:        "php/api/ls.php",
                    success:    function(data) {
                                    path.display_200();
                                },
                    error:      function() {
                                   path.display_400();
                                }
        });
    },

    // api - get - file - size
    api_get_file_size : function(path_to_file) {
        return $.ajax({
                    type:       "POST",
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
        this.clear();
        var this_copy = this
            api = this.api_find_files(path_to_file, search_term);
            api.success(function(data) {
                this_copy.add_files(data);
            });
    },


    // refresh
    refresh : function(path_to_file) {
        this.view_reset();
        this.view_loading();
        var this_copy = this
        var api = this.api_get_files(path_to_file)
            api.success(function(data) {
                this_copy.add_files(data)
                this_copy.view_loading_loaded();
            });
            api.error(function(data) {
                this_copy.view_loading_error();
            });
    },


    // view - reset
    view_reset : function() {
        $("#files #files-list").empty();
        $("#files .loading").addClass("hidden");
        $("#files .loading").removeClass("red");
    },

    // view - loading
    view_loading : function() {
        $("#files .loading").removeClass("hidden");
    },

    // view - loading - error
    view_loading_error : function() {
        $("#files .loading").addClass("red");
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


/** listener | **/
