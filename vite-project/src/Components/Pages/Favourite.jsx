

import React from 'react';

const Favourite = ({ favorites }) => {
  console.log(favorites);
  console.log("clicked")
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map((item) => (
        <div key={item.id}>
          <p>{item.type}</p>
          {/* Add other properties you want to display */}
        </div>
      ))}
    </div>
  );
};

export default Favourite;
