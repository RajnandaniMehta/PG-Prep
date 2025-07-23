import React from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
    const navigate=useNavigate();
    const sideItems=[
        {
            name:'All Subjects',
            slug:'subjects'
        },
        {
            name:'All Chapters',
            slug:'chapters'
        },{
            name:'All Questions',
            slug:'questions'
        },
    ]
  return (
    <div className='fixed'>
        <div>
 <h1>Admin sidebar</h1>
         <ul>
                {sideItems.map((item)=>
                    (
                    <li key={item.name}>
                        <button onClick={() => navigate(`/adminHome/${item.slug}`)}
                            className='inline-block px-6 py-2' >
                            {item.name}
                        </button>
                    </li>
                    )
                )}
            </ul>
        </div>
       
    </div>
  )
}

export default Admin