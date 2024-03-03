import React, { useContext, useEffect, useState } from "react";
import "../CSS/search.css";
import propertiesData from "../../ApICall/properties.json";
import DisplayPropertypage from "./DisplayPropertypage";
import { Link } from "react-router-dom";
import displayimage from "../images/Display.jpg";
import Favourite from "./Favourite";
import { UserContext } from "../../App";
import axios from "axios";

const Search = () => {
  const [searchCity, setSearchCity] = useState([]);
  const { api, setApi } = useContext(UserContext);
  const [toggleState, setToggleState] = useState(1);

  const [searchClass, setSearchClass] = useState({
    type: "",
    price: "",
    count: 0,
    postalCode: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSearchCity(propertiesData.properties); //set the object to the setter
        const response = await axios.get(
          "http://localhost:3000/api/details/get"
        );
        setApi(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(api);
  }, [api]);

  const handleCitySearch = (e) => {
    e.preventDefault();

    const filteredCityProps = api.filter((property) => {
      const typeMatch = property.details.type
        .toLowerCase()
        .includes(searchClass.type.toLowerCase());

      const priceMatch =
        property.details.price == searchClass.price || searchClass.price === "";
      const countMatch =
        property.details.bedrooms === searchClass.count ||
        searchClass.count === 0;
      const postalCodeMatch =
        property.details.postalCode == parseInt(searchClass.postalCode, 10) ||
        searchClass.postalCode === 0;

      return typeMatch && priceMatch && countMatch && postalCodeMatch;
    });

    setApi(filteredCityProps); //set the filtered property.
    localStorage.setItem("searchCriteria", JSON.stringify(searchClass)); //store the selected properties
  };

  const handleAddToFavorites = async (property) => {
    console.log(property);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/favourites/favourites",
        {details:property.details,added:property.added,pictures:property.pictures}
      );
      alert("You have added the item successfully!");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const removerItem = (Property) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updateFavourites = storedFavorites.filter(
      (include) => include.id !== Property.id
    );

    localStorage.setItem("favorites", JSON.stringify(updateFavourites));
    alert("You have succesfully deleted the item !");
  };

  return (
    <>
      <div>
        <div className={toggleState === 1 ? "IncludeForm" : "dipsplayNone"}>
          <div className="Heading1">
            <h1>Believing In Find It</h1>
          </div>
          <div className="Para">
            <p className="para1">
              Search properties for sale and to rent in the UK
            </p>
          </div>
          <div className="Including">
            <div>
              <img
                src={displayimage}
                alt="noImage"
                width="500px"
                height="500px"
              />
            </div>
            <form onSubmit={handleCitySearch} className="Formdata">
              <input
                type="text"
                id="accommodationType"
                placeholder="Enter the type"
                onChange={(e) =>
                  setSearchClass({ ...searchClass, type: e.target.value })
                }
              />
              <input
                type="text"
                id="accommodationPrice"
                placeholder="Enter the Price"
                onChange={(e) =>
                  setSearchClass({ ...searchClass, price: e.target.value })
                }
              />
              <input
                type="text"
                id="accommodationBedrooms"
                placeholder="room Count"
                onChange={(e) =>
                  setSearchClass({
                    ...searchClass,
                    count: parseInt(e.target.value, 10),
                  })
                }
              />
              <input
                type="text"
                id="accommodationpostalCode"
                placeholder="Postal Code"
                onChange={(e) =>
                  setSearchClass({
                    ...searchClass,
                    postalCode: parseInt(e.target.value, 10),
                  })
                }
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>

        <div className={toggleState == 1 ? "details" : "dipsplayNone"}>
          {api && api.length > 0 ? (
            api.map((item,index) => (
              <div className="details_of_scheme" key={item.id || index}>
                <div className="card">
                  <img
                    src={item.pictures.picture}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.type}</h5>
                    {/* <p className='card-text'>{item.description}</p> */}
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Bedrooms: {item.bedrooms}
                    </li>
                    <li className="list-group-item">
                      Added: {item.added.month}.{item.added.day}.
                      {item.added.year}
                    </li>
                    <li className="list-group-item">Price: {item.price}Rs</li>
                  </ul>
                  <div className="card-body">
                    <Link to={`/displayhome/${item.id}`} className="card-link">
                      {" "}
                      Click here to view information
                    </Link>
                  </div>
                  <div className="card-body btn2">
                    <button
                      type="button"
                      className="btn btn-success plus"
                      onClick={() => handleAddToFavorites(item)}
                    >
                      {" "}
                      +{" "}
                    </button>
                    <button
                      type="button"
                      className="btn btn-success minos"
                      onClick={() => removerItem(item)}
                    >
                      {" "}
                      -{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No results found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
