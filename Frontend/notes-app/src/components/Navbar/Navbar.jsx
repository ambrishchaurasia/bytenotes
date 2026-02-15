import React from 'react'
import logo from '../../assets/logo.png'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar';
const Navbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const onLogout = () => {
      Navigate("/login")
    };

    const handleSearch = () => {
      console.log('Searching for:', searchQuery);
    };
    const onClearSearch = () => {
      setSearchQuery('');
    } 
  return (
    
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        
        <img className='w-10 h-10 ' src={logo} alt="Logo"/>
        <h2 className='text-l font-medium text-black py-2'>ByteNotes</h2>
        <SearchBar value={searchQuery}
        OnChange={({target})=>
          {
            setSearchQuery(target.value);
          }}
           
           handleSearch={handleSearch}
           onClearSearch={onClearSearch}
         />
        <ProfileInfo onLogout={onLogout} />

      </div>
  )
}

export default Navbar
