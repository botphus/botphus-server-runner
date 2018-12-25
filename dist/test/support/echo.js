// This is a basic echo worker, can be expanded to meet the needs of your testing
// Handle all generic 'message' message and echo them
process.on('message', (message) => {
    process.send.apply(process, arguments);
    // This an example of how to disconnect
    // Ideally you should always have a way to disconnect the echo script
    // Otherwise your tests will be forever waiting for workers that won't d/c
    if (message.act === 'stop') {
        process.disconnect();
    }
});
// App specific, example of telling master worker is ready
process.send({ act: 'ready' });
