import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default function Admin() {
    return <div>
        <AdminHeader/>
        <AdminSidebar/>
        <Outlet/>
    </div>
}