import React from "react";

import PropTypes from 'prop-types';
import _ from "lodash";
import { Link } from "react-router-dom";

const Pagination = props => {

    const {itemCount, pageSize, currentPage, onPageChange} = props;

    const pageCount = itemCount / pageSize;
    const pages = _.range(1, pageCount+1);
    
    return (pages.length > 1 ? <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={currentPage === 1?'page-item disabled':'page-item'}><Link href="{#}" className="page-link" to="#" onClick={() => onPageChange(currentPage-1) }>Previous</Link></li>
                {pages.map(page => (
                    <li key={page} className={currentPage === page ? 'page-item active': 'page-item'}><Link href="{#}" className="page-link" to="#" onClick={() => onPageChange(page) }>{page}</Link></li>
                ))}
                <li className={currentPage === pages.length?'page-item disabled':'page-item'}><Link className="page-link" to="#" onClick={() => onPageChange(currentPage+1) }>Next</Link></li>
            </ul>
        </nav> : ''
    );
}
Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired, pageSize: PropTypes.number.isRequired, currentPage: PropTypes.number.isRequired, onPageChange: PropTypes.func.isRequired
};
export default Pagination;
