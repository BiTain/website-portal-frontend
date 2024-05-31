import { Outlet } from "react-router-dom";
import SellerHeader from "../components/SellerHeader";

export default function Seller() {
    return (
        <div>
            <SellerHeader/>
            <Outlet/>
        </div>
    )
}