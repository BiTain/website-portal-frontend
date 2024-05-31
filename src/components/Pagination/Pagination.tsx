import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Pagination.scss"

export default function Pagination() {
    return (
        <ul className="pagination">
            <li>
                <Link to='/'>
                    <FaAngleDoubleLeft />
                </Link>
            </li>
            <li>
                <Link to='/'>
                    <FaAngleLeft />
                </Link>
            </li>
            <li>
                <Link to='/'>
                    1
                </Link>
            </li>
            <li>
                <Link to='/'>
                    2
                </Link>
            </li>
            <li>
                <Link to='/'>
                    ...
                </Link>
            </li>
            <li>
                <Link to='/'>
                    9
                </Link>
            </li>
            <li>
                <Link to='/'>
                    10
                </Link>
            </li>
            <li>
                <Link to='/'>
                    <FaAngleRight />
                </Link>
            </li>
            <li>
                <Link to='/'>
                    <FaAngleDoubleRight />
                </Link>
            </li>
        </ul>
    )
}