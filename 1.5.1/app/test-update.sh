#!/bin/bash

echo $TEST_ROOT_DIR

# Install the dependencies and call the action
cd $TEST_ROOT_DIR
echo "Install everything..."
npm i
ln -s $TEST_ROOT_DIR/node_modules /app/node_modules
echo "Running test-update..."
npm run test-update
if [ $? -eq 0 ]; then
    echo OK
else
    exit 1
fi