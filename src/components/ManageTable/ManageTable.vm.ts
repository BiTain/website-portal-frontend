import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import useDeleteByIdApi from '../../hooks/use-delete-by-id-api';
import BaseResponse from '../../models/BaseResponse';
import {ManageTableProps} from './ManageTable';
import {setActivePage, setSelection} from '../../redux/slices/managePageSlice';
import {App} from 'antd';
import EntityDetailsTable from "../EntityDetailsTable";

function useManageTableViewModel<T extends BaseResponse>({
                                                             listResponse,
                                                             entityDetailsTableRowsFragment,
                                                             resourceUrl,
                                                             resourceKey,
                                                             resourceName,
                                                             entityDetails
                                                         }: ManageTableProps<T>) {

    const {modal, message} = App.useApp();

    const dispatch = useAppDispatch();

    const key: string = 'deletable';

    const
        {
            selection,
            activePage,
        }
            = useAppSelector(state => state.managePage);

    const deleteByIdApi = useDeleteByIdApi(resourceUrl, resourceKey);

    // const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    //     dispatch(setSelection(newSelectedRowKeys));
    // };


    const handleViewEntityButton = (entityId: number, url?: string, key?: string) => {

    };

    const handleDeleteEntityButton = (entityId: number) => {
        modal.confirm(
            {
                title: 'Xác nhận xóa',
                content: `Bạn chắc chắn muốn xóa ${resourceName} có id là ${entityId}`,
                onOk: () => {
                    void message.open({
                        key,
                        type: 'loading',
                        content: 'Đang xóa đối tượng có id là ' + entityId + '...',
                        duration: 0
                    });
                    deleteByIdApi.mutate(entityId, {
                        onSuccess: () => {
                            message.destroy(key)
                            if (listResponse.content.length === 1) {
                                dispatch(setActivePage(activePage - 1 || 1));
                            }
                        },
                        onError: () => message.destroy(key)
                    });
                },
                maskClosable: true,
            }
        );
    };

    return {
        listResponse,
        entityDetailsTableRowsFragment,
        // onSelectChange,
        handleViewEntityButton,
        activePage,
        selection,
        handleDeleteEntityButton
    };
}

export default useManageTableViewModel;