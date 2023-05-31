// try catch is not requre it will deal with the error present in the courses
const asyncHandler = require('express-async-handler');
const VehicleRequest = require("../models/vehicleRegisterRequestModel");
const BikeInfo = require("../models/bikeinfoModel");
const bcrypt = require('bcrypt');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { upload } = require('../middleware/multerConfig');


const getVehicleRequests = asyncHandler(async (req, res) => {
    //   const reqestInfo = await VehicleRequest.find();
    const vehicleRequest = await VehicleRequest.find();
    const bikeInfo = await BikeInfo.find();
    // Create a new list of bikeInfo objects that are not in vehicleRequest
    const reqestingVehicles = bikeInfo.filter((bike) => {
        return vehicleRequest.some((request) => request.vehicleId === bike._id.toString());
    });
    res.status(200).json(reqestingVehicles);
});

//With this new endpoint, you can now make requests to /api/bikeinfo/sort?sort=highToLow to retrieve bike information sorted from high to low, and /api/bikeinfo/sort/lowToHigh to retrieve bike information sorted from low to high.

// // Create a new bike info
// const createVehicleRequest = asyncHandler(async (req, res) => {
//   // console.log(req);
//   // return ;
//   const {
//     vehicleId

//   } = req.body;
//   // console.log(req.body)

// if (

//   !vehicleId 
//  )
//  {
// // console.log(error);
//    res.status(400).json({ error: 'Missing vehicle id fields' });
//    return; // Add this line to exit the function after sending the response
//  }

//   // const hashedPassword = await bcrypt.hash(password, 10);
//   const vehicleRequest = await VehicleRequest. create({
//     // id ,
//     vehicleId

//   });

//   //  bikeInfo.save();
//   res.status(201).json(vehicleRequest);
//   // console.log(bikeInfo);
// });



const acceptVechicleRequest = asyncHandler(async (req, res) => {
    // const bikeInfo = await VehicleRequest.findByIdAndDelete(req.params.id);
    const vehicleRequest = await VehicleRequest.findOneAndRemove({vehicleId: req.params.id});
    console.log(vehicleRequest);
    if (!vehicleRequest) {
        res.status(404);
        throw new Error("Vehicle Request not found");
    }
    res.status(200).json({ message: "Vehicle has been accepted" });

});

const rejectVechicleRequest = asyncHandler(async (req, res) => {
    const bikeInfo = await BikeInfo.findByIdAndDelete(req.params.id);
    const vehicleRequest = await VehicleRequest.findOneAndRemove({vehicleId: req.params.id});
    if (!bikeInfo) {
        res.status(404);
        throw new Error("Bike not found");
    }
    if (!vehicleRequest) {
        res.status(404);
        throw new Error("Request not found");
    }

    //  await BikeInfo.findByIdAndRemove();
    //  remove({id:bikeInfo.id});
    res.status(200).json({ message: "Request has been rejected successfully" });

});


// const acceptVechicleRequest = asyncHandler(async (req, res) => {
//     const bikeInfo = await BikeInfo.findByIdAndDelete(req.params.id);
//     if (!bikeInfo) {
//         res.status(404);
//         throw new Error("Bike info not found");
//     }

//     //  await BikeInfo.findByIdAndRemove();
//     //  remove({id:bikeInfo.id});
//     res.status(200).json({ message: "Bike info deleted" });

// });




// // get bike info by id
// const getBikeInfoById= asyncHandler(async (req,res)=>{
//  const bikeInfo = await BikeInfo.findById(req.params.id);
// if(!bikeInfo){
//     res.status(404).json({ error: 'Bike info not found' });
// }
// else{
//     res.status(200).json(bikeInfo);
// }

// });



// // update bike info 
// // put 

// const updateBikeInfo= asyncHandler(async(req,res)=>{
//  const bikeInfo = await BikeInfo.findByIdAndUpdate(req.params.id, req.body,{new:true});
//  if(!bikeInfo){
//     res.status(404).json({ error: 'Bike info not found' });
//     }
//     else{
//         res.status(200).json(bikeInfo);
//         }
// });

// // delete bike info 






module.exports = {
    getVehicleRequests,
    acceptVechicleRequest,
    rejectVechicleRequest,
    


};




