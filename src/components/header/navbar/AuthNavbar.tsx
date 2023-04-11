import {SiJordan} from 'react-icons/si'

type Props = {}

const AuthNavbar = (props: Props) => {
  return (
    <nav className='bg-[#f5f5f5] w-full max-w-[1920px] lg:px-16 flex items-center justify-between'>
        <SiJordan className='text-2xl mt-1 mb-2'/>

        <span className='text-sm mr-3'>Sign In</span>
    </nav>
  )
}

export default AuthNavbar