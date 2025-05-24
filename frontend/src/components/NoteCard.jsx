import React from 'react'
import { Trash2 } from "lucide-react";
import { SquarePen } from 'lucide-react';
import { formatDate } from '../components/lib/formateDate.js'
import { Link } from 'react-router-dom';  // Fix this import
import { useNoteStore } from '../store/useNoteStore.js';

const NoteCard = ({note, id}) => {
  const {deleteNote, loading, error} = useNoteStore();
  
  
  const handleNoteDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
    deleteNote(id);
  }
  }


  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-[#aafe01b6] border-t-transparent rounded-full animate-spin"/>
          <p className="text-gray-400">Loading your notes...</p>
        </div>
      </div>
    );
  }

  if(error) {
    return <div className="text-red-500">Error: {error.message || error.toString()}</div>
  }
  return (
      <Link 
        to={`/note/${id}`}
        key={id} 
        className="relative border border-gray-700 rounded-lg min-h-[200px] w-full max-w-[300px] flex flex-col justify-between gap-3 p-4 
                  bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 
                  shadow-lg hover:shadow-xl hover:-translate-y-1 
                  group overflow-hidden cursor-pointer"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Note content */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-100">{note.title}</h3>
          <p className="text-gray-400/80 line-clamp-3 mt-2">{note.content}</p>
        </div>

        {/* Footer with date and buttons */}
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-700/50">
          <span className="text-xs text-gray-500">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            {/* Edit button with subtle hover effect */}
            <button 
              className="p-1.5 rounded-full hover:bg-gray-700/80 transition-colors duration-200 cursor-pointer"
              aria-label="Edit note"
            >
              <SquarePen className="size-4 text-gray-400 hover:text-blue-400 transition-colors" />
            </button>

            {/* Delete button with "wiggle" animation on hover */}
            <button 
              onClick={handleNoteDelete}
              className="p-1.5 rounded-full hover:bg-gray-700/80 transition-colors duration-200 cursor-pointer"
              aria-label="Delete note"
            >
              <Trash2 className="size-4 text-red-400 hover:text-red-300 hover:animate-wiggle transition-all" />
            </button>
          </div>
        </div>
      </Link>
  )
}

export default NoteCard