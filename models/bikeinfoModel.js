
const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  // id:{
  //   type: Number,
  //   required:true

  // },
  userId:{
    type:String,
    required:true
  },
  vehicleName:
  { type: String,
    required: true },
location:{
  type:String,
  required:true
},

  citizenshipno:
 { type: String,
    required: true },

  phonenumber: 
  { type: String, 
   required: true },


  bikeCC:
   { type: String,
    required: true },

  bikemodel:
   { type: String,
     required: true },

  licenceimageId:
   { type: String,
     required: true },

  vehicledetail:
   { type: String,
     required: true },

  bikecolor:
   { type: String,
     required: true },

  rentprice: 
  { type: String,
     required: true },

  // billbookPic:
  //  { type: String,
  //    required: true },

     bikepic:
     { type: String,
       required: true },
  
 
  isreserved:
   { type:Boolean,
     default: false },


});

const BikeInfo = mongoose.model('BikeInfo', bikeSchema);

module.exports = BikeInfo;
