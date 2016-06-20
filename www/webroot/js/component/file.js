/** | class **/
var file = {


    // add - file
    add_file : function(icon, mime, name, path){
        $("#files-list").append(
            '<tr class="file" data-path="' + path + '" data-mime="' + mime + '">' +
                '<td class="">' +
                    '<i class="small material-icons">' + icon + '</i>' +
                    '<span class="name">' + name + '</span>' +
                '</td>' +
            '</tr>'
        );
    },


    // api - download - file
    api_download_file : function(path_to_file) {
        var this_copy = this;
        var url = "php/api/download.php?path=" + path_to_file;
        window.location = url
    },

    // api - get - files
    api_get_files : function() {
        var directory = $("#input-path").val();
        var this_copy = this;
        this.clear();
        $.ajax({
                    type:       "POST",
                    data:       $('#path form').serialize(),
                    url:        "php/api/ls.php",
                    success:    function(data) {
                                    path.display_200();
                                    for( index in data ){
                                        this_copy.add_file(
                                            data[index]['icon'],
                                            data[index]['mime'],
                                            data[index]['name'],
                                            data[index]['path']
                                        );
                                    }
                                },
                    error:      function() {
                                   path.display_400();
                                }
        });
    },


    // clear
    clear : function() {
        $("#files-list").empty();
    },


    // refresh
    refresh : function() {
        this.clear();
        this.api_get_files();
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
