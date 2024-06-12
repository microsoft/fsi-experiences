#!/bin/bash

for i in $(find $1 -type d -name "node_modules" -prune -o \( -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.js" -o -name "*.jsx" \) ) # or whatever other pattern...
do
  if ! grep -q Copyright $i
  then
    echo "Adding copyright to $i"
    if [[ $i == *.html ]]
    then
      cat tools/OSSCopyRight/Templates/copyright_html.txt $i > $i.new
    elif [[ $i == *.ts ]] || [[ $i == *.tsx ]] || [[ $i == *.js ]] || [[ $i == *.jsx ]]
    then
      cat tools/OSSCopyRight/Templates/copyright_js.txt $i > $i.new
    fi
    echo "Renaming $i.new to $i"
    mv $i.new $i
  fi
done