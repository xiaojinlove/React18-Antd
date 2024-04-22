import express from 'express'
import mongoose from 'mongoose'
import UserModel from './models/user.model.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect('mongodb+srv://gaoyan:gaoyan@react18-antd.zr5zkth.mongodb.net/?retryWrites=true&w=majority&appName=react18-antd')
  .then(
    console.log('数据库已连接')
  )

app.get('/getData', (req, res) => {
  const jsonData = [
    {
      ids: 'no1',
      name: '我是jam',
      img: '',
      desc: '我是jam, 今年23',
      key: 11
    },{
      ids: 'no2',
      name: '我是lily',
      img: '',
      desc: '我是lily, 今年22',
      key: 11
    }
  ]
  UserModel.create(jsonData)
  res.json(jsonData)
})

app.listen(3000, () => {
  console.log('服务器正在运行');
})