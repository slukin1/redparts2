// react
import React, { useCallback, useMemo } from 'react';
// third-party
import classNames from 'classnames';
import { FormProvider } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
// application
import { toast } from 'react-toastify';
import AppLink from '~/components/shared/AppLink';
import AsyncAction from '~/components/shared/AsyncAction';
import CurrencyFormat from '~/components/shared/CurrencyFormat';
import ProductGallery from '~/components/shop/ProductGallery';
import StockStatusBadge from '~/components/shared/StockStatusBadge';
import url from '~/api/services/url';
import { Compare16Svg, Cross12Svg, Wishlist16Svg } from '~/svg';
import { useCompareAddItem } from '~/store/compare/compareHooks';
import { useProductForm } from '~/api/services/forms/product';
import { useQuickview, useQuickviewClose } from '~/store/quickview/quickviewHooks';
import { useWishlistAddItem } from '~/store/wishlist/wishlistHooks';
import { useInquireOpen } from '~/store/inquire/inquireHooks';

function Quickview() {
    const quickview = useQuickview();
    const quickviewClose = useQuickviewClose();
    const wishlistAddItem = useWishlistAddItem();
    const compareAddItem = useCompareAddItem();
    const { product } = quickview;
    const image = useMemo(() => product?.images || [], [product]);
    const productForm = useProductForm(product);
    const inquire = useInquireOpen();
    const showInquire = () => {
        quickviewClose();
        // @ts-ignore
        return inquire(product.slug);
    };
    const toggle = useCallback(() => {
        if (quickview.open) {
            quickviewClose();
        }
    }, [quickview.open, quickviewClose]);

    if (!product) {
        return null;
    }

    const productTemplate = (
        <div className="quickview__product">
            <div className="quickview__product-name">
                {product.name}
            </div>
            <div className="quickview__product-meta">
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <FormattedMessage id="TABLE_REFERENCE" />
                            </th>
                            <td>{product.partNumber}</td>
                        </tr>
                        {product.brand && (
                            <React.Fragment>
                                <tr>
                                    <th>
                                        <FormattedMessage id="TABLE_BRAND" />
                                    </th>
                                    <td>
                                        <AppLink href={url.brand(product.brand)}>
                                            {product.brand.name}
                                        </AppLink>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <FormattedMessage id="TABLE_COUNTRY" />
                                    </th>
                                    <td>
                                        <FormattedMessage
                                            id={`${product.brand.country}`}
                                        />
                                    </td>
                                </tr>
                            </React.Fragment>
                        )}
                    </tbody>
                </table>
            </div>
            {product.excerpt && (
                <div className="quickview__product-description">
                    {product.excerpt}
                </div>
            )}
            <div className="quickview__product-prices-stock">
                <div className="quickview__product-prices">
                    {product.compareAtPrice !== null && (
                        <React.Fragment>
                            <div className="quickview__product-price quickview__product-price--old">
                                <CurrencyFormat value={product.compareAtPrice} />
                            </div>
                            <div className="quickview__product-price quickview__product-price--new">
                                <CurrencyFormat value={product.price} />
                            </div>
                        </React.Fragment>
                    )}
                    {product.compareAtPrice === null && (
                        <div className="quickview__product-price quickview__product-price--current">
                            <CurrencyFormat value={product.price} />
                        </div>
                    )}
                </div>
                <StockStatusBadge className="quickview__product-stock" stock={product.stock} />
            </div>
            <div className="quickview__product-actions">
                <AsyncAction
                    action={() => showInquire()}
                    render={({ run, loading }) => (
                        <div className="quickview__product-actions-item quickview__product-actions-item--addtocart w-100 m-0 mb-2">
                            <button
                                type="button"
                                className={classNames('btn', 'btn-primary', 'btn-block', 'w-100', {
                                    'btn-loading': loading,
                                })}
                                onClick={run}
                            >
                                <FormattedMessage id="BUTTON_INQUIRY" />
                            </button>
                        </div>
                    )}
                />
                {typeof window !== 'undefined' && (
                    <button
                        type="button"
                        className="btn btn-success w-100 btn-block"
                        onClick={() => {
                            toast.success('Redirecting to WhatsApp', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 2000,
                                theme: 'colored',
                            });
                            setTimeout(() => {
                                window.open(`https://api.whatsapp.com/send/?phone=818074100831&text=Hi, I'm interested your product named as ${product.name} at ${window.location.protocol}//${window.location.host}/product/${product.slug}, please provide me more details.`, '_blank');
                            }, 3000);
                        }}
                    >
                        Whatsapp
                    </button>
                )}
                <AsyncAction
                    action={() => wishlistAddItem(product)}
                    render={({ run, loading }) => (
                        <div className="quickview__product-actions-item quickview__product-actions-item--wishlist">
                            <button
                                type="button"
                                className={classNames('btn btn-muted btn-icon', {
                                    'btn-loading': loading,
                                })}
                                onClick={run}
                            >
                                <Wishlist16Svg />
                            </button>
                        </div>
                    )}
                />

                <AsyncAction
                    action={() => compareAddItem(product)}
                    render={({ run, loading }) => (
                        <div className="quickview__product-actions-item quickview__product-actions-item--compare">
                            <button
                                type="button"
                                className={classNames('btn btn-muted btn-icon', {
                                    'btn-loading': loading,
                                })}
                                onClick={run}
                            >
                                <Compare16Svg />
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    );

    return (
        <Modal isOpen={quickview.open} toggle={toggle} centered className="quickview">
            <button type="button" className="quickview__close" onClick={quickviewClose}>
                <Cross12Svg />
            </button>

            <FormProvider {...productForm.methods}>
                <form onSubmit={productForm.submit} className="quickview__body">
                    <ProductGallery className="quickview__gallery" layout="quickview" images={image} />

                    {productTemplate}
                </form>
            </FormProvider>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div onClick={quickviewClose}>
                <AppLink href={url.product(product)} className="quickview__see-details">
                    <FormattedMessage id="BUTTON_SEE_FULL_DETAILS" />
                </AppLink>
            </div>
        </Modal>
    );
}

export default Quickview;
