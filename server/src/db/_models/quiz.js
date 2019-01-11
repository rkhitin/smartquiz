import { Schema, model } from 'mongoose'

const { ObjectId } = Schema.Types

const answerSchema = new Schema({
  text: String,
  attachmentId: ObjectId,
})

const questionSchema = new Schema({
  text: String,
  attachmentId: ObjectId,
  answers: [answerSchema],
})

const quizSchema = new Schema({
  slug: String,
  title: String,
  description: String,
  attachmentId: ObjectId,
  questions: [questionSchema],
})

const Quiz = model('Quiz', quizSchema)

export default Quiz
