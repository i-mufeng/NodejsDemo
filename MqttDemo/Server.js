const aedes = require('aedes')()
const { createServer } = require('aedes-server-factory')
const port = 10086

const server = createServer(aedes)

server.listen(port, function () {
    console.log('server started and listening on port ', port)
})

aedes.on("client", (client) => {
    console.log('客户端已连接: ', client.id);
});
aedes.on('unsubscribe',  (subscriptions, client) => {
    console.log("unsubscribe:", client.id);
})
aedes.on('subscribe', (subscriptions, client) => {
    console.log('客户端', client && client.id, '订阅主题:', subscriptions);
})

aedes.on('publish',  (packet, client) => {
    if (client == null || client.id == null) {
        return;
    }
    // 解析消息主题和内容
    const topic = packet.topic;
    const message = packet.payload.toString();


    console.log('收到来自客户端', client && client.id, '的消息:');
    console.log('主题:', topic);
    console.log('内容:', message);

    client.publish({
        topic: "mqtt/face/testId01/ask",
        payload: "Yes,I get it!",
        qos: 0,
        retain: false
    }, () => {
        console.log("成功回复");
    });

});

aedes.on('clientDisconnect', (client) => {
    console.log("clientDisconnect:", client.id);
})
