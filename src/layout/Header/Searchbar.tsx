import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import search from './assets/searchSVG.svg';
import purpleS from './assets/purpleSearch.svg';

interface P {
  kWord?: string;
}

const SearchBar = ({ kWord }: P) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/search-results?keyWord=${query}`);
    }
  };

  if (kWord) {
    // Render the first element if kWord exists
    return (
      <div
        id="search-container"
        className="group grid cursor-pointer  items-center"
      >
        <div className="flex gap-[15px]">
          <Image src={purpleS.src} width={27} height={30} alt="search" />
          <div id="search-field">
            <input
              id="name"
              type="search"
              aria-label="Sitewide search"
              placeholder={kWord}
              autoComplete="off"
              onChange={(e) => setQuery(e.target.value)}
              required
              className={`h-[28px]	 w-[760px] bg-white  pl-4  text-base text-black outline-transparent duration-[400ms] smallest:max-w-[350px] md:max-w-[760px]`}
              onKeyUp={handleKeyPress}
            />
          </div>
        </div>
        <hr className="border-1	mt-[10px]	border-solid border-purple" />
      </div>
    );
  } else {
    // Render the second element if kWord doesn't exist
    return (
      <div
        id="search-container"
        className="group hidden cursor-pointer items-center  md:flex"
      >
        <div id="search-field">
          <input
            id="name"
            type="search"
            aria-label="Sitewide search"
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
            required
            className={`mr-2 w-[0px] rounded-md bg-white text-black  duration-[400ms] focus:outline-none  group-hover:h-[28px] group-hover:w-[250px] group-hover:pl-4 group-hover:text-base`}
            onKeyUp={handleKeyPress}
          />
        </div>
        <Image src={search.src} width={22.41} height={25} alt="search" />
      </div>
    );
  }
};

export default SearchBar;
