import mongoose from "mongoose"

const DataSchema = new mongoose.Schema({
  ids: String,
  name: String,
  img: String,
  desc: String,
  key: Number
})

const UserModel = mongoose.model('users', DataSchema)

export default UserModel