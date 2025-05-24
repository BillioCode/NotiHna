import mongoose from "mongoose";

// define the note Schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },

  content: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },



  },
  { timestamps: true } // createdAt, updatedAt
);

// create the model of the schema 
const Note = mongoose.model('Note', noteSchema);

// exporting the model
export default Note;
