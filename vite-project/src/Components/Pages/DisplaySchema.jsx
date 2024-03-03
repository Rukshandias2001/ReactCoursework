import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../App';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/search.css';





const DisplaySchema = () => {
  const {api,setApi} = useContext(UserContext);

  useEffect(()=>{
    const displayData = async()=>{
      const response = await axios.get("http://localhost:3000/api/details/get");
        setApi(response.data);
    }
    displayData();
  },[]);


  useEffect(() => {
    console.log(api); // Logs the updated state after changes
  }, [api]); 


  return (
    <div>
      <h1>Display home</h1>
      
      {api.map((item) => (
  <div className='details_of_scheme' key={item.id} id={item.id}>
    <div className='card'>
      <img src={item.pictures.picture} className='card-img-top' alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>{item.details.type}</h5>
        {/* <p className='card-text'>{item.description}</p> */}
      </div>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item'>Bedrooms: {item.details.bedrooms}</li>
        <li className='list-group-item'>
          Added: {item.added.month}.{item.added.day}.{item.added.year}
        </li>
        <li className='list-group-item'>Price: {item.details.price}Rs</li>
      </ul>
      <div className='card-body'>
        <Link to={`/displayhome/${item.id}`} className='card-link'> Click here to view information</Link>
      </div>
      <div className='card-body btn2'>
        <button type="button" className="btn btn-success plus"> + </button> 
        <button type="button" className="btn btn-success minos"> - </button> 
      </div>
    </div>
  </div>
))}

     </div>

  )
}

export default DisplaySchema