import React, { useState, useContext, useEffect, useCallback } from 'react';
import * as Api from '../../../api';
import { useNavigate, useLocation } from 'react-router-dom';
import ShopCard from '../../components/shop/shopcard';

function Shop() {

  const [shopList, setShopList] = useState([
    {
      id: 1,
      image: "https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg",
      name: "쿠팡"
    },
    {
      id: 2,
      image: "https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_640.jpg",
      name: "이마트"
    },
    {
      id: 3,
      image: "https://cdn.pixabay.com/photo/2016/03/10/18/44/top-view-1248955_640.jpg",
      name: "롯데마트"
    },
    {
      id: 4,
      image: "https://cdn.pixabay.com/photo/2015/05/30/01/18/vegetables-790022_640.jpg",
      name: "집앞마당"
    },
  ])

  return (
    <div>
      <div className="headerSection" style={{ height: '150px' }}></div>
      <div className="flex flex-wrap justify-center w-full">
        {shopList.map((shop) => (
          <div key={shop.id} className="w-1/2 p-2">
            <ShopCard shop={shop} />
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Shop;