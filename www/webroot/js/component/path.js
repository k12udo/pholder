/** | class **/
var path =  {


    // display - 000 - reset
    display_000 : function() {
        $("#input-path").removeClass("e200");
        $("#input-path").removeClass("e400");
        $("#input-path").removeClass("red-text");
        $("#input-path").removeClass("green-text");
        $("#input-path-label").removeClass("red-text");
        $("#input-path-label").removeClass("green-text");;
    },

    // display - 200 - success
    display_200 : function() {
        this.display_000();
        $("#input-path").addClass("e200");
        $("#input-path").addClass("green-text");
        $("#input-path-label").addClass("green-text");
    },

    // display - 400 - error
    display_400 : function() {
        this.display_000();
        $("#input-path").addClass("e400");
        $("#input-path").addClass("red-text");
        $("#input-path-label").addClass("red-text");
    },


    // on - change
    on_change : function(path) {
        if( path != "" ){
            if( files.refresh(path) ){
                this.display_200();
            } else {
                this.display_400();
            }
        } else {
            this.display_200();
        }
    },


    // view - hide
    view_hide : function() {
        $("#path").addClass("hidden");
        $("#nav-toggle-path").prop("active", false);
    },

    // view - show 
    view_show : function() {
        $("#path").removeClass("hidden");
    }


}
/** class | **/




/** | listener **/


    // path - input - on - change
    $('#input-path').bind('input propertychange', function() {
        path.on_change( $(this).val() );
    });

    // path - nav - click
    $("#nav-toggle-path").click(function() {
        if( $("#path").hasClass("hidden") ){
            path.view_show();
        } else {
            path.view_hide();
        }
    });


/** listener | **/