import React, { useState } from 'react'
import { useNoteStore } from '../store/useNoteStore.js'
import { useNavigate } from 'react-router-dom' 
import { motion } from 'framer-motion'


const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const {addNote} = useNoteStore();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // we await for the add opereation result if its gonna return true or false to judje what to do
    const success = await addNote({title, content}); 


      // Only navigate if the note was created successfully
    if (success) {
        setContent('');
        setTitle('');
        navigate('/');
    }
  }

  return (
    <motion.div className='min-h-[90vh] max-w-6xl mx-auto px-4 flex flex-col justify-center items-center'
          initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opcaity: 0}}
    >
      <h1 className="text-3xl font-bold mb-6">Create a New Note</h1>
      <form onSubmit={handleSubmit}  className='border border-gray-600  rounded-md w-full max-w-[50%] min-w-[400px] p-6'>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-semibold">Note Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-semibold ">Enter your note title</label>
          <textarea
            id="content"
            placeholder="Write your note here"
            className="w-full border px-3 py-2 rounded-lg"
            rows={6}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <button type="submit" className="bg-green-600 py-2 px-6 relative -right-[75%] md:-right-[80%]  rounded-full cursor-pointer hover:bg-green-700 transition-all duration-300">Create</button>
      </form>
    </motion.div>
  )
}

export default CreatePage