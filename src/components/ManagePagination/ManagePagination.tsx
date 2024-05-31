import { Pagination } from 'antd';
import { ListResponse } from '../../utils/FetchUtils';
import useManagePaginationViewModel from './ManagePagination.vm';

interface ManagePaginationProps {
    listResponse: ListResponse
}

function ManagePagination({
    listResponse,
}: ManagePaginationProps) {

    const {
        activePage,
        activePageSize,
        handlePaginationButton
    } = useManagePaginationViewModel()

    return (
        <div className="pagination">
            <Pagination
                current={activePage}
                onChange={handlePaginationButton}
                total={listResponse.totalElements}
                pageSize={activePageSize}
            />
        </div>
    )
}

export default ManagePagination