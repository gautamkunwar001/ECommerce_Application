import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <div class="list-group">
          <a
            href="/dashboard/admin/create-category"
            class="list-group-item list-group-item-action"
          >
            Create category
          </a>
          <a
            href="/dashboard/admin/create-product"
            class="list-group-item list-group-item-action"
          >
            Create Product
          </a>
          <a
            href="/dashboard/admin/products"
            class="list-group-item list-group-item-action"
          >
            Products
          </a>
          <a
            href="/dashboard/admin/orders"
            class="list-group-item list-group-item-action"
          >
            Orders
          </a>
          <a
            href="/dashboard/admin/users"
            class="list-group-item list-group-item-action"
          >
            Users
          </a>
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
