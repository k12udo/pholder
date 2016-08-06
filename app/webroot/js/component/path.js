/** | class **/
var path =  {




    // global(s)
    root    : null,
    current : null,



    // api - get - root
    api_get_root : function() {
        return $.ajax({
            type:       "GET",
            url:        "php/api/root.php"
        });
    },


    // display - 000 - reset
    display_000 : function() {
        $("#path-input").removeClass("e200");
        $("#path-input").removeClass("e400");
        $("#path-input").removeClass("red-text");
        $("#path-input").removeClass("green-text");
        $("#path-input-label").removeClass("red-text");
        $("#path-input-label").removeClass("green-text");;
    },

    // display - 200 - success
    display_200 : function() {
        this.display_000();
        $("#path-input").addClass("e200");
        $("#path-input").addClass("green-text");
        $("#path-input-label").addClass("green-text");
    },

    // display - 400 - error
    display_400 : function() {
        this.display_000();
        $("#path-input").addClass("e400");
        $("#path-input").addClass("red-text");
        $("#path-input-label").addClass("red-text");
    },


    // on - change
    on_change : function(path) {

        // ? - empty
        if( path == "" ){
            path = this.root
        }

        // ? - valid - root
        if( ! path.startsWith(this.root) ){
            path = this.root;
        }

        // ? - file - refresh
        if( file.refresh(path) ){
            this.display_200();
        } else {
            this.display_400();
        }

        // update - location - if not path
        if( window.location.hash != path ){
            window.location.hash  = path;
                   document.title = 'pholder#' + path;
        }

        // refresh
        $("#path-input").val(path);
        breadcrumb.refresh(path);
    },


    // ready
    ready : function() {

            // copy - this
            this_copy = this;

            // get - hash
            hash = window.location.href.split('#')[1];
        if( hash == undefined ){ hash = "/"; }

        // api - get/set - root
        api = this.api_get_root();
        api.success(function(root) {
            root = root[0];
            if( ! hash.startsWith(root) ){
                hash = root;
            }
            this_copy.root = root;
            this_copy.set_path(hash);
            window.location.hash = hash;
        });

    },


    // set - path
    set_path : function(path_to_file) {
        $("#path-input").val(path_to_file);
        this.current = path_to_file;
        this.on_change(path_to_file);
    },


    // view - hide
    view_hide : function() {
        $("#path").addClass("hidden");
        $("#nav-toggle-path").prop("active", false);
        $("#nav-toggle-path").removeClass("light-blue");
        $("#nav-toggle-path").removeClass("darken-3");
    },

    // view - show
    view_show : function() {
        $("#path").removeClass("hidden");
        $("#path-input").focus();
        $("#nav-toggle-path").addClass("light-blue");
        $("#nav-toggle-path").addClass("darken-3");
    }


}
/** class | **/




/** | listener **/


    // path - hash - on - change
    $(window).on('hashchange',function(){ 
            hash = window.location.href.split('#')[1];
        if( hash != "" ){
            path.set_path(hash);
        }
    });

    // path - input - on - change
    $('#path-input').bind('input propertychange', function() {
        path.on_change( $(this).val() );
    });

    // path - nav - click
    $("#nav-toggle-path").click(function() {
        if( $("#path").hasClass("hidden") ){
            path.view_show();
            setTimeout(function() {
                $("#path-input").val( $("#path-input").val() );
                $("#path-input").focus();
            }, 500);
        } else {
            path.view_hide();
        }
    });


/** listener | **/
