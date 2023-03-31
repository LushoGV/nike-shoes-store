import { product } from '@/pages';
import {BsHeart} from 'react-icons/bs'
import GridSizes from './GridSizes';

type Props = {
    product: product
}

const ImageDescription = (props: Props) => {
  return (
    <section className='px-4 lg:px-16 flex flex-col mt-8 lg:mt-0'>
    <h1 className='font-semibold text-2xl lg:text-3xl '>{props.product?.title}</h1>
    <span className='py-1 text-lg'>{props.product?.subtitle}</span>
    <span className='py-4 text-lg'>${props.product?.price}</span>

    <GridSizes/>
        
    <section className='my-9'>
        <button className='bg-black w-full rounded-full py-[14px] text-white font-semibold hover:bg-opacity-90'>
          Add to cart
        </button>
        
        <button className='border-[1px] border-black w-full rounded-full py-[14px] font-semibold flex justify-center items-center mt-2'>
          <span className='mr-3'>Favorites</span>
          <BsHeart/>
        </button>
    </section>

    <section className='flex flex-col my-1'>
      <span className='text-slate-700 font-semibold'>
        Product Details
      </span>
      <p className='max-w-sm my-3'>
        {props.product?.description}
      </p>
      
      <ul className='px-5 mt-1'>
        <li className='list-disc mb-2'>Color Shown: {props.product?.colors}</li>
        <li className='list-disc'>Style: {props.product?.style}</li> 
      </ul>

    </section>
        
  </section>
  )
}

export default ImageDescription