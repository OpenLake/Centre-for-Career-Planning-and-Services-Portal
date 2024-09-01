import React from 'react'

function Sidebar() {
  return (
    <div class="w-64 bg-gray-800 h-screen p-5">
            <div class="mb-8">
            </div>
            <nav>
                <ul>
                    <li class="mb-4">
                        <a href="#" class="text-white block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                            Home
                        </a>
                    </li>
                    <li class="mb-4">
                        <a href="#" class="text-white block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                            About
                        </a>
                    </li>
                    <li className='mt-[500px]'>
                        <button class="w-full bg-red-600 text-white py-2.5 px-4 rounded transition duration-200 hover:bg-red-700">
                         Logout
                       </button>
                    </li>
                </ul>
            </nav>
        </div>

  )
}

export default Sidebar