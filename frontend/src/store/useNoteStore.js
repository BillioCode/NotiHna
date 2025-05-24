import axios from 'axios';
import {toast} from 'react-hot-toast'

import { create } from "zustand"
export const useNoteStore = create((set, get) => ({
    // state
    notes: [],
    currentNote: null,
    loading: false,
    error: null,

    // Fetch all notes
    fetchNotes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('/api/notes');
            set({ notes: response.data.notes, loading: false });
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch notes!';
            set({ error: message, loading: false });
            toast.error(message);
        }
    },


    
    // get one specific note by id 
    getNoteById: async (noteId) => {
        set({loading: true, error: null})
        try {
            const response = await axios.get(`/api/notes/${noteId}`);
             set({currentNote: response.data.note, loading: false})
        } catch(error) {
            const message = error.response?.data?.message || 'Failed to fetch the note!';
            set({ error: message, loading: false });
            toast.error(message);
            return false
        }
    },





    // Create note
    addNote: async (noteData) => {
        set({ loading: true, error: null });
        try {
            // create a new one 
            await axios.post('api/notes', noteData);
            // fetch all the notes again 
            await get().fetchNotes();
            toast.success('Note created successfully!');
            return true
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create note!';
            set({ error: message, loading: false });
            toast.error(message);
            return false
        }
    },



    // Update note
    updateNote: async (noteId, noteData) => {
        set({ loading: true, error: null });
        try {
            await axios.put(`/api/notes/${noteId}`, noteData);
            await get().fetchNotes();
            toast.success('Note updated successfully!');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update the note!';
            set({ error: message, loading: false });
            toast.error(message);
        }
    },



    
    // Delete a note 
    deleteNote: async (noteId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/notes/${noteId}`);
            await get().fetchNotes();
            toast.success('Note deleted successfully!');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete the note!';
            set({ error: message, loading: false });
            toast.error(message);
        }
    }
}));



