// Import the PetRecord model
import PetRecord from '../model.js/record.model.js';

// Controller to handle adding a new pet record
export const addPetRecord = async (req, res) => {
  try {
    // Extracting data from the request body
    const { petName, ownerName, petBreed, petAge, specialNotes } = req.body;

    // Creating a new pet record instance
    const newPetRecord = new PetRecord({
      petName,
      ownerName,
      petBreed,
      petAge,
      specialNotes
    });

    // Saving the new pet record to the database
    await newPetRecord.save();

    // Sending a success response
    res.status(201).json({ message: 'Pet record added successfully' });
  } catch (error) {
    // Handling errors
    res.status(500).json({ message: 'Failed to add pet record', error: error.message });
  }
};

// Controller to handle fetching all pet records
export const getAllPetRecords = async (req, res) => {
  try {
    // Fetching all pet records from the database
    const petRecords = await PetRecord.find();

    // Sending the pet records as a response
    res.status(200).json(petRecords);
  } catch (error) {
    // Handling errors
    res.status(500).json({ message: 'Failed to fetch pet records', error: error.message });
  }
};

// Controller to handle fetching a single pet record

export const getSinglePetRecord = async (req, res) => {
  try {
    // Extracting the pet record ID from the request parameters
    const { id } = req.params;

    // Fetching the pet record from the database
    const petRecord = await PetRecord.findById(id);

    // Sending the pet record as a response
    res.status(200).json(petRecord);
  } catch (error) {
    // Handling errors
    res.status(500).json({ message: 'Failed to fetch pet record', error: error.message });
  }
};

// Controller to handle updating a pet record

export const updatePetRecord = async (req, res) => {
    try {
      // Extracting the pet record ID from the request parameters
      const { id } = req.params;
      
      // Extracting data from the request body
      const { petName, ownerName, petBreed, petAge, specialNotes } = req.body;
      
      // Updating the pet record in the database
      await PetRecord.findByIdAndUpdate(id, {
        petName,
        ownerName,
        petBreed,
        petAge,
        specialNotes
      });
      
      // Sending a success response
      res.status(200).json({ message: 'Pet record updated successfully' });
    } catch (error) {
        // Handling errors
        res.status(500).json({ message: 'Failed to update pet record', error: error.message });
    }
}

// Controller to handle deleting a pet record

export const deletePetRecord = async (req, res) => {
    try {
      // Extracting the pet record ID from the request parameters
      const { id } = req.params;
      
      // Deleting the pet record from the database
      await PetRecord.findByIdAndDelete(id);
      
      // Sending a success response
      res.status(200).json({ message: 'Pet record deleted successfully' });
    } catch (error) {
        // Handling errors
        res.status(500).json({ message: 'Failed to delete pet record', error: error.message });
    }
}
