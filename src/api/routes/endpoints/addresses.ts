// application
import { addresses, getNextAddressId } from '~/api/routes/database/addresses';
import { clone, delayResponse } from '~/api/routes/utils';
import { IAddress } from '~/interfaces/address';
import { IEditAddressData } from '~/api/base';
import { UserService } from '~/api/services/allapi';

export function getDefaultAddress(): Promise<IAddress> {
    return Promise.resolve(clone(addresses.find((x) => x.default) || null));
}

export async function getAddress(addressId: number): Promise<IAddress> {
    let user = await UserService.getUserApi({ id: JSON.parse(localStorage.getItem('Tokens')).id });
    user = user.results;
    user = user.address.map((x, i) => ({
        id: i,
        firstName: user.firstName,
        lastName: user.lastName,
        company: '',
        country: x.country,
        address1: x.address1,
        address2: x.address2,
        city: x.city,
        state: x.state,
        postcode: x.postcode,
        email: user.email,
        phone: user.phone,
        default: i === 0,
    }));

    return Promise.resolve(clone(user[addressId]));
}

export async function getAddresses(): Promise<IAddress[]> {
    let user = await UserService.getUserApi({ id: JSON.parse(localStorage.getItem('Tokens')).id });
    console.log(user);
    user = user.results;
    user = user.address.map((x, i) => ({
        id: i,
        firstName: user.firstName,
        lastName: user.lastName,
        company: '',
        country: x.country,
        address1: x.address1,
        address2: x.address2,
        city: x.city,
        state: x.state,
        postcode: x.postcode,
        email: user.email,
        phone: user.phone,
        default: i === 0,
    }));
    return Promise.resolve(clone(user));
}

export async function addAddress(data: Partial<IEditAddressData>): Promise<IAddress> {
    const address:any = {
        street: data.address1,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        postcode: data.postcode,
        addressType: 'string',
        country: data.country,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: '',
    };
    let user = await UserService.getUserApi({ id: JSON.parse(localStorage.getItem('Tokens')).id });
    user = user.results;
    const response = await UserService.putUserUpdateProfile({ requestBody: { favoriteProducts: [], ...user, address: [...user.address, address] } });
    if (addresses.length < 1) {
        address.default = true;
    }

    if (address.default) {
        for (let i = 0; i < addresses.length; i += 1) {
            addresses[i].default = false;
        }
    }

    addresses.push(address);
    return delayResponse(Promise.resolve(address));
}

// noinspection DuplicatedCode
export function editAddress(addressId: number, data: IEditAddressData): Promise<IAddress> {
    const address = addresses.find((x) => x.id === addressId);

    if (!address) {
        throw new Error('Address not found');
    }

    address.firstName = data.firstName;
    address.lastName = data.lastName;
    address.company = data.company;
    address.country = data.country;
    address.address1 = data.address1;
    address.address2 = data.address2;
    address.city = data.city;
    address.state = data.state;
    address.postcode = data.postcode;
    address.email = data.email;
    address.phone = data.phone;
    address.default = data.default;

    if (address.default) {
        for (let i = 0; i < addresses.length; i += 1) {
            addresses[i].default = addresses[i].id === addressId;
        }
    }

    return delayResponse(Promise.resolve(address));
}

export function delAddress(addressId: number): Promise<void> {
    const index = addresses.findIndex((x) => x.id === addressId);

    if (index !== -1) {
        const address = addresses.splice(index, 1)[0];

        if (address.default && addresses.length > 0) {
            addresses[0].default = true;
        }
    }

    return delayResponse(Promise.resolve());
}
