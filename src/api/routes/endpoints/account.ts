// application
import { delayResponse, error } from '~/api/routes/utils';
import { IEditProfileData } from '~/api/base';
import { IUser } from '~/interfaces/user';
import { AuthService, UserService } from '~/api/services/allapi';

interface IApiResponse {
    id: string;
    accessToken: string;
    refreshToken: string;
}

export async function accountSignIn(email: string, password: string): Promise<IUser> {
    if (!/^.+@.+$/.test(email)) {
        return delayResponse(() => error('AUTH_INVALID_EMAIL'));
    }
    try {
        const response = await AuthService.userLogin({
            requestBody: { identifier: email, password },
        });
        if (response.type === 'Success') {
            // @ts-ignore
            const data = response?.results.user;
            const user: IUser = {
                email: data.email,
                phone: data.phone,
                firstName: data.firstName,
                lastName: data.lastName,
                avatar: data.profileImage,
            };
            // @ts-ignore
            const tokenData = response?.results.tokens;
            const apiResponse: IApiResponse = {
                // eslint-disable-next-line no-underscore-dangle
                id: data._id,
                accessToken: tokenData.accessToken,
                refreshToken: tokenData.refreshToken,
            };

            localStorage.setItem('Tokens', JSON.stringify(apiResponse));
            return user;
        }
    } catch (e) {
        return delayResponse(() => error('AUTH_WRONG_PASSWORD'));
    }
    return delayResponse(() => error('AUTH_WRONG_PASSWORD'));
}

export async function accountSignUp(email: string, password: string, userName: string): Promise<IUser> {
    if (!/^.+@.+$/.test(email)) {
        return delayResponse(() => error('AUTH_INVALID_EMAIL'));
    }

    if (password.length < 6) {
        return delayResponse(() => error('AUTH_WEAK_PASSWORD'));
    }
    try {
        const response = await AuthService.registerUser({
            requestBody: {
                firstName: 'First',
                lastName: 'Last Name',
                userName,
                email,
                password,
                passwordConfirmation: password,
                role: 'user',
                status: 'active',
                adddress: [
                    {
                        street: 'Main Street',
                        address1: '123',
                        address2: 'Apt 4B',
                        city: 'New York',
                        state: 'NY',
                        postcode: '10001',
                        addressType: 'residential',
                        country: 'USA',
                        createdAt: `${new Date().toISOString()}`,
                        updatedAt: `${new Date().toISOString()}`,
                        // @ts-ignore
                        deletedAt: null,
                    },
                ],
                companyName: 'ABC Company',
                phone: '123-456-7890',
                profileImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
            },
        });
        if (response.type === 'Success') {
            // @ts-ignore
            const data = response?.results.user;
            const user: IUser = {
                email: data.email,
                phone: data.phone,
                firstName: data.firstName,
                lastName: data.lastName,
                avatar: data.profileImage,
            };
            // @ts-ignore
            const tokenData = response?.results.tokens;
            const apiResponse: IApiResponse = {
                // eslint-disable-next-line no-underscore-dangle
                id: data._id,
                accessToken: tokenData.accessToken,
                refreshToken: tokenData.refreshToken,
            };

            localStorage.setItem('Tokens', JSON.stringify(apiResponse));
            return user;
        }
    } catch (e) {
        return delayResponse(() => error('AUTH_SIGNUP_FAILED'));
    }
    return delayResponse(() => error('AUTH_SIGNUP_FAILED'));
}
export async function accountSignOut(): Promise<void> {
    await AuthService.userLogout({
        // @ts-ignore
        accessToken: JSON.parse(localStorage.getItem('Tokens') || '{}').accessToken,
        requestBody: { refreshToken: JSON.parse(localStorage.getItem('Tokens') || '{}').refreshToken },
    });
    localStorage.removeItem('Tokens');
    return Promise.resolve();
}

export async function accountEditProfile(data: IEditProfileData): Promise<IUser> {
    let userData:any;
    if (!localStorage.getItem('userData')) {
        userData = await UserService.getUserApi({
            id: JSON.parse(localStorage.getItem('Tokens') || '{}').id,
            // @ts-ignore
            token: JSON.parse(localStorage.getItem('Tokens') || '{}').accessToken,
        });
        localStorage.setItem('userData', JSON.stringify(userData.results));
        userData = userData?.results;
    } else {
        userData = localStorage.getItem('userData');
    }
    // @ts-ignore
    let response = await UserService.putUserUpdateProfile({
        requestBody: {
            // @ts-ignore
            // eslint-disable-next-line no-underscore-dangle
            favoriteProducts: [], ...userData, ...data,
        },
        // @ts-ignore
        token: JSON.parse(localStorage.getItem('Tokens') || '{}').accessToken,
    });
    // @ts-ignore
    response = response.results;
    const user: IUser = {
        // @ts-ignore
        email: response.email,
        // @ts-ignore
        phone: response.phone,
        // @ts-ignore
        firstName: response.firstName,
        // @ts-ignore
        lastName: response.lastName,
        avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    };
    return delayResponse(Promise.resolve(user));
}

export async function accountChangePassword(currentPassword: string, password: string): Promise<void> {
    if (password.length < 6) {
        return delayResponse(() => error('AUTH_WEAK_PASSWORD'));
    }
    const response = await AuthService.passwordChange({
        requestBody: {
            currentPassword,
            password,
            passwordConfirmation: password,
        },
        // @ts-ignore
        accessToken: JSON.parse(localStorage.getItem('Tokens') || '{}').accessToken,
    });
    if (response.type === 'Success') {
        return delayResponse(Promise.resolve());
    }
    return delayResponse(() => error('AUTH_WRONG_PASSWORD'));
}
