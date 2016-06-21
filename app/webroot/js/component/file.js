/** | class **/
var file = {


    // add - file(s)
    add_files : function(files){
        console.log(files);
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
        $('#' + hash).remove();
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
            '</tr>'
        );
        if( name == ".." ){
            $('#' + hash + ' .size').empty();
        } else {
            this.add_file_size(hash, path_to_file);
        }
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
        $("#files-list").empty();
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
        this.clear();
        var this_copy = this
        var api = this.api_get_files(path_to_file)
            api.success(function(data) {
                this_copy.add_files(data);
            });
    }


}
/** class | **/




/** | listener **/


    // file - click
    $(document).on('click', '.file', function(){ 
        if( $(this).attr("data-directory") == "true" ){
            path.set_path($(this).attr("data-path"));
        } else {
            file.api_download_file($(this).attr("data-path"));
        }
    });


/** listener | **/
