// application
import { IProduct } from '~/interfaces/product';

export interface IWhatsappState {
    open: boolean;
    product: IProduct | null;
}
