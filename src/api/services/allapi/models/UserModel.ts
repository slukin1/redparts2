/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { UserRole } from './UserRole';
import type { UserStatus } from './UserStatus';

export type UserModel = {
    firstName?: string;
    lastName?: string;
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    role: UserRole;
    status: UserStatus;
    isEmailVerified?: boolean;
    adddress?: Array<Address>;
    companyName?: string;
    phone?: string;
    profileImage?: string;
    profileImageId?: string;
    discountCode?: string;
};
