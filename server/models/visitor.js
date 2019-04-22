/**
 * Created by Meghana on 2/23/2016.
 */

// Setup.
import mongoose from "mongoose"; // Helper for communicating with Mongodb.
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  Email: {
    type: String,
    required: true
  },

  FirstName: {
    type: String,
    required: true
  },

  LastName: {
    type: String,
    required: true
  },

  JobTitle: {
    type: String
  },

  MobileNumber: {
    type: Number
  },

  Company: {
    type: String
  },

  Person: {
    type: String,
    required: true
  },

  Visit: {
    type: String,
    required: true
  },

  Image: {
    type: String,
    required: true
  },

  UUID: {
    type: String,
    required: true
  },

  Date: {
    type: Date,
    default: Date.now()
  }
});
export default mongoose.model("visitor", VisitorSchema);
