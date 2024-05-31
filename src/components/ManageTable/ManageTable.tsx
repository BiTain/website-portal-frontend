import {Button, DescriptionsProps, Space, Table, TableProps} from 'antd';
import BaseResponse from "../../models/BaseResponse"
import {ListResponse} from "../../utils/FetchUtils"
import useManageTableViewModel from "./ManageTable.vm"
import PageConfigs from "../../pages/PageConfigs"

import {FaEye, FaRegTrashAlt} from "react-icons/fa";
import {CiEdit, CiTrash} from "react-icons/ci";
import {MdOutlineEdit} from "react-icons/md";
import {Link} from "react-router-dom";

export interface ManageTableProps<T> {
    listResponse: ListResponse<T>
    resourceUrl: string
    resourceKey: string
    entityDetailsTableRowsFragment: TableProps<T>['columns']
    resourceName: string
    entityDetails?: (data: T) => DescriptionsProps['items']
}

function ManageTable<T extends BaseResponse>(props: ManageTableProps<T>) {
    const {
        listResponse,
        entityDetailsTableRowsFragment = [],
        // onSelectChange,
        activePage,
        // selections,
        handleViewEntityButton,
        handleDeleteEntityButton,
    } = useManageTableViewModel<T>(props)

    const columns: TableProps<T>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        ...entityDetailsTableRowsFragment,
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => handleViewEntityButton(record.id)}
                            className='btn btn-primary  d-flex align-items-center py-2'>
                        <FaEye/>
                    </button>
                    <Link to={`update/${record.id}`}
                          className="btn btn-warning text-white d-flex align-items-center py-2">
                        <MdOutlineEdit/>
                    </Link>
                    <button onClick={() => handleDeleteEntityButton(record.id)}
                            className='btn btn-danger d-flex align-items-center py-2'>
                        <FaRegTrashAlt/>
                    </button>
                </Space>
            ),
        },
    ]

    // const rowSelection = {
    //     selectedRowKeys: selections[activePage],
    //     onChange: onSelectChange
    // }

    return (
        <div className='table'>
            {/*<strong>{`Selected ${*/}
            {/*    Object.values(selections).reduce((acc: number, curr) => acc + curr.length, 0)*/}
            {/*} item`}</strong>*/}
            <Table

                // rowSelection={rowSelection}
                rowKey={PageConfigs.rowKey}
                pagination={false}
                // bordered
                columns={columns}
                dataSource={listResponse.content}/>
        </div>
    )
}

export default ManageTable