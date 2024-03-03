import { useEffect, useState } from "react";
import '../CSS/favourite.css'
import axios from 'axios';

function Favourite() {
  // Retrieve favorites from localStorage on component mount
  
  
  
  
  // Create a Set to keep track of unique item.id values
  const uniqueIds = new Set();
  const [items, setItems] = useState([]);
  
  // useEffect to update the state with favorites from localStorage

  
  useEffect(() => {
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://localhost:3000/api/favourites/getFavourite');
        setItems(response.data);

      }catch(err){
        console.log(err);
      }
    }
    
    fetchData();
  }, []);


  useEffect(()=>{
    console.log(items);
  },[items]);
  
  // const updateTheItems = ()=>{
  //   setItems(storedFavorites);
    
  // }

  // Handle deletion of an item
  const handleDelete = (itemId) => {
   console.log(itemId);
   const fetchdata = async()=>{
    const response = axios.post("http://localhost:3000/api/favourites/delete",{id:itemId});
    if((await response).status==200){
      alert("item has been deleted successfully ! ");

    }else{
      alert("the item has not been deleted yet");
    }
   }
   fetchdata();
  };

  return (
    <div className="introhead">
      <div className="heading1">
        <h1>Favourite Page</h1>
        {/* <button type="button" className="btn btn-danger redbutton" onClick={updateTheItems}>Update</button> */}
      </div>
      <div>
        {items.map((item,index) => (
            <div key={index} className="favour">
              <div className="img">
                <img src={item.pictures.picture} alt="No Picture" />
              </div>
              <div className="content">
                <div className="descrip">
                  <p>type: {item.details.type}</p> 
                  <p>price : {item.details.price}</p>
                  <p>location: {item.details.location}</p>
                  <p>bedrooms: {item.details.bedrooms}</p>
                  <p> description: {item.details.description}</p>
                </div>
                
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.details.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Favourite;
