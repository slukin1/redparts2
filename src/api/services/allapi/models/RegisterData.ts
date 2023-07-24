/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { UserRole } from './UserRole';
import type { UserStatus } from './UserStatus';

export type RegisterData = {
    firstName?: string;
    lastName?: string;
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    role?: UserRole;
    status?: UserStatus;
    address?: Array<Address>;
    companyName?: string;
    phone?: string;
    profileImage?: string;
};
