import mongoose from 'mongoose'

const RequestSchema = mongoose.Schema(
  {
    Forfeit: {
      type: Number,
      required: true,
      default : 0
    },
    requestStatus: {
      type: Number,
      required: true,
      default : 1
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
    ResidenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Residence', 
    },


  },
  {
    timestamps: true,
  }
)



const Request = mongoose.model('Request', RequestSchema)

export default Request
