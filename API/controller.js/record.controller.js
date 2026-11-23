import PetRecord from '../model.js/record.model.js';

// Only these fields are accepted from clients (blocks mass-assignment of _id, timestamps, etc.)
const pick = ({ petName, species, ownerName, ownerPhone, petBreed, petAge, specialNotes }) => ({
  petName,
  species,
  ownerName,
  // null (not undefined) so clearing a field on update actually unsets it
  ownerPhone: ownerPhone || null,
  petBreed,
  petAge: petAge === '' || petAge == null ? null : petAge,
  specialNotes,
});

// Bad input (validation / malformed id) is the client's fault: 400, with per-field messages.
const fail = (res, error, message) => {
  if (error.name === 'ValidationError') {
    const errors = Object.fromEntries(Object.entries(error.errors).map(([k, v]) => [k, v.message]));
    return res.status(400).json({ message: 'Please fix the highlighted fields', errors });
  }
  if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid record id' });
  console.error(message, error);
  return res.status(500).json({ message });
};

const notFound = (res) => res.status(404).json({ message: 'Pet record not found' });

export const addPetRecord = async (req, res) => {
  try {
    const record = await PetRecord.create(pick(req.body));
    res.status(201).json(record);
  } catch (error) {
    fail(res, error, 'Failed to add pet record');
  }
};

export const getAllPetRecords = async (_req, res) => {
  try {
    res.status(200).json(await PetRecord.find().sort({ createdAt: -1 }));
  } catch (error) {
    fail(res, error, 'Failed to fetch pet records');
  }
};

export const getSinglePetRecord = async (req, res) => {
  try {
    const record = await PetRecord.findById(req.params.id);
    record ? res.status(200).json(record) : notFound(res);
  } catch (error) {
    fail(res, error, 'Failed to fetch pet record');
  }
};

export const updatePetRecord = async (req, res) => {
  try {
    const record = await PetRecord.findByIdAndUpdate(req.params.id, pick(req.body), {
      returnDocument: 'after',
      runValidators: true,
    });
    record ? res.status(200).json(record) : notFound(res);
  } catch (error) {
    fail(res, error, 'Failed to update pet record');
  }
};

export const deletePetRecord = async (req, res) => {
  try {
    const record = await PetRecord.findByIdAndDelete(req.params.id);
    record ? res.status(200).json({ message: 'Pet record deleted successfully' }) : notFound(res);
  } catch (error) {
    fail(res, error, 'Failed to delete pet record');
  }
};
