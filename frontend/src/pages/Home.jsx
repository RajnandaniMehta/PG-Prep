import {bgImage} from '../assets/imageExport'
import {useNavigate} from 'react-router-dom';
function Home() {
  const navigate =useNavigate();
  return (
    <div 
    style={{ backgroundImage: `url(${bgImage})` }} 
     className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-left">
         <div className='mx-6 px-6'>
        <h1 className="text-4xl font-bold text-green-900 mb-4">
         📚 Ace Your PG Entrance Prep!
        </h1>
        <p className="text-lg text-gray-700 italic">
         Smart, structured, and personalized preparation made just for you.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Start preparing today with confidence and consistency.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/qbank/')}
            className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
          >
            🔍 Explore QBank
          </button>
          <button
            onClick={() => navigate('/admin')}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            ⚙️ Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home