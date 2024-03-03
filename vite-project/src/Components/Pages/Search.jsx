import React, { useEffect, useState } from 'react';
import '../CSS/search.css';
import propertiesData from '../../ApICall/properties.json';
import DisplayPropertypage from './DisplayPropertypage';
import { Link } from 'react-router-dom';
import displayimage from '../images/Display.jpg'
import Favourite from './Favourite';


const Search = () => {
  
  const [searchCity, setSearchCity] = useState([]);
  const [favouriteDetails,setFavouriteDetail]= useState([]);
  const [toggleState,setToggleState] = useState(1);
  const [fav,setFav]=useState([1]);


 

  

  
  
  const [searchClass, setSearchClass] = useState({
    type: '',
    price: '',
    count: 0,
    postalCode: 0,
  });
  
 
   

  const fetchData = async () => {
    try {
      setSearchCity(propertiesData.properties);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const handleCitySearch = (e) => {
    e.preventDefault();

    const filteredCityProps = propertiesData.properties.filter((property) => {
      const typeMatch = property.type.toLowerCase().includes(searchClass.type.toLowerCase());
      const priceMatch = property.price == searchClass.price || searchClass.price === '';
      const countMatch = property.bedrooms === searchClass.count || searchClass.count === 0;
      const postalCodeMatch =
        property.postalCode == parseInt(searchClass.postalCode, 10) || searchClass.postalCode === 0;

      return typeMatch && priceMatch && countMatch && postalCodeMatch;
    });

    setSearchCity(filteredCityProps);
    localStorage.setItem('searchCriteria', JSON.stringify(searchClass))
  };
  

  const handleAddToFavorites = (property) => {
    setFavouriteDetail((prevFavorites) => [...prevFavorites, property]);
    localStorage.setItem('favorites', JSON.stringify([...favouriteDetails, property]));
    alert('You have added the item successfully!');
  };
  const removerItem = (Property)=>{
    const updateFavourites = favouriteDetails.filter((include)=>include.id!==Property.id);
    setFavouriteDetail(updateFavourites);
    localStorage.setItem('favorites', JSON.stringify(updateFavourites));
    alert("You have succesfully deleted the item !")

  };

  
  const toggleTab =(index)=>{
    setToggleState(index);
    
  }
  const favTab =(index)=>{
    setFav(index);
  }
  return (
    <>
      <div className='displayPage'>
          <ul>
            <li onClick={()=>toggleTab(1)}>
              ViewProperties
            </li>
            <li onClick={()=>toggleTab(2)}>
              FavoutitePage
            </li>
          </ul>
      </div>
    <div>
      <div className={toggleState===2 ? "detaildisplay":"dipsplayNone"}>
        <Favourite object={favouriteDetails}/>
      </div>
     
      <div  className={toggleState===1 ? "IncludeForm":"dipsplayNone"}>
        <div className='Heading1'>
          <h1>Believing In Find It</h1>
        </div>
        <div>
          <p className='para1'>Search properties for sale and to rent in the UK</p>
        </div>
        <div className='Including'>
          <div>
            <img src={displayimage} alt="noImage" width="500px" height="500px" />
          </div>
          <form onSubmit={handleCitySearch} className='Formdata'>
            <input
              type='text'
              id='accommodationType'
              placeholder='Enter the type'
              onChange={(e) => setSearchClass({ ...searchClass, type: e.target.value })}
            />
            <input
              type='text'
              id='accommodationPrice'
              placeholder='Enter the Price'
              onChange={(e) => setSearchClass({ ...searchClass, price: e.target.value })}
            />
            <input
              type='text'
              id='accommodationBedrooms'
              placeholder='room Count'
              onChange={(e) => setSearchClass({ ...searchClass, count: parseInt(e.target.value, 10) })}
            />
            <input
              type='text'
              id='accommodationpostalCode'
              placeholder='Postal Code'
              
              onChange={(e) => setSearchClass({ ...searchClass, postalCode: parseInt(e.target.value, 10) })}
            />
            <button type='submit'>Search</button>
          </form>
        </div>
      </div>

      <div className={toggleState==1 ? "details":"dipsplayNone"}>
        {searchCity && searchCity.length > 0 ? (
          searchCity.map((item) => (
            <div className='details_of_scheme' key={item.id}>
              <div className='card'>
                <img src={item.picture} className='card-img-top'  alt='...' />
                <div className='card-body'>
                  <h5 className='card-title'>{item.type}</h5>
                  {/* <p className='card-text'>{item.description}</p> */}
                </div>
                <ul className='list-group list-group-flush'>
                 
                  <li className='list-group-item'>Bedrooms: {item.bedrooms}</li>
                  <li className='list-group-item'>
                    Added: {item.added.month}.{item.added.day}.{item.added.year}
                  </li>
                  <li className='list-group-item'>Price: {item.price}Rs</li>
                 
                </ul>
                <div className='card-body'>
                  <Link to={`/displayhome/${item.id}` }className='card-link'> Click here to view information</Link>
                </div>
                <div className='card-body btn2'>
                  <button type="button" className="btn btn-success"  onClick={() => handleAddToFavorites(item)}> + </button> 
                  <button type="button" className="btn btn-success minos"  onClick={() => removerItem(item)} > - </button> 
                </div>
                
              </div>
            </div>
          ))
        ) : (
          <h1>No results found</h1>
        )}
      </div>
      {/* {selectedProperty && (
      <DisplayPropertypage property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    )} */}
    </div>
   
    </>
    
  );
};

export default Search;
