/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { IListOptions, IOrdersList } from '~/interfaces/list';
import { IOrder } from '~/interfaces/order';
import { IUser } from '~/interfaces/user';
import {
    AccountApi,
    IEditAddressData,
    IEditProfileData,
} from '~/api/base';
import {
    accountChangePassword,
    accountEditProfile,
    accountSignIn,
    accountSignOut,
    accountSignUp,
    addAddress,
    delAddress,
    editAddress,
    getAddress,
    getAddresses,
    getDefaultAddress,
    getOrderById,
    getOrderByToken,
    getOrdersList,
} from '~/api/routes/endpoints';

export class AccountApiIntg extends AccountApi {
    signIn(email: string, password: string): Promise<IUser> {
        return accountSignIn(email, password);
    }

    signUp(email: string, password: string, username: string): Promise<IUser> {
        return accountSignUp(email, password, username);
    }

    signOut(): Promise<void> {
        return accountSignOut();
    }

    editProfile(data: IEditProfileData): Promise<IUser> {
        return accountEditProfile(data);
    }

    changePassword(oldPassword: string, newPassword: string): Promise<void> {
        return accountChangePassword(oldPassword, newPassword);
    }

    addAddress(data: IEditAddressData): Promise<any> {
        return addAddress(data);
    }

    editAddress(addressId: number, data: IEditAddressData): Promise<any> {
        return editAddress(addressId, data);
    }

    delAddress(addressId: number): Promise<void> {
        return delAddress(addressId);
    }

    getDefaultAddress(): Promise<any | null> {
        return getDefaultAddress();
    }

    getAddress(addressId: number): Promise<any> {
        return getAddress(addressId);
    }

    getAddresses(): Promise<any[]> {
        return getAddresses();
    }

    getOrdersList(options?: IListOptions): Promise<IOrdersList> {
        return getOrdersList(options);
    }

    getOrderById(id: number): Promise<IOrder> {
        return getOrderById(id);
    }

    getOrderByToken(token: string): Promise<IOrder> {
        return getOrderByToken(token);
    }
}
