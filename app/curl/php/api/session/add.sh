#!/bin/bash


    set -x
    curl "localhost:7070/php/api/session/add.php" "$@"


