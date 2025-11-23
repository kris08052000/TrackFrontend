import '../App.css';

const Profile = ({ user, onLogout }) => {
  return (
    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-md">
      
      {/* Profile Image: use first letter of email */}
      {/* <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 shadow-lg flex items-center justify-center text-white font-bold">
        {user?.email?.[0].toUpperCase() || "U"}
      </div> */}

      {/* User Email */}
      <span className="text-white font-semibold">{user?.email}</span>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="ml-2 px-3 py-1 rounded-lg bg-white/30 text-white font-semibold hover:bg-white/40 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;