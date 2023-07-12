import { AccountApiIntg } from '~/api/api-routes/account-api.intg';
import { FakeBlogApi } from '~/api/api-routes/fake-blog.api';
import { FakeCountriesApi } from '~/api/api-routes/fake-countries.api';
import { FakeShopApi } from '~/api/api-routes/fake-shop.api';
import { VehicleApiIntg } from '~/api/api-routes/vehicle-api.intg';

export const accountApi = new AccountApiIntg();
export const blogApi = new FakeBlogApi();
export const countriesApi = new FakeCountriesApi();
export const shopApi = new FakeShopApi();
export const vehicleApi = new VehicleApiIntg();
