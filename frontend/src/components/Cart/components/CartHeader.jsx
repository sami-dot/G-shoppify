import useUIStore from '../../../store/uiStore';

export function CartHeader() {
  const showProductAddForm = useUIStore(state => state.showProductAddForm);

  const showAddItem = () => {
    showProductAddForm();
  };
  return (
    <>
      <div className='relative flex min-h-[130px] items-center rounded-2xl bg-clrRosyFinch py-2'>
        <img className='h-42 absolute -top-5 left-5' src='./bottle.svg' alt='' />
        <div className='ml-28 space-y-2 text-white'>
          <h3 className='text-lg font-semibold'>Don&apos;t find what you need?</h3>
          <button
            onClick={showAddItem}
            className='rounded-xl bg-white px-6 py-2 font-semibold text-black'
          >
            Add item
          </button>
        </div>
      </div>
    </>
  );
}
