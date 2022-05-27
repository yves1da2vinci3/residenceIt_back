import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema(
  {
    Description: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    ResidenceName : {
      type: String,
      required: true,
    },
   userName : {
    type: String,
    required: true,
   }
  },
  {
    timestamps: true,
  }
)



const Message = mongoose.model('Message', MessageSchema)

export default Message