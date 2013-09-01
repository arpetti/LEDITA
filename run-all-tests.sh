# Work in progress, do not run yet

# Server should be stopped before running this

# Run server side unit, dao, and integration tests
npm test

# Run client side Angular-Karma unit tests
npm run-script client-test

# FIXME How to check if server already started?
# Start server
NODE_ENV=dev node server.js > /dev/null &
sleep 3

# TODO Investigate if possible to define e2e tests in package.json similar to client-test
# Run client side Angular-Karma end-to-end tests
test/client/scripts/local-e2e-test.sh

# TODO Kill Server, but NODE, not RUBY
# http://stackoverflow.com/questions/6437602/shell-script-to-get-the-process-id-on-linux
#output=`ps -aux|grep r[u]by`
#set -- $output
#pid = $1
#kill $pid
#sleep 2
#kill -9 $pid >/dev/null 2>&1