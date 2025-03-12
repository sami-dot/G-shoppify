/* eslint-disable react/prop-types */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUIStore from '../../../store/uiStore';
import useCartStore from '../../../store/cartStore';

// eslint-disable-next-line no-unused-vars
export default function ProductItem({ product, name }) {
  const showProductPreview = useUIStore(state => state.showProductPreview);
  const showCartList = useUIStore(state => state.showCartList);
  const openCart = useUIStore(state => state.openCart);
  const addToCart = useCartStore(state => state.addToCart);
  const handleAddToCart = () => {
    addToCart(product);
    openCart();
    showCartList();
  };
  const showPreview = () => {
    openCart();
    showProductPreview(product);
  };
  return (
    <>
      <div className='flex w-36 cursor-pointer items-center justify-between gap-1 rounded-xl border-2 border-transparent bg-white py-1 pl-3   shadow-md md:w-40'>
        <h1 onClick={showPreview} className='flex-1 py-1 text-xs font-semibold md:text-sm'>
          {name}
        </h1>
        <span onClick={handleAddToCart} className='grid h-10  place-items-center px-3'>
          <FontAwesomeIcon icon={faPlus} className='text-sm text-gray-400' />
        </span>
      </div>
    </>
  );
}
