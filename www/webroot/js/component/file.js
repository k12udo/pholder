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


    // get - files
    get_files : function() {
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
        this.get_files();
    }


}
/** class | **/




/** | listener **/


    // file - click
    $(document).on('click', '.file', function(){ 
        if( $(this).attr("data-mime") == "directory" ){
            path.set_path($(this).attr("data-path"));
        } else {
            file.download_file($(this).attr("data-path"));
        }
    });


/** listener | **/
