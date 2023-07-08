/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { UserRole } from './UserRole';
import type { UserStatus } from './UserStatus';

export type UserData = {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    role: UserRole;
    status: UserStatus;
    isEmailVerified: boolean;
    passwordChangedAt: string;
    adddress?: Array<Address>;
    companyName?: string;
    phone?: string;
    profileImage: string;
    profileImageId: string;
    discountCode?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
