import Note from '../models/note.model.js'

// fetching all the notes in the database
export const getAllNotes = async (req, res) => {
    try {   
        const notes = await Note.find().sort({ createdAt: -1}); // -1 will sort them in desc by newest first
        if (notes.length === 0) {
            return res.status(200).json({
            success: true,
            message: "No notes found. Please add a note to get started.",
            notes: []
            });
        }
        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            count: notes.length, // Optional: Useful for frontend pagination
            notes: notes,
        });
    } catch (error) {
        console.error('Error in getAllNotes:', error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching notes",
        });
    }
}


export const getNoteById = async (req, res) => {
    const {id} = req.params;
    try {
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({
                success: false,
                message: "Note doesn't exist"
            });
        }
        res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            note: note, 
        });
    } catch(error) {
        console.error('Error in getNoteById:', error);
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                success: false,
                message: "Invalid note ID format"
            });
        }
        res.status(500).json({
            success: false,
            message: "Server error while fetching note",
        });
    }
};


// create a note 
export const createNote = async (req, res) => {
    
    try {
        const {title, content} = req.body;
		if (!title || !content) {
			return res.status(400).json({
                success: false,
                message: "All fields are required" 
            });
		}

        const existingNote = await Note.findOne({title: title});
        if(existingNote){
            return res.status(400).json({
                success: false,
                message: "Title already exists"
            });
        }

        // create a note with the Note model
        const newNote = new Note({
            title, 
            content,
        })

        // save the note in the databse
        await newNote.save();

        res.status(201).json({
            success: true, 
            message: "Note created successfully",
            note: newNote
        });

    } catch (error) {
        console.error('Error in createNote:', error);
        res.status(500).json({
            message: "Server error while creating a notes",
        });
    }
}


// update note with a specific id
export const updateNote = async (req, res) => {
    const {id} = req.params
    const {title, content} = req.body;
    try {
        // check if id is provided
        if(!id) {
            return res.status(400).json({
                success: false, 
                message: "Note ID is required"
            })
        }

        // check if at least one field is gonna be updated
        if(!title && !content) {
            return res.status(400).json({
                success: false,
                message: "At least one field (title or content) must be provided"
            })
        }

        // update the note with the provided fields if one is missing hes not gonna change
        const updatedNote = await Note.findByIdAndUpdate(id,{ title, content },
            { 
                new: true,      // Return updated doc
                runValidators: true // Validate new data
            }
        );
    // verify if the updated note exists
    if (!updatedNote) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
        }

        // send the updated note 
        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note: updatedNote
        });

        
    } catch(error) {
        console.error('Error in updateNote:', error);
        res.status(500).json({
            message: "Server error while updating a note",
        });
    }
}


// delete note
export const deleteNote = async (req, res) => {
    const {id} = req.params
    
    try {
        // check if id is provided
        if(!id) {
            return res.status(400).json({
                success: false, 
                message: "Note ID is required"
            })
        }

        // find and the deletee the note
        const deleteNote = await Note.findByIdAndDelete(id);
        if(!deleteNote){
            return res.status(404).json({
                success: false,
                message: "Note is not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        })
    } catch (error) {
                console.error('Error in deleteNote:', error);
        res.status(500).json({
            message: "Server error while deleting a note",
        });
    }
}