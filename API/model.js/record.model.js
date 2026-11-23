import mongoose from 'mongoose';

export const SPECIES = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

// Define the schema for the pet record
const petRecordSchema = new mongoose.Schema(
  {
    petName: { type: String, required: [true, 'Pet name is required'], trim: true, maxlength: 60 },
    species: { type: String, enum: SPECIES, default: 'Other' },
    ownerName: { type: String, required: [true, 'Owner name is required'], trim: true, maxlength: 80 },
    ownerPhone: {
      type: String,
      trim: true,
      match: [/^[+\d][\d\s-]{6,19}$/, 'Phone number looks invalid'],
    },
    petBreed: { type: String, trim: true, maxlength: 60 },
    petAge: { type: Number, min: [0, 'Age cannot be negative'], max: [60, 'Age looks too high'] },
    specialNotes: { type: String, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

// Create a model from the schema
const PetRecord = mongoose.model('PetRecord', petRecordSchema);

export default PetRecord;
