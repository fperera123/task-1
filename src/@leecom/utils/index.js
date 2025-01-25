import { isMobile } from "mobile-device-detect";

export const inMobileView = () => {
    if(isMobile ||  window.innerWidth < 1024){
        return true;
    }
    return false;
}