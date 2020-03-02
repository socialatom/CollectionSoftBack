#!/bin/bash

# Parse Arguments

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

CONFIRM=true
case $key in
    -u|--username)
    USERNAME="$2"
    shift # past argument
    shift # past value
    ;;
    -p|--password)
    PASSWORD="$2"
    shift # past argument
    shift # past value
    ;;
    -n|--no-confirm)
    CONFIRM=false
    shift # past argument
    shift # past value
    ;;
    --default)
    DEFAULT=YES
    shift # past argument
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

STAGE="${STAGE:-dev}"

echo USERNAME = "${USERNAME}"
echo PASSWORD = "${PASSWORD}"
echo STAGE = "${STAGE}"

if $CONFIRM; then
  read -p "Do you want to continue? [y/n]: " yn
  case $yn in
	  [Nn]* ) exit 1
  esac
fi

ROOTDIR=$(git rev-parse --show-toplevel)
STACKOUTPUTFILE="$ROOTDIR/.stackoutput-$STAGE.json"
if [[ ! -f "$STACKOUTPUTFILE" ]] ; then
    echo "Could not find file $STACKOUTPUTFILE, aborting."
    exit
fi
echo "Reading stack configuration from $STACKOUTPUTFILE"
AttachmentsBucketName=$(jq -r ".AttachmentsBucketName" "$STACKOUTPUTFILE")
UserPoolId=$(jq -r ".UserPoolId" "$STACKOUTPUTFILE")
IdentityPoolId=$(jq -r ".IdentityPoolId" "$STACKOUTPUTFILE")
UserPoolClientId=$(jq -r ".UserPoolClientId" "$STACKOUTPUTFILE")
ServiceEndpoint=$(jq -r ".ServiceEndpoint" "$STACKOUTPUTFILE")
Region="eu-central-1"

TESTPATH="/user"
METHOD="GET"
echo "Running Test: Testing Path $TESTPATH Method $METHOD"

set -o xtrace
apig-test \
--username="$USERNAME" \
--password="$PASSWORD" \
--user-pool-id="$UserPoolId" \
--app-client-id="$UserPoolClientId" \
--cognito-region="$Region" \
--identity-pool-id="$IdentityPoolId" \
--invoke-url="$ServiceEndpoint" \
--api-gateway-region="$Region" \
--path-template="$TESTPATH" \
--method="$METHOD" 


