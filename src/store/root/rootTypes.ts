import cartReducer, { CART_NAMESPACE } from '~/store/cart/cartReducer';
import compareReducer, { COMPARE_NAMESPACE } from '~/store/compare/compareReducer';
import currencyReducer, { CURRENCY_NAMESPACE } from '~/store/currency/currencyReducer';
import garageReducer, { GARAGE_NAMESPACE } from '~/store/garage/garageReducer';
import mobileMenuReducer, { MOBILE_MENU_NAMESPACE } from '~/store/mobile-menu/mobileMenuReducer';
import optionsReducer, { OPTIONS_NAMESPACE } from '~/store/options/optionsReducer';
import quickviewReducer, { QUICKVIEW_NAMESPACE } from '~/store/quickview/quickviewReducer';
import shopReducer from '~/store/shop/shopReducer';
import userReducer, { USER_NAMESPACE } from '~/store/user/userReducer';
import wishlistReducer, { WISHLIST_NAMESPACE } from '~/store/wishlist/wishlistReducer';
import { AppReducerStateType } from '~/store/types';
import { SHOP_NAMESPACE } from '~/store/shop/shopTypes';
import inquireReducer, { INQUIRE_NAMESPACE } from '~/store/inquire/inquireReducer';
import dataReducer, { DATA_NAMESPACE } from '~/store/data/dataReducer';
import whatsappReducer, { WHATSAPP_NAMESPACE } from '~/store/whatsapp/whatsappReducer';

export interface IRootState {
    [CART_NAMESPACE]: AppReducerStateType<typeof cartReducer>;
    [COMPARE_NAMESPACE]: AppReducerStateType<typeof compareReducer>;
    [CURRENCY_NAMESPACE]: AppReducerStateType<typeof currencyReducer>;
    [GARAGE_NAMESPACE]: AppReducerStateType<typeof garageReducer>;
    [MOBILE_MENU_NAMESPACE]: AppReducerStateType<typeof mobileMenuReducer>;
    [OPTIONS_NAMESPACE]: AppReducerStateType<typeof optionsReducer>;
    [QUICKVIEW_NAMESPACE]: AppReducerStateType<typeof quickviewReducer>;
    [SHOP_NAMESPACE]: AppReducerStateType<typeof shopReducer>;
    [USER_NAMESPACE]: AppReducerStateType<typeof userReducer>;
    [WISHLIST_NAMESPACE]: AppReducerStateType<typeof wishlistReducer>;
    [INQUIRE_NAMESPACE]: AppReducerStateType<typeof inquireReducer>;
    [DATA_NAMESPACE]: AppReducerStateType<typeof dataReducer>;
    [WHATSAPP_NAMESPACE]: AppReducerStateType<typeof whatsappReducer>;
}
