import ClientHeader from "../components/ClientHeader";
import ClientFooter from "../components/ClientFooter";
import {Outlet} from "react-router-dom";

export default function Client() {
    return (
        <div>
            <ClientHeader/>

            <Outlet/>

            <ClientFooter/>
        </div>
    )
}