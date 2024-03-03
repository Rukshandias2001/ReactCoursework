import React, { useState, useEffect } from 'react';
import propertiesData from '../../ApICall/properties.json';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import { useParams } from 'react-router-dom';
import '../CSS/property.css';


const DisplayPropertypage = () => {
  const { id } = useParams();//used params passed the id through the  url
  const [searchCity, setSearchCity] = useState([]);
  const [toggleState,setToggleState] = useState(1);


  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    backgroundSize: 'cover',
    width: '400px',
    
  };

  const spanStyle = {
    fontSize: '20px',
    background: '#efefef',
    color: '#00000',
  };

  useEffect(() => {
    // Filter properties based on the id parameter
    const filteredCityProps = propertiesData.properties.filter((props) => props.id === id);//get the property of the relevant ID where I passed through the url
    setSearchCity(filteredCityProps);
  }, [id]); // Ensure useEffect runs only when id changes

  const sliderImages = [
    {
      url: searchCity[0]?.picture,
    },
    {
      url: searchCity[0]?.picture2,
    },
    {
      url: searchCity[0]?.picture3,
    },
  ];
  const toggleTab =(index)=>{
    setToggleState(index);
    
  }
  
  return (
    <>
    <div className='coverPage1'>
    <div className='viewMoredetails'>
      <ul>
        
        <li className={toggleState===1 ? "licolor":""} onClick={()=>toggleTab(1)} >Details</li>
        <li className={toggleState===2 ? "licolor":""} onClick={()=>toggleTab(2)}>View Map</li>
        <li className={toggleState===3 ? "licolor":""} onClick={()=>toggleTab(3)}>Floor plan</li>
      </ul>
    </div>
    <div  className={toggleState===1 ? "detailOfthepage":"nonDisplay"}>
          <div className='slide-container' >
            <Fade>
              {sliderImages.map((image, index) => (
                // Add the return statement here
                <div key={index}>
                  <div  className= "Img" style={{ ...divStyle, backgroundImage: `url(${image.url})` }}>
                    <span style={spanStyle}>{image.caption}</span>
                  </div>
                </div>
              ))}
            </Fade>
          </div>
          <div className='detail'>
              {searchCity.map((item) => (
                <div key={item.id} className='more'>
                  <p>Price : {item.price}</p>
                  <p>Location :{item.location}</p>
                  <p>type : {item.type}</p>
                  <p>description :{item.description}</p>
                </div>
              ))}
          </div>
         
    </div>
    
      <div className={toggleState===2 ? "detailOfthepage":"nonDisplay"}>
      {searchCity.map((item) => (
          <div key={item.id}>
              <iframe src={item.map}
                 width="800" 
                height="700" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" className='iframe'>
              </iframe>
         </div>
        ))}
      </div>
      <div className={toggleState===3 ? "detailOfthepage":"nonDisplay"}>
      {searchCity.map((item) => (
          <div key={item.id}>
              <div>
                <img className='floorPlan' src={item.plan} alt="No Image" />
              </div>
         </div>
        ))}
      </div>

    </div>
   
   
      
    
   
  </>
    

  );
};

export default DisplayPropertypage;
