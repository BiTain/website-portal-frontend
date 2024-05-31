import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FilterUtils, { Filter } from '../../utils/FilterUtils';
import { RequestParams } from '../../utils/FetchUtils';
import PageConfigs from '../../pages/PageConfigs';

interface ManagePageState {
    activePage: number;
    activePageSize: number;
    activeFilter: Filter | null;
    searchToken: string;
    selection: number[];
    filters: Filter[];
    activeFilterPanel: boolean;
}

const initialManagePageState: ManagePageState = {
    activePage: PageConfigs.initListResponse.pageNumber,
    activePageSize: PageConfigs.initListResponse.pageSize,
    activeFilter: null,
    searchToken: '',
    selection: [],
    filters: [],
    activeFilterPanel: false,
};

const managePageSlice = createSlice({
    name: 'managePage',
    initialState: initialManagePageState,
    reducers: {
        setActivePage: (state, action: PayloadAction<number>) => {
            state.activePage = action.payload;
        },
        setActivePageSize: (state, action: PayloadAction<number>) => {
            state.activePageSize = action.payload;
        },
        setActiveFilter: (state, action: PayloadAction<Filter | null>) => {
            state.activeFilter = action.payload;
        },
        setSearchToken: (state, action: PayloadAction<string>) => {
            state.searchToken = action.payload;
        },
        setSelection: (state, action: PayloadAction<number[]>) => {
            state.selection = action.payload;
        },
        setFilters: (state, action: PayloadAction<Filter[]>) => {
            state.filters = action.payload;
        },
        setActiveFilterPanel: (state, action: PayloadAction<boolean>) => {
            state.activeFilterPanel = action.payload;
        },
        resetManagePageState: (state) => {
            return initialManagePageState;
        }
    }
});

export const {
    setActivePage,
    setActivePageSize,
    setActiveFilter,
    setSearchToken,
    setSelection,
    setFilters,
    setActiveFilterPanel,
    resetManagePageState
} = managePageSlice.actions;

export const getRequestParams = (state: ManagePageState): RequestParams => ({
    page: state.activePage,
    size: state.activePageSize,
    sort: FilterUtils.convertToSortRSQL(state.activeFilter),
    filter: FilterUtils.convertToFilterRSQL(state.activeFilter),
    search: state.searchToken,
});

export default managePageSlice.reducer;
