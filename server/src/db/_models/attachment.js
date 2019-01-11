import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: String,
  src: String,
  type: String,
})

const Attachment = model('Attachment', schema)

export default Attachment
