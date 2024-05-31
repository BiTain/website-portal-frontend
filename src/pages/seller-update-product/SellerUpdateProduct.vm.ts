import { Form, GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { SellerRequest } from "../../models/User";
import useCreateApi from "../../hooks/use-create-api";
import { ApiResponse } from "../../utils/FetchUtils";
import StoreConfigs from "../admin-store-manage/StoreConfigs";
import useUploadMultipleImagesApi from "../../hooks/use-upload-multiple-images-api";
import useUploadSingleImageApi from "../../hooks/use-upload-single-image-api";
import ResourceUrl from "../../constants/ResourceUrl";
import { SelectOption } from "../../types";
import { ProductRequest, ProductResponse } from "../../models/Product";
import { useAppSelector } from "../../redux/hooks";
import useGetAllApi from "../../hooks/use-get-all-api";
import { CategoryResponse } from "../../models/Category";
import useGetByIdApi from "../../hooks/use-get-by-id-api";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import useUpdateApi from "../../hooks/use-update-api";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function useSellerUpdateProductViewModel() {
    const { id } = useParams()

    const [form] = Form.useForm();

    const [product, setProduct] = useState<ProductResponse>()

    const { user } = useAppSelector(state => state.auth)

    const [loading, setLoading] = useState<boolean>(false)

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const queryClient = useQueryClient();

    const [productImageFiles, setProductImageFiles] = useState<UploadFile[]>([])

    const [categorySelectList, setCategorySelectList] = useState<SelectOption[]>([])

    useGetByIdApi<ProductResponse>(ResourceUrl.PRODUCT, "products", Number(id),
        async (productResponse) => {
            // await queryClient.invalidateQueries(["categories", 'getAll']);
            setProduct(productResponse);

            const fileList: UploadFile[] = productResponse.productImages.map((value, index) => ({
                uid: `${index}`,
                name: `image.png`,
                status: 'done',
                url: value,
            }))
            form.setFieldValue('productImageFiles', fileList)
            // const formValues: ProductRequest = {
            //     name: productResponse.name,
            //     price: Number(productResponse.price),
            //     productUrl: productResponse.productUrls[0],
            //     categoryId: productResponse.categoryId,
            //     productImages: [],
            //     userId: user?.id ? user.id : 1
            //  
            // };
            setProductImageFiles(fileList)
            // form.setFieldsValue(formValues)
            // form.setFieldValue("categoryId", {
            //     label: productResponse.category,
            //     value: productResponse.categoryId
            // })
            // form.setFieldValue("categoryId", productResponse.categoryId)
        }
    );

    useGetAllApi<CategoryResponse>(ResourceUrl.CLIENT_CATEGORY, "categories",
        { all: true },
        (categoryListResponse) => {
            const selectList: SelectOption[] = categoryListResponse.content.map((item) => ({
                value: String(item.id),
                label: item.name
            }));
            // form.setFieldValue("categoryId", product?.categoryId)
            setCategorySelectList(selectList);
        }
    );

    const updateApi = useUpdateApi<ProductRequest, ApiResponse>(ResourceUrl.CLIENT_SELLER_UPDATE_PRODUCT, "products", Number(id));

    const uploadMultipleImagesApi = useUploadMultipleImagesApi()


    const handleChangeProductImage: UploadProps['onChange'] = ({ fileList: newFileList }) => {
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
        console.log(formValues)

        const updateProduct = (productImageUrls: string[]) => {
            const requestBody: ProductRequest = {
                name: formValues.name,
                price: formValues.price,
                categoryId: formValues.categoryId,
                productUrl: formValues.productUrl,
                productImages: productImageUrls,
                userId: user?.id ? user.id : 1,
                oldImage: productImageFiles
                    .map(value => value.url)
                    .filter((url): url is string => Boolean(url))
            }
            updateApi.mutate(requestBody, {
                onSuccess: () => {

                    setLoading(false)
                },
                onError: () => setLoading(false)
            })
        }

        const filesToUpload = productImageFiles.filter(item => item.originFileObj).map(item => item.originFileObj);

        console.log(filesToUpload)
        if (filesToUpload.length > 0) {
            // @ts-ignore
            uploadMultipleImagesApi.mutate(filesToUpload, {
                onSuccess: (productImageUrlsResponse) => updateProduct(productImageUrlsResponse.imageUrls),
                onError: () => setLoading(false)
            });
        } else {
            updateProduct([])
        }
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
        setLoading,
        id,
        product
    }
}

export default useSellerUpdateProductViewModel