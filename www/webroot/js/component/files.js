/** | class **/
var files = {




        // clear
        clear : function() {
            $("#files").empty();
        },


        // refresh
        refresh : function() {
            this.clear();
            $.ajax({
                        type:       "POST",
                        data:       $('#path form').serialize(),
                        url:        "php/api/ls.php",
                        success:    function(data) {
                            path.display_200();
                            console.log(data);
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
