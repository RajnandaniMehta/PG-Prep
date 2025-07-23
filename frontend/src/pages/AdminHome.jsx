import { Routes, Route, Outlet } from 'react-router-dom';
import { Admin } from '../components';

function AdminHome() {
  return (
    <div className="pt-24">
      <div className='flex gap-4'>
        <div className='w-1/4'>
          <Admin />
        </div>

        <div className='flex-1'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AdminHome