import React from 'react';

// icons
import Megnafying from '@/app/assets1/custom-icons/Megnafying';

type Props = {
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  icon?: boolean;
  style?: {};
};

const SearchBar = (props: Props) => {
  const { searchKey, setSearchKey, placeholder, icon = true, ...prop } = props;

  return (
    <div
      className='flex items-center border border-[#E0E3E8] bg-[#FFF] max-w-[450px] py-[5px] pr-5 pl-2.5 rounded-[5px] flex-1'
      {...prop}
    >
      <input
        value={searchKey}
        onChange={async (e) => {
          setSearchKey(e.target.value);
        }}
        className='focus:outline-none'
        style={{ flex: 1, background: 'none', padding: 5 }}
        placeholder={placeholder ? placeholder : 'Search'}
        autoFocus
      />
      {icon && <Megnafying color='#4285F4' size={25} />}
    </div>
  );
};

export default SearchBar;
