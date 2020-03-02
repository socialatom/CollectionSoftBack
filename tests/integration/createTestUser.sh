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
    -g|--usergroup)
    USERGROUP="$2"
    shift # past argument
    shift # past value
    ;;
    -s|--stage)
    STAGE="$2"
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
echo USERGROUP  = "${USERGROUP}"
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

PATH="$PATH:/usr/local/bin"
echo "Creating and Confirming Test User"

set -o xtrace
aws cognito-idp sign-up \
  --region "$Region" \
  --client-id "$UserPoolClientId" \
  --username "$USERNAME" \
  --password "$PASSWORD" 

aws cognito-idp admin-confirm-sign-up \
  --region "$Region" \
  --user-pool-id "$UserPoolId" \
  --username "$USERNAME"

aws cognito-idp admin-add-user-to-group \
  --user-pool-id "$UserPoolId" \
  --username "$USERNAME" \
  --group-name "$USERGROUP"