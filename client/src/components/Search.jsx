import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import debounce from 'lodash.debounce';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = params.search?.slice(3) || '';

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location]);

  const redirectToSearchPage = () => navigate("/search");

  const handleOnChange = debounce((e) => {
    const value = e.target.value;
    navigate(`/search?q=${value}`);
  }, 300);

  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center bg-slate-50 text-neutral-500 focus-within:border-primary-200 group shadow-sm'>
      
      {/* Left icon */}
      <div className='flex items-center justify-center h-full'>
        {isMobile && isSearchPage ? (
          <Link 
            to={"/"} 
            className='flex justify-center items-center h-9 w-9 m-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition'
          >
            <FaArrowLeft size={18} className="text-gray-600"/>
          </Link>
        ) : (
          <button className='flex justify-center items-center h-full p-3 hover:text-primary-200 transition'>
            <IoSearch size={22} />
          </button>
        )}
      </div>

      {/* Search input / animated placeholder */}
      <div className='w-full h-full flex items-center pl-2'>
        {!isSearchPage ? (
          <div 
            onClick={redirectToSearchPage} 
            className='w-full h-full flex items-center cursor-text'
          >
            <TypeAnimation
              sequence={[
                'Search "mobile phones"', 1000,
                'Search "shirts"', 1000,
                'Search "laptops"', 1000,
                'Search "shoes"', 1000,
                'Search "headphones"', 1000,
                'Search "books"', 1000,
                'Search "kitchen utensils"', 1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className='text-gray-400 text-sm lg:text-base'
            />
          </div>
        ) : (
          <input
            type='text'
            placeholder='Search for anything you want...'
            autoFocus
            defaultValue={searchText}
            onChange={handleOnChange}
            className='bg-transparent w-full h-full outline-none text-sm lg:text-base'
          />
        )}
      </div>
    </div>
  );
};

export default Search;
