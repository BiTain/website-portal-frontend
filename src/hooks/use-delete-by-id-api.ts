import {useMutation, useQueryClient} from 'react-query';
import FetchUtils, {ErrorMessage} from '../utils/FetchUtils';
import {App} from "antd";

function useDeleteByIdApi<T = number>(resourceUrl: string, resourceKey: string) {
    const queryClient = useQueryClient();

    const {notification} = App.useApp()

    return useMutation<void, ErrorMessage, T>(
        (entityId) => FetchUtils.deleteById(resourceUrl, entityId),
        {
            onSuccess: () => {
                notification.success({
                    message: 'Xóa thành công'
                });
                void queryClient.invalidateQueries([resourceKey, 'getAll']);
            },
            onError: () => notification.error({
                message: 'Xóa không thành công'
            }),
        }
    );
}

export default useDeleteByIdApi;
