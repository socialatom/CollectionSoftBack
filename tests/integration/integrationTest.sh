#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

STAGE=${1:-dev}
echo "Running Deployment Tests"
echo "Stage: $STAGE"
echo ""
echo ""
sh "$DIR/api/testCreateStaffAPI.sh" -u "teststaffadmin@test.com" -p "Pass123!" -stage "$STAGE" -n
echo ""
echo ""
sh "$DIR/api/testListStaffAPI.sh" -u "teststaffadmin@test.com" -p "Pass123!" -stage "$STAGE" -n
echo ""
echo ""
sh "$DIR/api/testUpdateStaffAPI.sh" -u "teststaffadmin@test.com" -p "Pass123!" -stage "$STAGE" -n
echo ""
echo ""
sh "$DIR/api/testDeleteStaffAPI.sh" -u "teststaffadmin@test.com" -p "Pass123!" -stage "$STAGE" -n
