/** | class **/
var search =  {


    // display - 000 - reset
    display_000 : function() {
        $("#search-input").removeClass("e200");
        $("#search-input").removeClass("e400");
        $("#search-input").removeClass("red-text");
        $("#search-input").removeClass("green-text");
        $("#search-input-label").removeClass("red-text");
        $("#search-input-label").removeClass("green-text");;
    },

    // display - 200 - success
    display_200 : function() {
        this.display_000();
        $("#search-input").addClass("e200");
        $("#search-input").addClass("green-text");
        $("#search-input-label").addClass("green-text");
    },

    // display - 400 - error
    display_400 : function() {
        this.display_000();
        $("#search-input").addClass("e400");
        $("#search-input").addClass("red-text");
        $("#search-input-label").addClass("red-text");
    },


    // on - change
    on_change : function(path_to_file, search_term) {
        if( path_to_file != "" && search_term != "" ){
            if( file.find(path_to_file, search_term) ){
                this.display_200();
            } else {
                this.display_400();
            }
        } else {
            this.display_200();
        }
    },


    // ready
    ready : function() {
    },


    // view - hide
    view_hide : function() {
        $("#search").addClass("hidden");
        $("#nav-toggle-search").prop("active", false);
        $("#nav-toggle-search").removeClass("green");
    },

    // view - show
    view_show : function() {
        $("#search").removeClass("hidden");
        $("#search-input").focus();
        $("#nav-toggle-search").addClass("green");
    }


}
/** class | **/




/** | listener **/


    // search - input - on - change
    $('#search-input').bind('input propertychange', function() {
        search.on_change( $("#path-input").val(), $(this).val() );
    });

    // search - nav - click
    $("#nav-toggle-search").click(function() {
        if( $("#search").hasClass("hidden") ){
            search.view_show();
            setTimeout(function() {
                $("#search-input").focus();
            }, 500);
        } else {
            search.view_hide();
        }
    });


/** listener | **/
