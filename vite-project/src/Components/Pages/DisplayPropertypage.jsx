import React, { useState, useEffect } from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import { useParams } from 'react-router-dom';
import '../CSS/property.css';
import axios from 'axios';

const DisplayPropertypage = () => {
  const { id } = useParams(); // Used params passed the id through the URL
  const [property, setProperty] = useState(null); // State to hold the fetched property
  const [toggleState, setToggleState] = useState(1);

  useEffect(() => {
    // Fetch property details based on the id parameter
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/details/id', { id });
        setProperty(response.data); // Assuming response.data is the property object
      
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchData();
  }, [id]);

  // Function to change the tab
  const toggleTab = (index) => {
    setToggleState(index);
  };
  
  // Check if property data is available before attempting to render it
  if (!property) {
    return <div>Loading...</div>;
  }


  // Construct slider images array from the pictures object
  
  const sliderImages = [
    { url:property.pictures.picture },
    { url: property.pictures.picture2 },
    { url: property.pictures.picture3 },
  ];

  const divStyle = (imageUrl) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '400px',
    backgroundImage: `url(${imageUrl})`,
  });
  


  function display(){
    console.log(sliderImages);
  }
display();

  return (
    <>
      <div className='coverPage1'>
        {/* Tab Navigation */}
        <div className='viewMoredetails'>
          <ul>
            <li className={toggleState === 1 ? "licolor" : ""} onClick={() => toggleTab(1)}>Details</li>
            <li className={toggleState === 2 ? "licolor" : ""} onClick={() => toggleTab(2)}>View Map</li>
            <li className={toggleState === 3 ? "licolor" : ""} onClick={() => toggleTab(3)}>Floor plan</li>
          </ul>
        </div>

        {/* Details Tab */}
        <div className={toggleState === 1 ? "detailOfthepage" : "nonDisplay"}>
          <div className='slide-container'>
            <Fade>
              {sliderImages.map((image, index) => (
                <div key={index}>
                 <div key={index} className="Img" style={divStyle(image.url)}></div>
                </div>
              ))}
            </Fade>
          </div>
          <div className='detail'>
            {/* Property Details */}
            <div className='more'>
              <p>Price: {property.details.price}</p>
              <p>Location: {property.details.location}</p>
              <p>Type: {property.details.type}</p>
              <p>Description: {property.details.description}</p>
            </div>
          </div>
        </div>

        {/* Map Tab */}
        {toggleState === 2 && (
          <div className="detailOfthepage">
            <iframe src={property.details.map}
              width="1000"
              height="1000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className='iframe'>
            </iframe>
          </div>
        )}

        {/* Floor Plan Tab */}
        {toggleState === 3 && (
          <div className="detailOfthepage">
            <img className='floorPlan' src={property.details.plan} alt="No Image" />
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayPropertypage;
