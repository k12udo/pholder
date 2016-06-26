<?php namespace pholder\common\t; ?>
<?php trait     path {




    /** global(s) **/
    private $paths_ignore = array(
        '.'
    );




    /** path - get - file - details **/
    public function path_details($path) {
                $details            = array();
                $details['name']    = basename($path);
                $details['hash']    = md5($path);
                $details['path']    = $this->path_path($path);
                $details['type']    = $this->path_type($path);
                $details['icon']    = $this->path_icon($details['type']);
        return  $details;
    }


    /** path - get - icon **/
    public function path_icon($type) {
        switch($type) {
            case 'link':
                return 'link';
            case 'directory':
                return 'folder_open';
            case 'file':
                return 'insert_drive_file';
            default:
                return 'signal_cellular_no_sim';
        }
    }


    /** path - path **/
    public function path_path($path) {
        if( is_link($path) ){
            return $path;
        } else {
            return realpath($path);
        }
    }


    /** path - get - size **/
    function path_size($path) {
        if(is_file($path)) { return $this->path_size_file($path);        }
        if(is_dir($path))  { return $this->path_size_directory($path);   }
                             return false;
    }


    /** path - get - size - directory  **/
    function path_size_directory($path) {
        $bytes    = 0;
        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($path)
        );
        foreach ($iterator as $i) {
            if( ! is_link($i->getPathname()) ){
                if( is_readable($i->getPathname()) ){
                    if( is_file($i->getPathname()) ){
                        $bytes += $i->getSize();
                    }
                }
            }
        }
        return $bytes;
    }


    /** path - get - size **/
    function path_size_file($path) {
        if( ! is_file($path) ){
            return false;
        }
        return filesize($path);
    }


    /** path - get - size - human **/
    function path_size_human($size, $unit = "") {
        if( (!$unit && $size >= 1<<30) || $unit == "GB")
            return number_format($size/(1<<30),2)."GB";
        if( (!$unit && $size >= 1<<20) || $unit == "MB")
            return number_format($size/(1<<20),2)."MB";
        if( (!$unit && $size >= 1<<10) || $unit == "KB")
            return number_format($size/(1<<10),2)."KB";
        return number_format($size)." bytes";
    }


    /** path - type **/
    public function path_type($path) {
        switch($path) {
            case is_link($path):
                return 'link';
            case is_dir($path):
                return 'directory';
            default:
                return 'file';
        }
    }




    /** path(s) - get - absolute **/
    public function paths_clean($paths) {
        $paths_clean = array();
        foreach($paths as $path) {
            if( ! in_array($path, $this->paths_ignore) ){
                $paths_clean[] = $path;
            }
        }
        return $paths_clean;
    }

    /** path(s) - get - absolute **/
    public function paths_absolute($base, $paths) {
        $paths_absolute = array();
        foreach($paths as $path) {
            $paths_absolute[] = $base."/".$path;
        }
        return $paths_absolute;
    }

    /** path(s) - get - details **/
    public function paths_details($paths) {
                                    $files_with_details = array();
        foreach($paths as $path) {  $files_with_details[] = $this->path_details($path); }
        return                      $files_with_details;
    }




}?>
