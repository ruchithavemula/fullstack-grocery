import { API_URL } from './config';

function GroceryList({ groceries, fetchGroceries, setEditingItem }) {

    const handleDelete = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchGroceries();
    };

    return (
        <div>
            <h2>Grocery List</h2>
            <ul>
                {groceries.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.quantity}
                        <button onClick={() => setEditingItem(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GroceryList;
