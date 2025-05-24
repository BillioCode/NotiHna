import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { useNoteStore } from '../store/useNoteStore.js'
import { BlurFade } from "../components/magicui/blur-fade.jsx";
import NoteCard from '../components/NoteCard.jsx';
import { motion } from 'framer-motion';



const HomePage = () => {

  const {fetchNotes, notes, loading, error} = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (loading) {
    return (
      <div className="min-h-[90vh]  w-full flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-[#aafe01b6] border-t-transparent rounded-full animate-spin"/>
          <p className="text-gray-400">Loading your notes...</p>
        </div>
      </div>
    );
  }
  
  if (error) return <div>Error: {error}</div>;

  
  return (  
    <motion.main 
      className='max-w-6xl min-h-[90vh] mt-15  mx-auto flex flex-col items-center gap-4 p-4 relative'
    >
      {notes.length ? (
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full justify-items-center'>
          {notes.map((note) => (
            <NoteCard note={note} id={note._id}/>
          ))}
        </div>
      ) : (
        <div className='w-full flex flex-col md:flex-row justify-between items-center'>
          <motion.div
            className='w-full md:w-1/2 text-center md:text-left space-y-4'
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className='text-4xl md:text-6xl font-bold mb-4 leading-normal '>Your Notes, <span className='bg-[#aafe01b6] underline'>Always Available</span></h2>
            <p className='text-lg md:text-xl max-w-[500px] md:max-w-full mx-auto md:mx-0 text-gray-400'>
              Access your ideas on every screen - phones, tablets, computers, and beyond.
              Pick up right where you left off.
            </p>
          </motion.div>
          <div className='w-full md:w-1/2 flex justify-center'>
            <BlurFade className='w-full max-w-md'>
              <img 
                src="/notes-concept-illustration.png" 
                alt="note illustration" 
                className='w-full h-auto object-contain'
              />
            </BlurFade>
          </div>
        </div>
      )}
    </motion.main>
  )
}

export default HomePage


