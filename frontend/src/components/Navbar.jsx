import React from 'react';
import { SparklesText } from "../components/magicui/sparkles-text.jsx";
import { ArrowLeftFromLine } from 'lucide-react';
import { Link, useLocation} from 'react-router-dom';


function Navbar() {
  const location = useLocation();

  return (
    <nav className='max-w-6xl mx-auto h-20 flex items-center justify-between p-4'>
      <Link to="/" onClick={(e) => {
        if (location.pathname === "/") {
          e.preventDefault();
        }
      }}>
        <SparklesText className="font-bold md:text-4xl tracking-wide cursor-pointer">
          NotiHna
        </SparklesText>
      </Link>

      
          {location.pathname !== "/" ? (
            <Link to="/">
              <ArrowLeftFromLine className='size-8' />
            </Link>
          ) : (
            <Link
              to="/create"
              className='right-2 px-3 bg-[#aafe01b6] py-2 md:px-5 rounded-full cursor-pointer hover:bg-[#aafe01e0] transition-all duration-300'
            >
              New Note +
            </Link>
          )}

    </nav>
  );
}

export default Navbar;