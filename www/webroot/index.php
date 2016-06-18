<!doctype html>
<html lang="en">
    <head>

        <!-- title -->
        <title>pholder</title>

        <!-- meta -->
        <meta charset="utf-8">
        <meta name="author"         content="local-user"                            />
        <meta name="description"    content="A PHP file explorer."                  />
        <meta name="viewport"       content="width=device-width, initial-scale=1.0" />

        <!-- reset -->
        <link href="vendor/cssreset/reset.css" rel="stylesheet" >

        <!-- materialize -->
        <link type="text/css" rel="stylesheet" href="vendor/materialize/css/materialize.min.css"  media="screen,projection"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <!-- css -->
        <link rel="stylesheet" href="css/pholder.css">
        <link rel="stylesheet" href="css/component/files.css">
        <link rel="stylesheet" href="css/component/landing.css">
        <link rel="stylesheet" href="css/component/nav.css">
        <link rel="stylesheet" href="css/component/path.css">
        <link rel="stylesheet" href="css/component/footer.css">

        <!--[if lt IE 9]>
            <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->

    </head>
    <body>

        <!-- | landing -->
        <div id="landing">
            <div class="title">
                <h1><i class="material-icons large">dashboard</i></h1>
            </div>
        </div>
        <!-- landing -->

        <!-- | pholder -->
        <div id="pholder">

            <!-- | nav -->
            <nav id="nav">
                <div class="nav-wrapper light-blue">
                    <ul id="nav-mobile" class="left">
                        <li><a><i class="material-icons large">description</i></a></li>
                    </ul>
                    <ul id="nav-mobile" class="right">
                        <li><a><i class="material-icons large">search</i></a></li>
                        <li><a><i class="material-icons large">refresh</i></a></li>
                        <li><a><i class="material-icons large">import_export</i></a></li>
                    </ul>
                </div>
            </nav>
            <!-- nav | -->

            <!-- | file(s) -->
            <div id="files">


            </div>
            <!-- file(s) | -->

            <!-- | path -->
            <nav id="path" class="light-blue">
                <div class="nav-wrapper">
                    <div class="col s12">
                        <a href="#!" class="breadcrumb">First</a>
                        <a href="#!" class="breadcrumb">Second</a>
                        <a href="#!" class="breadcrumb">Third</a>
                    </div>
                </div>
            </nav>
            <!-- path | -->

        </div>
        <!-- pholder | -->


        <!-- | footer -->
        <footer id="footer" class="page-footer light-blue">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">Footer Content</h5>
                        <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Links</h5>
                        <ul>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                        </ul>
                    </div>
                </div>
              </div>
              <div class="footer-copyright">
                <div class="container">
                    © 2014 Copyright Text
                    <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
                </div>
            </div>
        </footer>
        <!-- footer | -->


        <!-- | javascript -->

            <!-- jQuery -->
            <script type="text/javascript" src="vendor/jquery/jquery-2.1.1.min.js"></script>

            <!-- materialize -->
            <script type="text/javascript" src="vendor/materialize/js/materialize.min.js"></script>

            <!-- DEBUG -->
            <script>
                $("h1").click(function() {
                    $('html, body').animate({
                        scrollTop: $("#nav").offset().top
                    }, 1000);
                });
            </script>

        <!-- javascript | -->

    </body>
</html>
