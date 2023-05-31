const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const mongoose = require('mongoose')
const BikeModel = require('../models/bikeinfoModel');
const VehicleRequestModel = require("../models/vehicleRegisterRequestModel");

AdminBro.registerAdapter(AdminBroMongoose)


const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  // resources: [BikeModel, VehicleRequestModel],
  resources: [BikeModel, {
    resource: VehicleRequestModel,
    options: {
      properties: {
        vehicleId: { list: true, filter: true, show: true, edit: true },
        vehicleName: { list: true, filter: true, show: true, edit: true },
      }

    }
  }],

})
// const router = AdminBroExpress.buildRouter(adminBro)


const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router