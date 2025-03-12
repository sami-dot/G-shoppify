/* eslint-disable react/prop-types */
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import useCartStore from '../../../store/cartStore';

export function CartItem({ product }) {
  const [show, setShow] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearProductFromCart = useCartStore(state => state.clearProductFromCart);
  const handleDeleteFromCart = () => {
    clearProductFromCart(product);
  };
  const handleRemoveFromCart = () => {
    removeFromCart(product);
  };
  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <>
      <div className='mx-3 my-2 flex select-none items-center justify-between py-2'>
        <h3
          onClick={() => setShow(!show)}
          className='max-w-[150px] cursor-pointer overflow-hidden text-ellipsis text-base font-semibold'
        >
          {product.name}
          {/* Apple */}
        </h3>
        {show ? (
          <div className='flex items-center justify-between rounded-xl bg-white'>
            <div
              onClick={handleDeleteFromCart}
              className='mr-2 cursor-pointer rounded-xl bg-clrOrangePeel px-2  py-2 '
            >
              <FontAwesomeIcon icon={faTrash} className='text-white' />
            </div>
            <span onClick={handleAddToCart} className='cursor-pointer px-1 py-2'>
              <FontAwesomeIcon icon={faPlus} className='text-clrOrangePeel ' />
            </span>
            <p
              onClick={() => setShow(false)}
              className='cursor-pointer rounded-2xl border-2 border-clrOrangePeel  bg-transparent px-2  py-1 text-sm'
            >
              {product.quantity} pcs
            </p>
            <span onClick={handleRemoveFromCart} className='cursor-pointer px-1  py-2'>
              <FontAwesomeIcon icon={faMinus} className='text-clrOrangePeel' />
            </span>
          </div>
        ) : (
          <div className='flex items-center justify-between'>
            {/* just to get the ui */}
            <div className=' w-0 rounded-xl py-2'>
              <FontAwesomeIcon icon={faTrash} className='text-transparent' />
            </div>
            {/* just to get the ui */}
            <p
              onClick={() => setShow(true)}
              className=' cursor-pointer rounded-2xl border-2 border-clrOrangePeel bg-transparent  px-2 py-1 text-sm'
            >
              {product.quantity} pcs
            </p>
          </div>
        )}
      </div>
    </>
  );
}
