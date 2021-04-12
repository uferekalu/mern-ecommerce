import React from 'react'
import { Link } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        key={x + 1}
                        to={
                        !isAdmin
                            ? keyword
                            ? `/search/${keyword}/page/${x + 1}`
                            : `/page/${x + 1}`
                            : `/admin/productlist/${x + 1}` 
                        }
                    >
                        <PaginationItem active={x + 1 === page}>{x + 1}</PaginationItem>
                    </Link>
                ))}
            </Pagination>
        )
    )
}

export default Paginate