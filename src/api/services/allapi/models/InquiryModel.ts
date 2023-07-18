/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InquiryStatus } from './InquiryStatus';
import type { InquiryVehicleData } from './InquiryVehicleData';

export type InquiryModel = {
    inquiryNo?: string;
    inquiry?: string;
    message?: string;
    promotionCode?: string;
    products: Array<InquiryVehicleData>;
    contactType: 'PhoneCall' | 'WhatsApp' | 'Viber' | 'Line';
    inquiryStatus: InquiryStatus;
    fullName: string;
    phone: string;
    email: string;
    country: string;
    destinationPort: string;
    insuranceFee: boolean;
    inspectionFee: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
};
