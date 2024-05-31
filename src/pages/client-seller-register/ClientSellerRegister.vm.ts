import {Form, GetProp, UploadFile, UploadProps} from "antd";
import {useState} from "react";
import {SellerRequest} from "../../models/User";
import useCreateApi from "../../hooks/use-create-api";
import {ApiResponse} from "../../utils/FetchUtils";
import StoreConfigs from "../admin-store-manage/StoreConfigs";
import useUploadMultipleImagesApi from "../../hooks/use-upload-multiple-images-api";
import useUploadSingleImageApi from "../../hooks/use-upload-single-image-api";
import ResourceUrl from "../../constants/ResourceUrl";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function useClientSellerRegisterViewModel() {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState<boolean>(false)

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [avatarFile, setAvatarFile] = useState<UploadFile[]>([])

    const [storeImageFiles, setStoreImageFiles] = useState<UploadFile[]>([])

    const createApi = useCreateApi<SellerRequest, ApiResponse>(ResourceUrl.CLIENT_SELLER_REGISTER, 'Đăng ký thành công')
    const uploadMultipleImagesApi = useUploadMultipleImagesApi()
    const uploadSingleImageApi = useUploadSingleImageApi()

    const handleChangeStoreImage: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setStoreImageFiles(newFileList);
        form.setFieldValue('storeImageFiles', newFileList)
    }

    const handleAvatarFileChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setAvatarFile(newFileList)
        form.setFieldValue('avatarFile', newFileList)
    }

    const handleOpenPreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleFormSubmit = (formValues: SellerRequest) => {
        const createStore = (avatarUrl: string, storeImageUrls: string[]) => {
            const requestBody: SellerRequest = {
                fullName: formValues.fullName,
                email: formValues.email,
                phoneNumber: formValues.phoneNumber,
                storeName: formValues.storeName,
                avatar: avatarUrl,
                storeImages: storeImageUrls,
                urlStore: formValues.urlStore
            }
            createApi.mutate(requestBody, {
                onSuccess: () => {
                    form.resetFields()
                    setLoading(false)
                },
                onError: () => setLoading(false)
            })
        }

        // @ts-ignore
        uploadSingleImageApi.mutate(avatarFile[0].originFileObj, {
            onSuccess: (avatarUrlResponse) => {
                // @ts-ignore
                uploadMultipleImagesApi.mutate(storeImageFiles.map(item => item.originFileObj), {
                    onSuccess: (storeImageUrlsResponse) => createStore(avatarUrlResponse.imageUrl, storeImageUrlsResponse.imageUrls),
                    onError: () => setLoading(false)
                })
            },
            onError: () => setLoading(false)
        })
    }

    return {
        form,
        previewOpen,
        handleOpenPreview,
        setPreviewOpen,
        setPreviewImage,
        previewImage,
        handleFormSubmit,
        avatarFile,
        storeImageFiles,
        handleAvatarFileChange,
        handleChangeStoreImage,
        loading,
        setLoading
    }
}

export default useClientSellerRegisterViewModel