import {useQuery} from 'react-query';
import FilterUtils from '../utils/FilterUtils';
import FetchUtils, {ErrorMessage, ListResponse, RequestParams} from '../utils/FetchUtils';
import {UseQueryOptions} from 'react-query/types/react/types';
import {App} from "antd";
import {useAppSelector} from "../redux/hooks";

function useGetAllApi<O>(
    resourceUrl: string,
    resourceKey: string,
    requestParams?: RequestParams,
    successCallback?: (data: ListResponse<O>) => void,
    options?: UseQueryOptions<ListResponse<O>, ErrorMessage>
) {

    const {notification} = App.useApp()

    const {
        activePage,
        activePageSize,
        activeFilter,
        searchToken,
    } = useAppSelector(state => state.managePage);

    if (!requestParams) {
        requestParams = {
            page: activePage,
            size: activePageSize,
            sort: FilterUtils.convertToSortRSQL(activeFilter),
            filter: FilterUtils.convertToFilterRSQL(activeFilter),
            search: searchToken,
        };
    }

    const queryKey = [resourceKey, 'getAll', requestParams];

    return useQuery<ListResponse<O>, ErrorMessage>(
        queryKey,
        () => FetchUtils.getAll<O>(resourceUrl, requestParams),
        {
            keepPreviousData: true,
            onSuccess: successCallback,
            onError: (error) => notification.error({
                message: `Lỗi ${error.statusCode || 'chưa biết'}: Lấy dữ liệu không thành công`
            }),
            ...options,
        }
    );
}

export default useGetAllApi;
