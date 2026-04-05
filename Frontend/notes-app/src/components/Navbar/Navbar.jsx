import React from 'react'
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar';
const Navbar = ({userInfo,onSearchNote,onClearSearch}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
 const navigate = useNavigate();

const onLogout = () => {
  localStorage.clear();
  navigate("/login"); // ✅ correct
};

    const handleSearch = () => {
      if(searchQuery)
      {
        onSearchNote(searchQuery);
      }
    };

   const handleClearSearch = () => {
  setSearchQuery('');
  onClearSearch && onClearSearch(); // call parent too
};
  return (
    
      <div className="bg-white flex items-center px-6 py-2 drop-shadow">

  {/* LEFT: Logo + Title */}
  <div className="flex items-center gap-2">
    <img className="w-10 h-10" src={logo} alt="Logo" />
    <h2 className="text-lg font-medium text-black">ByteNotes</h2>
  </div>

  {/* CENTER: Search */}
  <div className="flex-1 flex justify-center">
    <SearchBar
      value={searchQuery}
      OnChange={({ target }) => setSearchQuery(target.value)}
      handleSearch={handleSearch}
      onClearSearch={handleClearSearch}
    />
  </div>

  {/* RIGHT: Profile */}
  <ProfileInfo userInfo={userInfo} onLogout={onLogout} />

</div>
  )
}

export default Navbar
