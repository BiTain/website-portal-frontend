import {useMutation} from 'react-query';
import FetchUtils, {ErrorMessage} from '../utils/FetchUtils';
import {App} from "antd";

function useUploadMultipleImagesApi() {
    const {notification} = App.useApp()

    return useMutation<Record<string, string[]>, ErrorMessage, File[]>(
        (images) => FetchUtils.uploadMultipleImages(images),
        {
            onSuccess: () => notification.success({
                message: 'Tải hình lên thành công'
            }),
            onError: () => notification.error({
                message: 'Tải hình lên không thành công'
            }),
        }
    );
}

export default useUploadMultipleImagesApi;
