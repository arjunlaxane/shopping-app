import React, { useContext, useReducer } from 'react';
import { createContext } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducers';

//children will come from index.js. as it is a point where our app starts

const Cart = createContext();
faker.seed(1); //as faker gives random data so we will use faker.seed(99) to get only 1 type of data i.e. constant data

//here faker will give u 20 undefined array elements
const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.fashion(),
    inStock: faker.random.numeric(1),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.numeric(1),
  }));

  // console.log(products);

  // console.log(children);//big object
  //usereducer for cart

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  console.log(state);
  // console.log(cartReducer);

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: '',
  });

  console.log(productState);

  //here we r sending both state and dispatch through our context. Thus we have created context with reducer...see below
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

//now we need to export above context.So we will create a function here CartState and then export it.

//to access above context we will use usecontext and pass our created context into it
export const CartState = () => {
  return useContext(Cart);
};

export default Context;
