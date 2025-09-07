import { useState, useEffect } from 'react';
import { API_URL } from './config';

function GroceryForm({ fetchGroceries, editingItem, onUpdate, onCancel }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        if (editingItem) {
            setName(editingItem.name);
            setQuantity(editingItem.quantity);
        } else {
            setName("");
            setQuantity("");
        }
    }, [editingItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingItem) {
            const res = await fetch(`${API_URL}/${editingItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, quantity: parseInt(quantity) }),
            });
            if (res.ok) onUpdate();
        } else {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, quantity: parseInt(quantity) }),
            });
            if (res.ok) fetchGroceries();
        }
        setName("");
        setQuantity("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Grocery Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            <button type="submit">{editingItem ? "Update" : "Add Item"}</button>
            {editingItem && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
}

export default GroceryForm;
