import {useQuery} from 'react-query';
import FetchUtils, {ErrorMessage} from '../utils/FetchUtils';
import {UseQueryOptions} from 'react-query/types/react/types';
import {App} from "antd";

function useGetByIdApi<O>(
    resourceUrl: string,
    resourceKey: string,
    entityId: number,
    successCallback?: (data: O) => void,
    options?: UseQueryOptions<O, ErrorMessage>
) {

    const {notification} = App.useApp()

    return useQuery<O, ErrorMessage>(
        [resourceKey, 'getById', entityId],
        () => FetchUtils.getById<O>(resourceUrl, entityId),
        {
            onSuccess: successCallback,
            onError: () => notification.success({
                message: "Lấy dữ liệu không thành công"
            }),
            ...options,
        }
    );
}

export default useGetByIdApi;
