import {useMutation, useQueryClient} from 'react-query';
import FetchUtils, {ErrorMessage} from '../utils/FetchUtils';
import {App} from "antd";

function useUpdateApi<I, O>(resourceUrl: string, resourceKey: string, entityId: number) {
    const queryClient = useQueryClient();

    const {notification} = App.useApp()

    return useMutation<O, ErrorMessage, I>(
        (requestBody) => FetchUtils.update<I, O>(resourceUrl, entityId, requestBody),
        {
            onSuccess: () => {
                notification.success({
                    message: 'Cập nhập thành công'
                })
                void queryClient.invalidateQueries([resourceKey, 'getById', entityId]);
                void queryClient.invalidateQueries([resourceKey, 'getAll']);
            },
            onError: () => notification.error({
                message: 'Cập nhật không thành công'
            }),
        }
    );
}

export default useUpdateApi;
