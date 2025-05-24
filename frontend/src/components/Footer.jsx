import React from 'react'

const Footer = () => {
return (
    <footer className='max-w-6xl mx-auto h-20 flex items-center justify-center'>
        <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NotiHna. All rights reserved.
        </p>
    </footer>
)
}

export default Footer