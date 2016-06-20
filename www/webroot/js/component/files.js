/** | class **/
var files = {




        // add - file
        add_file : function(icon, name, path){
            $("#files-list").append(
                '<tr class="file" data-path="' + path + '">' +
                    '<td class="">' +
                        '<span class="icon">' + icon + '</span>' +
                        '<span class="name">' + name + '</span>' +
                    '</td>' +
                '</tr>'
            );
        },


        // clear
        clear : function() {
            $("#files-list").empty();
        },


        // refresh
        refresh : function() {
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
                                    data[index]['name'],
                                    data[index]['path']
                                );
                            }
                        },
                        error:      function() {
                            path.display_400();
                        }
            });
        }




}
/** class | **/




/** | listener **/
/** listener | **/
