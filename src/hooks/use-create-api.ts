import {useMutation} from 'react-query';
import FetchUtils, {ErrorMessage} from '../utils/FetchUtils';
import {App} from "antd";

function useCreateApi<I, O>(resourceUrl: string, successMessage?: string) {

    const {notification} = App.useApp()

    return useMutation<O, ErrorMessage, I>(
        (requestBody) => FetchUtils.create<I, O>(resourceUrl, requestBody),
        {
            onSuccess: () => notification.success({
                message: successMessage ? successMessage : 'Tạo thành công'
            }),
            onError: () => notification.error({
                message: 'Tạo không thành công có lỗi xảy ra'
            }),
        }
    );
}

export default useCreateApi;
