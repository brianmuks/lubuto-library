#!/bin/bash
set -e
0977646219Muks89#
### Configuration ###

SERVER=imuks@13.92.250.158

APP_DIR=/var/www/lubuto/tmp
KEYFILE=
REMOTE_SCRIPT_PATH=/tmp/deploy/deploy-lubuto-app.sh
PACKAGE=../output/lubuto-library.tar.gz

### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}


### Automation steps ###

if [[ "$KEYFILE" != "" ]]; then
  KEYARG="-i $KEYFILE"
else
  KEYARG=
fi

# if [[ `meteor --version` =~ "Meteor 1.4."* ]]; then
#   run meteor build --server-only ../output
#   mv ../../output/*.tar.gz ./package.tar.gz
# else
#   run meteor bundle package.tar.gz
# fi
# run scp $KEYARG package.tar.gz $SERVER:$APP_DIR/
# run scp $KEYARG deploy/work.sh $SERVER:$REMOTE_SCRIPT_PATH
# echo
# echo "---- Running deployment script on remote server ----"
# run ssh $KEYARG $SERVER bash $REMOTE_SCRIPT_PATH

#run meteor build --server-only ../output
echo
echo "---- BUNDLING APP ----"
#run scp $KEYARG $PACKAGE $SERVER:$APP_DIR

echo
echo "---- SENDING REMOTE SCRIPT ----"
run scp $KEYARG deploy/work.sh $SERVER:$REMOTE_SCRIPT_PATH

echo
echo "---- Running deployment script on remote server ----"
run ssh $KEYARG $SERVER bash $REMOTE_SCRIPT_PATH 
