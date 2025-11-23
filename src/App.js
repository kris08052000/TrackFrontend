import { useEffect, useState } from 'react';
import './App.css';
import { getItems, createItem, deleteItem, updateItem, me } from './Api';
import Header from './design/Header';
import Footer from './design/Footer';
import { Routes, Route, useNavigate, replace } from 'react-router-dom';
import Home from './design/Home';
import Additem from './components/Additem';
import AuthModal from "./design/AuthModal";

function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  // Check token & fetch user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) me(token).then(setUser).catch(() => setUser(null));
  }, []);

  // Load items
  const loadItems = async () => {
    try { setItems((await getItems()).data); } 
    catch (err) { console.error(err); }
  };
  useEffect(() => { loadItems(); }, []);

  // Add or update
  const handleAddOrUpdate = async (item) => {
    try {
      item.id ? await updateItem(item.id, item) : await createItem(item);
      setItemToEdit(null);
      loadItems();
      navigate("/");
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => { if (window.confirm("Delete this item?")) { await deleteItem(id); loadItems(); } };
  const handleEdit = (item) => { setItemToEdit(item); navigate("/Additem"); };
  const handleAddNew = () => { setItemToEdit(null); navigate("/Additem", {replace : true}); };

  return (
    <>
      <Header 
        isLoggedIn={!!user} 
        user={user} 
        setShowAuthModal={setShowAuthModal} 
        onLogout={() => { localStorage.removeItem("token"); setUser(null); }}
      />

      {showAuthModal && (
        <AuthModal 
          closeModal={() => setShowAuthModal(false)} 
          onLogin={async (data) => {
            localStorage.setItem("token", data.token);
            setShowAuthModal(false);
            try { setUser(await me(data.token)); } 
            catch (err) { console.error(err); }
          }} 
        />
      )}

      <Routes>
        <Route path="/" element={
          <Home items={items} onDelete={handleDelete} onEdit={handleEdit} onAddNew={handleAddNew} user={user} setItemToEdit={setItemToEdit}/>
        }/>
        <Route path="/Additem" element={
          user ? <Additem key={itemToEdit?.id || "new"} onAdd={handleAddOrUpdate} itemToEdit={itemToEdit} clearEdit={() => setItemToEdit(null)} /> 
            : <div className='p-6 text-center text-red-600 font-semibold'>Please login/signup to add items.</div>
        }/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;