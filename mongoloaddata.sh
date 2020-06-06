#! /bin/bash

for filename in data/*.json
do
    echo "file = ${filename}"
    collection=$(echo "${filename}" | awk -F'[/.]' '{print $2}')
    echo "collection = ${collection}"
    mongoimport --db products --collection "${collection}" --drop --jsonArray < "${filename}"
done