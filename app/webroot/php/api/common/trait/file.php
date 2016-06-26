<?php namespace pholder\common\t; ?>
<?php trait     path {




    /** global(s) **/
    private $paths_ignore = array(
        '.'
    );




    /** path - get - file - details **/
    public function path_details($file) {
                if( is_link($file) ){ $path = $file;            }
                else                { $path = realpath($file);  }
                $details = array();
                $details['name'] = basename($file);
                $details['path'] = $path;
                $details['hash'] = md5($details['path']);
                $details['dir']  = is_dir($details['path']);
                $details['icon'] = $this->path_icon($file);
        return  $details;
    }


    /** path - get - icon **/
    public function path_icon($path) {
        switch($path) {
            case is_link($path):
                return 'link';
            case is_dir($path):
                return 'folder_open';
            default:
                return 'insert_drive_file';
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
