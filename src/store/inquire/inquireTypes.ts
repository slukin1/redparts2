// application
import { IProduct } from '~/interfaces/product';

export interface IInquireState {
    open: boolean;
    product: IProduct | null;
}
