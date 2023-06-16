import React from 'react';

const ShopCard = ({shop}) => {

  return (
    <div className="items-center justify-center p-4 m-2 bg-white shadow-2xl rounded-xl" style={{ width: '40vh' }}>
      <div className="flex flex-row justify-center items-center">
        <img className="w-30 h-30" src={shop.image} alt={shop.id} />
      </div>
      <p>{shop.name}</p>
    </div>
  )
}

export default ShopCard;