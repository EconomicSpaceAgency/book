#!/bin/bash

html_file="/home/equinox/Desktop/development/ecsa-book/src/index-to-be-changed.html"

awk '
BEGIN {
    FS="\""; OFS="\""
}
/id="u[0-9]+"/ {
    for (i=1; i<=NF; i++) {
        if ($i ~ /^u[0-9]+$/) {
            split($i, parts, "u");
            $i = "u" (parts[2] + 1);
        }
    }
}1' $html_file > modified_html_file.html
