import { useState, useEffect } from 'react';
import GroceryForm from './components/GroceryForm';
import GroceryList from './components/GroceryList';
import './style.css';

function App() {
    const [groceries, setGroceries] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    const fetchGroceries = async () => {
        const res = await fetch("http://localhost:8080/api/groceries");
        const data = await res.json();
        setGroceries(data);
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
