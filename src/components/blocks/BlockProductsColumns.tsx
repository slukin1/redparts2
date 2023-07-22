// react
import React, {useEffect, useRef} from 'react';
// application
import ProductCard from '~/components/shared/ProductCard';
import { IProduct } from '~/interfaces/product';

export interface IBlockProductsColumnsItem {
    title: string;
    products: IProduct[];
}

interface Props {
    columns: IBlockProductsColumnsItem[];
}

function BlockProductsColumns(props: Props) {
    const { columns } = props;
    const [error, setError] = React.useState(false);
    const errorTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Clear the previous timeout if it exists
        if (errorTimeoutRef.current !== null) {
            clearTimeout(errorTimeoutRef.current);
        }

        // Set a new timeout to check if the products array is empty after 4 seconds
        errorTimeoutRef.current = window.setTimeout(() => {
            if (columns[0].products.length === 0) {
                setError(true);
            } else {
                setError(false);
            }
        }, 4000);

        // Clean up the timeout when the component unmounts or the products array changes
        return () => {
            if (errorTimeoutRef.current !== null) {
                clearTimeout(errorTimeoutRef.current);
            }
        };
    }, [columns]);

    return (
        <div className="block block-products-columns">
            <div className="container">
                <div className="row">
                    {columns.map((column, columnIdx) => (
                        <div key={columnIdx} className="col-4">
                            <div className="block-products-columns__title">{column.title}</div>
                            <div className="block-products-columns__list">
                                {error
                                    ? (
                                        <div className="block-products-columns__list-item">
                                            <p>A Server Side Error occurred, please try again later</p>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    window.location.reload();
                                                }}
                                            >
                                                Reload
                                            </button>
                                        </div>
                                    )
                                    : column.products.map((product) => (
                                        <div key={product.id} className="block-products-columns__list-item">
                                            <ProductCard
                                                product={product}
                                                exclude={['actions', 'status-badge', 'features', 'buttons', 'meta']}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default React.memo(BlockProductsColumns);
