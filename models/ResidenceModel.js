import mongoose from 'mongoose'

const fileSchema = mongoose.Schema({
  Filereference : {
    type : String,
    required : true
  },  
   FileLink: {
    type : String,
    required : true
  }
})
const ResidenceSchema = mongoose.Schema(
  {
    Description: {
      type: String,
      required: true,
    },
    Localisation: {
      type: String,
      required: true,
    },
    MoreInfoLocalisation: {
      type: String,
      required: true,
    },
    sexe: {
      type: String,
    },
    imageUrls: [Object],
    videoUrl: {
      type : Object,
      required :  true
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },

  },
  {
    timestamps: true,
  }
)



const Residence = mongoose.model('Residence', ResidenceSchema)

export default Residence
