/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { mileageRange } from './mileageRange';
import type { PriceRange } from './PriceRange';
import type { YearRange } from './YearRange';

export type RangeList = {
    years?: YearRange;
    prices?: PriceRange;
    mileage?: mileageRange;
};
