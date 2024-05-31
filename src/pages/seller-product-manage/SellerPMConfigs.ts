import ResourceUrl from "../../constants/ResourceUrl";
import {Configs} from "../../types/Configs";

class SellerPMConfigs extends Configs {
    static managerPath = '/seller'
    static resourceUrl = ResourceUrl.PRODUCT
    static resourceKey = 'products'
    static resourceName = 'sản phẩm'
}

export default SellerPMConfigs