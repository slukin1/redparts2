// application
import { IAddress, IAddressData } from '~/interfaces/address';
import { IListOptions, IOrdersList } from '~/interfaces/list';
import { IOrder } from '~/interfaces/order';
import { IUser } from '~/interfaces/user';

export interface IEditProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface IEditAddressData extends IAddressData {
    default: boolean;
}

export abstract class AccountApi {
    abstract signIn(email: string, password: string): Promise<IUser>;

    abstract signUp(email: string, password: string, username: string): Promise<IUser>;

    abstract signOut(): Promise<void>;

    abstract editProfile(data: IEditProfileData): Promise<IUser>;

    abstract changePassword(oldPassword: string, newPassword: string): Promise<void>;

    abstract addAddress(data: IEditAddressData): Promise<IAddress>;

    abstract editAddress(addressId: number, data: IEditAddressData): Promise<IAddress>;

    abstract delAddress(addressId: number): Promise<void>;

    abstract getDefaultAddress(): Promise<IAddress | null>;

    abstract getAddress(addressId: number): Promise<IAddress>;

    abstract getAddresses(): Promise<IAddress[]>;

    abstract getOrdersList(options?: IListOptions): Promise<IOrdersList>;

    abstract getOrderById(id: number): Promise<IOrder>;

    abstract getOrderByToken(token: string): Promise<IOrder>;
}
