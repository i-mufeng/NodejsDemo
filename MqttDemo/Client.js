const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://127.0.0.1:10086',{
});
// 连接到 MQTT 服务器
client.on('connect', () => {
    console.log('已连接到 MQTT 服务器');

    const replayTopic = 'mqtt/face/testId01/ask';
    console.log(`成功订阅回复主题${replayTopic}`);
    // 订阅主题
    client.subscribe(replayTopic); // 在这里替换为你要订阅的主题
    console.log("开始发送人脸监测数据");
    let dataString = "{\n" +
        "  \"customId\": \"063c81e0fce184c696cdb7e049230f5e\",\n" +
        "  \"personId\": \"41\",\n" +
        "  \"direction\": \"entr\",\n" +
        "  \"otype\": \"1\",\n" +
        "  \"persionName\": \"张三\",\n" +
        "  \"facesluiceId\": \"1305433\",\n" +
        "  \"facesluiceName\": \"Face1\",\n" +
        "  \"cardNum2\": \"2\",\n" +
        "  \"time\": \"2018-03-07 14:01:01\",\n" +
        "  \"pic\": \"data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2w......\",\n" +
        "  \"temperature\": \"36.53\",\n" +
        "  \"temperatureAlarm\": \"0\",\n" +
        "  \"healthInfo\": {\n" +
        "    \"region\": \"35\",\n" +
        "    \"cardID\": \"**************3734\",\n" +
        "    \"cardName\": \"蔡**\"\n" +
        "  }\n" +
        "}";

    // 发布消息
    client.publish('mqtt/face/testId01', dataString); // 在这里替换为你要发布的主题和消息内容
    console.log("发送成功");
    // client.end();
});
// 接收消息
client.on('message', (topic, message) => {
    console.log(`收到来自服务器的返回消息，主题： ${topic} ，内容: ${message.toString()}`);
});
// 断开连接时的处理
client.on('close', () => {
    console.log('已断开与 MQTT 服务器的连接');
});
