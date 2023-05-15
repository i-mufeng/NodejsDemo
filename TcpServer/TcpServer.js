//引入net模块
const net = require('net');
//创建TCP服务器
const server = net.createServer(function (socket) {
    //监听data事件
    socket.on("data", function (data) {
        //打印数据
        console.log("接收到数据：" + data.toString());
        handleData(data);

    });
});
//设置监听端口
server.listen(3000, function () {
    console.log("服务正在监听中。。。")
});

server.on('close', () => {
    console.log('Server Close!');
});

server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
        console.log('地址正被使用，重试中...');
    } else {
        console.error('服务器异常：', err);
    }
});

const handleData = (data) => {
    let dataString = data.toString();
    dataString.replace("&&@@@@<CR><LF>","")
    let strings = dataString.split(';');
    console.log(strings);
    let res = {};
    strings
        .filter(s => s !== '')
        .forEach(st => {
            let temp = st.split("=");
            res[temp[0]] = temp[1];
        });
    console.log(res);
}