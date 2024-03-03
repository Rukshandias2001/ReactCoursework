import { useEffect, useState } from "react";
import '../CSS/favourite.css'


function Favourite({ object }) {
  // Create a Set to keep track of unique item.id values
  const uniqueIds = new Set();
  const [items, setItems] = useState(object);
  // Retrieve favorites from localStorage on component mount
  const storedFavorites = JSON.parse(localStorage.getItem('favorites'))||[];
  useEffect(()=>{
    setItems(storedFavorites);
  },[storedFavorites]);

  const handleDelete = ((itemId)=>{
    const updatedFavorites = items.filter((item)=>item.id!==itemId);
    setItems(updatedFavorites);
    localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
    
  })

  return (
    <div>
      <div className="heading1">
      <h1>Favourite Page</h1>
      </div>
      
    <div>
        {items
          .filter((item) => {
            // Only render items with unique item.id values
            if (!uniqueIds.has(item.id)) {
              uniqueIds.add(item.id);
              return true;
            }
            return false;
          })
        
          .map((item) => (
            <div key={item.id} className="favour">
             <div className="img">
              <img src={item.picture} alt="No Picture" />
             </div>
             <div className="content">
               
                <div className="descrip">
                   <p>type: {item.type}</p> 
                    <p>price : {item.price}</p>
                    <p>location: {item.location}</p>
                    <p>bedrooms: {item.bedrooms}</p>
                    <p> description: {item.description}</p>
                </div>
                <button onClick={()=>handleDelete(item.id)}>Delete</button>
              </div>
             
             

              
            </div>
          ))}
      </div>
    </div>
  );
}

export default Favourite;
