location=$PWD
echo "$location"

# install and build folder
# $1 is the directory to install&build
# $2 is the name for logging
function installAndBuild() {
    cd $1

    pnpm i -r --filter @fsi/$2
    status=$?
    [ $status -eq 0 ] && echo "install $2 command was successful" || exit 1

    pnpm run build
    status=$?
    [ $status -eq 0 ] && echo "pnpm run build $2 command was successful" || exit 1
}

#----------------Instaling the entire workspace---------------
cd $location/frontend/
pnpm i --frozen-lockfile
status=$?
[ $status -eq 0 ] && echo "install the entire workspace command was successful" || exit 1

#----------------build frontend libs---------------
pnpm build-libs
status=$?
[ $status -eq 0 ] && echo "buid libs command was successful" || exit 1

cd $location