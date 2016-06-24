#!/bin/bash


    set -x
    curl "localhost/php/api/session/rm.php" "$@"


