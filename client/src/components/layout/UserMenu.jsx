import React from 'react'

function UserMenu() {
  return (
    <>
    <div className="text-center">
   <div class="list-group">
   <a href="/dashboard/user/profile" class="list-group-item list-group-item-action">Profile</a>
   <a href="/dashboard/user/orders" class="list-group-item list-group-item-action">Orders</a>
  </div>
  </div>
    </>
  )
}

export default UserMenu
