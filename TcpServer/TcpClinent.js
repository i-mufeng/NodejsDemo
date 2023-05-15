/**
 * 构建 Tcp 客户端
 */
// 引入 net 模块
const net = require("net");
// 创建 client 客户端
const client = new net.Socket();

//设置连接的服务器
client.connect(3000, '127.0.0.1', function () {
    console.log("连接服务器成功");
    client.write("##$$$$ST=32;CN=2011;PW=123456;MN=JOX00152414802;SK=B1D9FE758DAC36DA931E7915140C701E;CP=&&DataTime=20220120112806;PM10-Avg=130.00,PM10-Flag=N;PM25-Avg=113.00,PM25-Flag=N;B03-Avg=55.50,B03-Flag=N;T01-Avg=14.20,T01-Flag=N;H01-Avg=65.20,H01-Flag=N;W02-Avg=0.00,W02-Flag=N;W01-Avg=0.00,W01-Flag=N;TSP-Avg=206.00,TSP-Flag=N;&&@@@@<CR><LF>");
    client.end();

});
client.on('data', buffer => {
    console.log(buffer.toString());
});

// 例如监听一个未开启的端口就会报 ECONNREFUSED 错误
client.on('error', err => {
    console.error('服务器异常：', err);
});

client.on('close', err => {
    console.log('客户端链接断开！', err);
})