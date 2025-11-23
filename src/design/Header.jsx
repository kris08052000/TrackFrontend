import { Link } from "react-router-dom";
import Profile from "./Profile";

const Header = ({ isLoggedIn, setShowAuthModal, onLogout, user }) => {
    return (
        <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="logo.jpg"
                        alt="Track Prices"
                        className="w-16 h-auto rounded-md shadow-md"
                    />
                    <h1 className="text-white text-xl font-bold tracking-wide">
                        Track Prices
                    </h1>
                </Link>

                {isLoggedIn ? (
                <Profile user={user} onLogout={onLogout} />
                ) : (
                <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 bg-white/30 text-white rounded-lg shadow hover:bg-white/40 transition"
                >
                    Login / Sign Up
                </button>
                )}
            </div>
        </header>
    );
};

export default Header;