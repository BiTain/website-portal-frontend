import {Form, GetProp, UploadFile, UploadProps} from "antd";
import {useState} from "react";
import {SellerRequest} from "../../models/User";
import useCreateApi from "../../hooks/use-create-api";
import {ApiResponse} from "../../utils/FetchUtils";
import StoreConfigs from "../admin-store-manage/StoreConfigs";
import useUploadMultipleImagesApi from "../../hooks/use-upload-multiple-images-api";
import useUploadSingleImageApi from "../../hooks/use-upload-single-image-api";
import ResourceUrl from "../../constants/ResourceUrl";
import {SelectOption} from "../../types";
import {ProductRequest} from "../../models/Product";
import {useAppSelector} from "../../redux/hooks";
import useGetAllApi from "../../hooks/use-get-all-api";
import {CategoryResponse} from "../../models/Category";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function useSellerAddProductViewModel() {
    const [form] = Form.useForm();

    const {user} = useAppSelector(state => state.auth)

    const [loading, setLoading] = useState<boolean>(false)

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    const [productImageFiles, setProductImageFiles] = useState<UploadFile[]>([])

    const [categorySelectList, setCategorySelectList] = useState<SelectOption[]>([])

    useGetAllApi<CategoryResponse>(ResourceUrl.CLIENT_CATEGORY, "categories",
        { all: true },
        (categoryListResponse) => {
            const selectList: SelectOption[] = categoryListResponse.content.map((item) => ({
                value: String(item.id),
                label: item.name
            }));
            setCategorySelectList(selectList);
        }
    );

    const createApi = useCreateApi<ProductRequest, ApiResponse>(ResourceUrl.CLIENT_SELLER_ADD_PRODCUT)

    const uploadMultipleImagesApi = useUploadMultipleImagesApi()
    const uploadSingleImageApi = useUploadSingleImageApi()

    const handleChangeProductImage: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setProductImageFiles(newFileList);
        form.setFieldValue('productImageFiles', newFileList)
    }

    const handleOpenPreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleFormSubmit = (formValues: ProductRequest) => {
        const createProduct = (productImageUrls: string[]) => {
            const requestBody: ProductRequest = {
                name: formValues.name,
                price: formValues.price,
                categoryId: formValues.categoryId,
                productUrl: formValues.productUrl,
                productImages: productImageUrls,
                userId: user?.id ? user.id : 1
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
        uploadMultipleImagesApi.mutate(productImageFiles.map(item => item.originFileObj), {
            onSuccess: (productImageUrlsResponse) => createProduct(productImageUrlsResponse.imageUrls),
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
        handleChangeProductImage,
        productImageFiles,
        loading,
        categorySelectList,
        setLoading
    }
}

export default useSellerAddProductViewModel