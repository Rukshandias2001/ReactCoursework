import React, { useEffect, useState } from 'react';
import '../CSS/search.css';
import propertiesData from '../../ApICall/properties.json';
import DisplayPropertypage from './DisplayPropertypage';
import { Link } from 'react-router-dom';
import displayimage from '../images/Display.jpg'


const Search = ({ favorites, onAddToFavorites }) => {
  
  const [searchCity, setSearchCity] = useState([]);
  const [searchFavorites, setSearchFavorites] = useState([]);

  
  
  const [searchClass, setSearchClass] = useState({
    type: '',
    price: '',
    count: 0,
    postalCode: 0,
  });
  const [input, setInput] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
 
   

  const fetchData = async () => {
    try {
      setSearchCity(propertiesData.properties);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedSearchCriteria = JSON.parse(localStorage.getItem('searchCriteria'));
    if(storedSearchCriteria){
      setSearchCity(storedSearchCriteria)
      fetchData();
    }else{
      fetchData();
    }
   
    
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
  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    
  };

  const handleAddToFavorites = (property) => {
    console.group(property);
   
    
      onAddToFavorites(property);
      console.log(onAddToFavorites);
      alert("You have added the item successfully!")
    

  
    
    
  };
  return (
    <div>
      <div className='IncludeForm'>
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

      <div className='details'>
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
                <div className='card-body'>
                <button type="button" className="btn btn-success"  onClick={() => handleAddToFavorites(item)}>Add </button> 
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
   
  );
};

export default Search;
