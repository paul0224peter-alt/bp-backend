const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000; // Render 會自動分配 Port

app.listen(PORT, () => {
    console.log(`伺服器運行中，埠號：${PORT}`);
});

app.use(cors());
app.use(bodyParser.json());

let bpRecords = []; // 暫存紀錄

// 1. 接收資料的 API
app.post('/api/bp', (req, res) => {
    console.log("--- 收到新請求 ---");
    console.log("數據內容:", req.body); // 這行會在你的黑視窗印出資料

    const { sys, dia, pulse, level } = req.body;
    const newRecord = {
        id: Date.now(),
        sys,
        dia,
        pulse,
        level,
        time: new Date().toLocaleString()
    };
    
    bpRecords.push(newRecord);
    res.status(201).json({ message: '儲存成功', data: newRecord });
});

// 2. 取得資料的 API
app.get('/api/bp', (req, res) => {
    res.json(bpRecords);
});

app.listen(PORT, () => {
    console.log(`後端伺服器啟動成功：http://localhost:${PORT}`);
});