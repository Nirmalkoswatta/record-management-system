import mongoose from 'mongoose';

// Define the schema for the pet record
const petRecordSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  petBreed: {
    type: String
  },
  petAge: {
    type: Number
  },
  specialNotes: {
    type: String
  }
});

// Create a model from the schema
const PetRecord = mongoose.model('PetRecord', petRecordSchema);

export default PetRecord;
