/** | class **/
var file = {


    // add - file(s)
    add_files : function(files){
        console.log(files);
        for( index in files ){
            this.add_file(
                files[index]['hash'],
                files[index]['icon'],
                files[index]['mime'],
                files[index]['name'],
                files[index]['path']
            );
        }
    },

    // add - file
    add_file : function(hash, icon, mime, name, path_to_file){
        $("#files-list").append(
            '<tr id="' + hash + '" class="file" data-path="'+ path_to_file +'" data-mime="' + mime + '">' +
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
        if( $(this).attr("data-mime") == "directory" ){
            path.set_path($(this).attr("data-path"));
        } else {
            file.api_download_file($(this).attr("data-path"));
        }
    });


/** listener | **/
