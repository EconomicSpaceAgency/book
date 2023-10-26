#!/bin/bash

html_file="/home/equinox/Desktop/development/ecsa-book/src/index-to-be-changed.html"

# Use sed to increment the numbers after 'u' in id attributes
sed -E 's/id="u([0-9]+)"/id="u\1" increment_id="\1"/g' $html_file | 
sed -E 's/increment_id="([0-9]+)"/id="u$((\1+1))"/g' > modified_html_file.html

# If you want to update the original file in-place, you can do:
# sed -i -E -e '...' -e '...' $html_file
