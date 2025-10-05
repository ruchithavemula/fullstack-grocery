import { useState, useEffect } from 'react';
import GroceryForm from './components/GroceryForm';
import GroceryList from './components/GroceryList';
import { API_URL } from './config';
import './style.css';

function App() {
    const [groceries, setGroceries] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    const fetchGroceries = async () => {
        try {
            const res = await fetch(API_URL);  // use API_URL from config.js
            if (!res.ok) throw new Error("Failed to fetch groceries");
            const data = await res.json();
            setGroceries(data);
        } catch (err) {
            console.error("Error fetching groceries:", err);
            alert("Cannot connect to backend. Make sure the backend is running!");
        }
    };

    useEffect(() => {
        fetchGroceries();
    }, []);

    const handleUpdate = () => {
        setEditingItem(null);
        fetchGroceries();
    };

    return (
        <div>
            <h1>Grocery Management System</h1>
            <GroceryForm
                fetchGroceries={fetchGroceries}
                editingItem={editingItem}
                onUpdate={handleUpdate}
                onCancel={() => setEditingItem(null)}
            />
            <GroceryList
                groceries={groceries}
                setEditingItem={setEditingItem}
                fetchGroceries={fetchGroceries}
            />
        </div>
    );
}

export default App;
