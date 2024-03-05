import { useEffect, useState } from "react";
import '../CSS/favourite.css';
import axios from 'axios';

function Favourite() {
  const [items, setItems] = useState([]);
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/register/displayFavourites', { username, password });
        
        if (response && response.data) {
          setItems(response.data.favorites);
          
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [username, password]);

  const handleDelete = async (id) => {
    try {
      console.log( id);

      const response = await axios.post('http://localhost:3000/api/delete/delete', {id:id, username, password })
      if (response.status === 200) {
        alert("Item has been deleted successfully!");
        // Update items state to reflect deletion
        setItems(currentItems => currentItems.filter(item => item.id !== id));
      } else {
        alert("The item has not been deleted yet.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete the item.");
    }
  };

  return (
    <div className="introhead">
      <div className="heading1">
        <h1>Favourite Page</h1>
      </div>
      <div>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="favour">
              <div className="img">
                <img src={item.pictures} alt="No Picture" />
              </div>
              <div className="content">
                <div className="descrip">
                  <p>Type: {item.type}</p>
                  <p>Price: {item.price}</p>
                  <p>Location: {item.location}</p>
                  <p>Bedrooms: {item.bedrooms}</p>
                  <p>Description: {item.description}</p>
                </div>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <h1>Nothing here to display!</h1>
        )}
      </div>
    </div>
  );
}

export default Favourite;
