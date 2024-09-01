import React from 'react'
import "../styles/output.css"
import Sidebar from '../components/Sidebar'

function Index() {
  return (
    <div class="flex">
        <Sidebar/>
        {/* <!-- Main Content --> */}
        <div class="flex-1 p-10 text-gray-800">
            {/* <!-- Add your main content here --> */}
            <h1 class="text-3xl">Main Content</h1>
        </div>
    </div>

  )
}

export default Index