
const mongoose = require('mongoose');

const BikeInfo = require('./bikeinfoModel');


const vehicleRequestSchema = new mongoose.Schema({
  vehicleId: {
    type: String,
    required: true
  },
  // vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'BikeInfo' },




});
// Define a virtual property for displaying the full address
vehicleRequestSchema.virtual('vehicleName').get(function () {
  const bikeInfo = BikeInfo.findById(this.vehicleId);
  console.log(bikeInfo.vehicleName);
  return bikeInfo.vehicleName;
  // return `${this.address}, City, Country`; // Modify the logic to generate the desired full address
});

const VehicleRequest = mongoose.model('VehicleRequest', vehicleRequestSchema);

module.exports = VehicleRequest;
