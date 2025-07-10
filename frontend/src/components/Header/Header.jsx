import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {logo} from '../../assets/imageExport'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate=useNavigate();
    const navItems=[
        {
            name:"Home",
            slug:"/",
            active:true

        },{
            name:"qBanks",
            slug:'/qbank'
        },{
            name:'Admin Panel',
            slug:'/admin'
        },{
            name:'Login',
            slug:'/login'
        },{
            name:'Logout',
            slug:'/logout'
        }
    ]
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-sky-700 to-gray-700 text-white shadow-md text-xl ">
        <nav className="max-w-7xl mx-auto px-3 py-2 flex flex-col sm:flex-row items-center">
             <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <img src={`${logo}`} alt="Error in uploading"
                   className="w-16 h-16 rounded-full shadow-md object-cover" />
            </div>
            <ul className='flex space-x-4'>
                {navItems.map((item)=>
                    (
                    <li key={item.name}>
                        <button onClick={() => navigate(item.slug)}
                            className='inline-block px-6 py-2' >
                            {item.name}
                        </button>
                    </li>
                    )
                )}
            </ul>
        </nav>
    </header>
  )
}

export default Header