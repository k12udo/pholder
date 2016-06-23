/** | class **/
var breadcrumb =  {


    // clear
    clear : function() {
        $("#breadcrumb .crumbs").empty();
    },


    // get - crumbs - from - path
    get_crumbs_from_path : function(path_to_crumb) {
        var crumbs      = [];
            crumbs[0]   = { "pathname":"/", "filename":"/" };
        var pathnames   = ["/"];
        var parts       = path_to_crumb.split('/');
            parts.forEach( function(filename) {
                if( filename != "" ){
                    if( pathnames.slice(-1)[0] == "/" ){
                        pathname = "/" + filename;
                    } else {
                        pathname = pathnames.slice(-1)[0] + "/" + filename;
                    }
                    crumbs.push({"pathname": pathname,"filename": filename});
                    pathnames.push(pathname);
                }
            });
        return crumbs;
    },


    // ready
    ready : function() {
        this.update( $("#path-input").val() );
        this.view_show();
    },


    // update
    update : function(path_to_crumb) {
                     this.clear();
        var crumbs = this.get_crumbs_from_path(path_to_crumb);
            crumbs.forEach( function(crumb){
                $("#breadcrumb .crumbs").append(
                    '<a href="#' + crumb['pathname'] + '" class="breadcrumb">' + crumb['filename'] + '</a>'
                );
            });
    },


    // view - reset
    view_reset : function() {
        $("#breadcrumb").removeClass("hidden");
        $("#nav-toggle-breadcrumb").removeClass("light-blue");
        $("#nav-toggle-breadcrumb").removeClass("darken-1");
    },

    // view - hide
    view_hide : function() {
        this.view_reset();
        $("#breadcrumb").addClass("hidden");
    },

    // view - show
    view_show : function() {
        this.view_reset();
        $("#nav-toggle-breadcrumb").addClass("light-blue");
        $("#nav-toggle-breadcrumb").addClass("darken-1");
    }


}
/** class | **/




/** | listener **/


    // breadcrumb - nav - click
    $("#nav-toggle-breadcrumb").click(function() {
        if( $("#breadcrumb").hasClass("hidden") ){
            breadcrumb.view_show();
        } else {
            breadcrumb.view_hide();
        }
    });


/** listener | **/
