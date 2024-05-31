import ResourceUrl from "../../constants/ResourceUrl";
import {Configs} from "../../types/Configs";

class StoreConfigs extends Configs{
    static managerPath = '/admin/store'
    static resourceUrl = ResourceUrl.STORE
    static resourceKey = 'stores'
    static resourceName = 'cửa hàng'

}

export default StoreConfigs