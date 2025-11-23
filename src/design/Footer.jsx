import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-10 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white relative">

            <div className="backdrop-blur-md bg-white/20 border-t border-white/30 py-6 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">

                    {/* ABOUT */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Track Prices</h3>
                        <p className="text-white/90 text-sm">
                            Smartly track and organize your items, prices and lists.  
                            Fast. Simple. Beautiful.
                        </p>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Quick Links</h3>
                        <ul className="space-y-1 text-white/90 text-sm">

                            <li className="hover:text-white transition cursor-pointer">
                                <Link to="/">Home</Link>
                            </li>

                            <li className="hover:text-white transition cursor-pointer">
                                <Link to="/add">Add Items</Link>
                            </li>

                            <li className="hover:text-white transition cursor-pointer">
                                <Link to="/items">All Items</Link>
                            </li>

                            <li className="hover:text-white transition cursor-pointer">
                                <Link to="/prices">All Prices</Link>
                            </li>

                        </ul>
                    </div>

                    {/* SOCIAL - Same as before */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Connect</h3>
                        <div className="flex justify-center sm:justify-start gap-4 mt-2">

                            <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/40 transition cursor-pointer backdrop-blur-md">
                                <i className="fa-brands fa-instagram text-white"></i>
                            </div>

                            <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/40 transition cursor-pointer backdrop-blur-md">
                                <i className="fa-brands fa-twitter text-white"></i>
                            </div>

                            <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/40 transition cursor-pointer backdrop-blur-md">
                                <i className="fa-brands fa-github text-white"></i>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Line */}
                <div className="border-t border-white/30 mt-6 pt-3 text-center text-white/80 text-sm">
                    © {new Date().getFullYear()} • Track Prices • All Rights Reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;