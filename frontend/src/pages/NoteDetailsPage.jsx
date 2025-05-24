import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNoteStore } from '../store/useNoteStore.js'
import { useParams, useNavigate } from 'react-router'
import { formatDate } from '../components/lib/formateDate.js'
import { Trash2, Edit, Save, X } from "lucide-react"

const NoteDetailsPage = () => {
  const { currentNote, getNoteById, deleteNote, updateNote, loading, error } = useNoteStore()
  const { id } = useParams()
  const navigate = useNavigate()
  
  // State for editable fields
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })

  // Initialize form data when note loads
  useEffect(() => {
    getNoteById(id)
  }, [id])

  useEffect(() => {
    if (currentNote) {
      setFormData({
        title: currentNote.title,
        content: currentNote.content
      })
    }
  }, [currentNote])

  const handleNoteDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id)
      navigate("/")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
      await updateNote(id, formData)
      setIsEditing(false)
      await getNoteById(id) // Refresh the note
  }

  if (loading) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-[#aafe01b6] border-t-transparent rounded-full animate-spin"/>
          <p className="text-gray-400">Loading your note details...</p>
        </div>
      </div>
    )
  }

  if (!currentNote) return <div className="min-h-[90vh] flex items-center justify-center">Note not found</div>
  if (error) return <div className="min-h-[90vh] flex items-center justify-center">Error: {error}</div>

  return (
    <motion.div
      className="min-h-[90vh] flex justify-center items-start pt-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-2xl bg-gray-800/60 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        {/* NOTE HEADER */}
        <div className="px-6 py-5 border-b border-gray-700">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <h2 className="text-xl font-semibold text-white mb-1">Editing Note</h2>
              ) : (
                <h1 className="text-2xl font-semibold text-white truncate">
                  {currentNote.title}
                </h1>
              )}
              {currentNote.createdAt && (
                <p className="text-sm text-gray-400 mt-1">
                  Created: {formatDate(new Date(currentNote.createdAt))}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium cursor-pointer"
                  >
                    <span className="hidden sm:inline">Cancel</span>
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium cursor-pointer"
                  >
                    <span className="hidden sm:inline">Edit</span>
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={handleNoteDelete}
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
                  >
                    <span className="hidden sm:inline">Delete</span>
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* NOTE CONTENT */}
        <form onSubmit={handleSubmit} className=' max-w-[90%] mx-auto p-6 text-center flex flex-col gap-4'>
          <div className="mb-4">
            {isEditing ? (
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                className="w-full border px-3 py-2 rounded-lg bg-gray-700 text-white"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            ) : (
              <p className="text-white text-2xl md:text-4xl font-semibold mb-4">{currentNote.title}</p>
            )}
          </div>

          <div className="mb-4">
            {isEditing ? (
              <textarea
                id="content"
                name="content"
                placeholder="Write your note here"
                className="w-full border px-3 py-2 rounded-lg bg-gray-700 text-white"
                rows={6}
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            ) : (
              <p className="text-white whitespace-pre-wrap text-left text-lg">{currentNote.content}</p>
            )}
          </div>

          {isEditing && (
            <button 
              type="submit" 
              className="bg-[#aafe01b6] py-2 px-6 rounded-full cursor-pointer hover:bg-[#aafe019f] transition-all duration-300"
            >
              Save Changes
            </button>
          )}
        </form>

        {/* NOTE FOOTER */}
        {currentNote.updatedAt && (
          <div className="px-6 py-3 bg-gray-800 text-xs text-gray-500 border-t border-gray-700">
            Last updated: {formatDate(new Date(currentNote.updatedAt))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default NoteDetailsPage