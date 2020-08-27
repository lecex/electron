url=${BASE_URL//\//\\\/}
sed -i "s/\/rpc/$url/g" ./index.html