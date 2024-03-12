import axios from 'axios';
import React, { useState } from 'react'

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  maxWidth: '500px',
  background: '#f9f9f9'
};

const inputStyle = {
  margin: '10px 0',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '90%',
};

const buttonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  background: '#007bff',
  color: 'white',
  cursor: 'pointer',
  marginTop: '20px'
};


const Add = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData,setFormData] = useState({

  
    details : {
      id:'',
      type:'',
      bedrooms:'',
      price:'',
      tenure:'',
      description:'',
      location:'',
      plan:'',
      url:'',
      postalCode:'',
      map:''
    },
    added: {
      month:'',
      day:0,
      year: 0
    },
    pictures: {
      picture:'',
      picture2:'',
      picture3:''
    }

    
  });

  const handleChange = (e)=>{
    const { name, value } = e.target;
    const [section, key] = name.split('.');
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value
      }
    }));
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/api/details/post',formData);
      if(response){
        console.log(response);
        alert("the item has added successfully ! ");
      }

    }catch(err){
      console.log(err);
    }

  }


  const Displaymessage = ()=>{
    return (
      <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalChoice">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-body p-4 text-center">
            <h5 className="mb-0">Enable this setting?</h5>
            <p className="mb-0">Would you like to add this property to sell ? .</p>
          </div>
          <div className="modal-footer flex-nowrap p-0">
            <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" onClick={handleSubmit} ><strong>Yes, enable</strong></button>
            <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0" data-bs-dismiss="modal">No thanks</button>
          </div>
        </div>
      </div>
    </div>
    );
  
  }


  

  
  return (
    <div style={formStyle}>
      <h1>Add a property !</h1>
    <form onSubmit={handleSubmit}>
    <div style={inputStyle}>
        <label>Property ID:</label>
        <input type="text" name="details.id" placeholder="prop9" value={formData.details.id} onChange={handleChange} style={inputStyle}/>
      </div>
      <div>
        <label>Type:</label>
        <input type="text" name="details.type" placeholder="House" value={formData.details.type} onChange={handleChange} style={inputStyle}/>
      </div>
      <div>
        <label>Bedrooms:</label>
        <input type="number" name="details.bedrooms" placeholder="1" value={formData.details.bedrooms} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="details.price" placeholder="500000" value={formData.details.price} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label>Tenure:</label>
        <input type="text" name="details.tenure" placeholder="Freehold" value={formData.details.tenure} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="details.description" placeholder="Description" value={formData.details.description} onChange={handleChange} style={inputStyle} ></textarea>
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="details.location" placeholder="No 09, Uswatte road, Moratuwa" value={formData.details.location} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label>Plan:</label>
        <input type="text" name="details.plan" placeholder="Url of the plan" value={formData.details.plan} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label>Postal code:</label>
        <input type="text" name="details.postalCode" placeholder="Enter the postal code" value={formData.details.postalCode} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label>map:</label>
        <input type="text" name="details.map" placeholder="Enter the map url" value={formData.details.map} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label>Month added:</label>
        <input type="text" name="added.month" placeholder="Enter the month" value={formData.added.month} onChange={handleChange} style={inputStyle} />
      </div>

      <div>
        <label>Day added:</label>
        <input type="number" name="added.day" placeholder="Enter the day" value={formData.added.day} onChange={handleChange} style={inputStyle} />
      </div>

      <div>
        <label>Year added:</label>
        <input type="number" name="added.year" placeholder="Enter the year" value={formData.added.year} onChange={handleChange} style={inputStyle} />
      </div>


      <div>
        <label>Picture URL:</label>
        <input type="text" name="pictures.picture" placeholder="URL for picture" value={formData.pictures.picture} onChange={handleChange} style={inputStyle}/>
      </div>
      <div>
        <label>Picture2 URL:</label>
        <input type="text" name="pictures.picture2" placeholder="URL for picture2" value={formData.pictures.picture2} onChange={handleChange} style={inputStyle}/>
      </div>
      <div>
        <label>Picture3 URL:</label>
        <input type="text" name="pictures.picture3" placeholder="URL for picture3" value={formData.pictures.picture3} onChange={handleChange} style={inputStyle}/>
      </div>
      <div>
         <button type="submit" style={buttonStyle}>Add Property</button>
      </div>
    </form>
  </div>
  )
}

export default Add