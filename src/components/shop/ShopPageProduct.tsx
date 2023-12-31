// react
import React, { useEffect, useState } from 'react';
// third-party
import classNames from 'classnames';
import { FormProvider } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
// application
import { toast } from 'react-toastify';
import AppLink from '~/components/shared/AppLink';
import AsyncAction from '~/components/shared/AsyncAction';
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockProductsCarousel from '~/components/blocks/BlockProductsCarousel';
import BlockSpace from '~/components/blocks/BlockSpace';
import CompatibilityStatusBadge from '~/components/shared/CompatibilityStatusBadge';
import CurrencyFormat from '~/components/shared/CurrencyFormat';
import PageTitle from '~/components/shared/PageTitle';
import ProductGallery, { IProductGalleryLayout } from '~/components/shop/ProductGallery';
import ProductSidebar from '~/components/shop/ProductSidebar';
import ProductTabs from '~/components/shop/ProductTabs';
import ShareLinks from '~/components/shared/ShareLinks';
import StockStatusBadge from '~/components/shared/StockStatusBadge';
import url from '~/api/services/url';
import { getCategoryPath } from '~/api/services/utils';
import { IProduct } from '~/interfaces/product';
import { IProductPageLayout, IProductPageSidebarPosition } from '~/interfaces/pages';
import { shopApi } from '~/api';
import { useCompareAddItem } from '~/store/compare/compareHooks';
import { useProductForm } from '~/api/services/forms/product';
import { useWishlistAddItem } from '~/store/wishlist/wishlistHooks';
import {
    Compare16Svg,
    Fi24Hours48Svg,
    FiFreeDelivery48Svg,
    FiPaymentSecurity48Svg,
    FiTag48Svg, WhatsApp20Svg,
    Wishlist16Svg,
} from '~/svg';
import { useInquireOpen } from '~/store/inquire/inquireHooks';
import { useWhatsappOpen } from '~/store/whatsapp/whatsappHooks';

interface Props {
    product: IProduct;
    layout: IProductPageLayout;
    sidebarPosition?: IProductPageSidebarPosition;
}

function ShopPageProduct(props: Props) {
    const {
        product,
        layout,
        sidebarPosition = 'start',
    } = props;
    const intl = useIntl();
    const wishlistAddItem = useWishlistAddItem();
    const compareAddItem = useCompareAddItem();
    const galleryLayout = `product-${layout}` as IProductGalleryLayout;
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const productForm = useProductForm(product);
    const inquire = useInquireOpen();
    const whatsapp = useWhatsappOpen();
    const useWhatsapp = () => whatsapp(product.slug);
    const useInquire = () => inquire(product.slug);
    useEffect(() => {
        let canceled = false;

        shopApi.getRelatedProducts(product.id, 8).then((result) => {
            if (canceled) {
                return;
            }

            setRelatedProducts(result);
        });

        return () => {
            canceled = true;
        };
    }, [product]);

    if (!product) {
        return null;
    }

    const breadcrumb = [
        { title: intl.formatMessage({ id: 'LINK_HOME' }), url: url.home() },
        { title: intl.formatMessage({ id: 'LINK_SHOP' }), url: url.shop() },
        ...getCategoryPath(product.categories && product.categories[0]).map((x) => ({
            title: x.name,
            url: url.category(x),
        })),
        { title: product.name, url: url.product(product) },
    ];
    const featuredAttributes = product.attributes.filter((x) => x.featured);

    const shopFeatures = (
        <div className="product__shop-features shop-features">
            <ul className="shop-features__list">
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <FiFreeDelivery48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_FREE_SHIPPING_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_FREE_SHIPPING_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <Fi24Hours48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SUPPORT_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SUPPORT_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <FiPaymentSecurity48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SECURITY_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SECURITY_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <FiTag48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_HOT_OFFERS_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_HOT_OFFERS_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
            </ul>
        </div>
    );

    const productInfoBody = (
        <div className="product__info-body">
            {product.compareAtPrice && (
                <div className="product__badge tag-badge tag-badge--sale">
                    <FormattedMessage id="TEXT_BADGE_SALE" />
                </div>
            )}

            <div className="product__prices-stock">
                <div className="product__prices">
                    {product.compareAtPrice && (
                        <React.Fragment>
                            <div className="product__price product__price--old">
                                <CurrencyFormat value={product.compareAtPrice} />
                            </div>
                            <div className="product__price product__price--new">
                                <CurrencyFormat value={product.price} />
                            </div>
                        </React.Fragment>
                    )}
                    {!product.compareAtPrice && (
                        <div className="product__price product__price--current">
                            <CurrencyFormat value={product.price} />
                        </div>
                    )}
                </div>
                <StockStatusBadge className="product__stock" stock={product.stock} />
            </div>

            <div className="product__meta">
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <FormattedMessage id="TABLE_REFERENCE" />
                            </th>
                            <td>{product.refNo}</td>
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
                                        {product.brand.country}
                                    </td>
                                </tr>
                            </React.Fragment>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const productActions = (
        <div className="product__actions">
            {product.stock !== 'out-of-stock' && (
                <React.Fragment>
                    <AsyncAction
                        action={() => useInquire()}
                        render={({ run, loading }) => (
                            <div className="product__actions-item product__actions-item--addtocart">
                                <button
                                    type="button"
                                    className={classNames('btn', 'btn-primary', 'btn-lg', 'btn-block', {
                                        'btn-loading': loading,
                                    })}
                                    onClick={run}
                                >
                                    <FormattedMessage id="BUTTON_INQUIRY" />
                                </button>
                                {typeof window !== 'undefined' && (
                                    <AsyncAction
                                        action={() => useWhatsapp()}
                                        render={({ run, loading }) => (
                                            <React.Fragment>
                                                <button
                                                    type="button"
                                                    className={classNames('btn', 'btn-success', 'btn-lg', 'btn-block')}
                                                    onClick={run}
                                                >
                                                    WhatsApp
                                                </button>
                                            </React.Fragment>
                                        )}
                                    />
                                )}
                            </div>
                        )}
                    />

                    <div className="product__actions-divider" />
                </React.Fragment>
            )}
            <AsyncAction
                action={() => wishlistAddItem(product)}
                render={({ run, loading }) => (
                    <button
                        type="button"
                        className={classNames('product__actions-item', 'product__actions-item--wishlist', {
                            'product__actions-item--loading': loading,
                        })}
                        onClick={run}
                    >
                        <Wishlist16Svg />
                        <span>
                            <FormattedMessage id="BUTTON_ADD_TO_WISHLIST" />
                        </span>
                    </button>
                )}
            />
            <AsyncAction
                action={() => compareAddItem(product)}
                render={({ run, loading }) => (
                    <button
                        type="button"
                        className={classNames('product__actions-item', 'product__actions-item--compare', {
                            'product__actions-item--loading': loading,
                        })}
                        onClick={run}
                    >
                        <Compare16Svg />
                        <span>
                            <FormattedMessage id="BUTTON_ADD_TO_COMPARE" />
                        </span>
                    </button>
                )}
            />
        </div>
    );

    const productTagsAndShareLinks = (
        <div className="product__tags-and-share-links">
            {product.tags && product.tags.length > 0 && (
                <div className="product__tags tags tags--sm">
                    <div className="tags__list">
                        {product.tags.map((tag, index) => (
                            <AppLink href="/" key={index}>
                                {tag}
                            </AppLink>
                        ))}
                    </div>
                </div>
            )}
            <ShareLinks className="product__share-links" />
        </div>
    );

    return (
        <React.Fragment>
            <PageTitle>{product.name}</PageTitle>

            <BlockHeader
                breadcrumb={breadcrumb}
            />

            <div className={classNames('block-split', { 'block-split--has-sidebar': layout === 'sidebar' })}>
                <div className="container">
                    <div className="block-split__row row no-gutters">
                        {layout === 'sidebar' && sidebarPosition === 'start' && (
                            <div className="block-split__item block-split__item-sidebar col-auto">
                                <ProductSidebar />
                            </div>
                        )}

                        <div className="block-split__item block-split__item-content col-auto">
                            <div className={`product product--layout--${layout}`}>
                                <div className="product__body">
                                    <div className="product__card product__card--one" />
                                    <div className="product__card product__card--two" />

                                    <ProductGallery
                                        images={product.images || []}
                                        layout={galleryLayout}
                                        className="product__gallery"
                                    />

                                    <div className="product__header">
                                        <h1 className="product__title">{product.name}</h1>

                                        <div className="product__subtitle">
                                            {/* <div className="product__rating"> */}
                                            {/*    <div className="product__rating-stars"> */}
                                            {/*        <Rating value={product.rating || 0} /> */}
                                            {/*    </div> */}
                                            {/*    <div className="product__rating-label"> */}
                                            {/*        <AppLink href={{ href: { hash: 'product-tab-reviews' } }}> */}
                                            {/*            <FormattedMessage */}
                                            {/*                id="TEXT_RATING_LABEL" */}
                                            {/*                values={{ */}
                                            {/*                    rating: product.rating, */}
                                            {/*                    reviews: product.reviews, */}
                                            {/*                }} */}
                                            {/*            /> */}
                                            {/*        </AppLink> */}
                                            {/*    </div> */}
                                            {/* </div> */}

                                            <CompatibilityStatusBadge className="product__fit" product={product} />
                                        </div>
                                    </div>

                                    {layout === 'full' && (
                                        <div className="product__main">
                                            {product.excerpt && (
                                                <div className="product__excerpt">
                                                    {product.excerpt}
                                                </div>
                                            )}

                                            {featuredAttributes.length > 0 && (
                                                <div className="product__features">
                                                    <div className="product__features-title">
                                                        <FormattedMessage id="TEXT_KEY_FEATURES" />
                                                        :
                                                    </div>
                                                    <ul>
                                                        {featuredAttributes.map((attribute, index) => (
                                                            <li key={index}>
                                                                {attribute.name}
                                                                {': '}
                                                                <span>
                                                                    {attribute.values
                                                                        .map((value) => value.name)
                                                                        .join(', ')}
                                                                </span>
                                                            </li>
                                                        ))}

                                                    </ul>
                                                    <div className="product__features-link">
                                                        <AppLink href={{ href: { hash: 'product-tab-specification' } }}>
                                                            <FormattedMessage id="LINK_SEE_FULL_SPECIFICATION" />
                                                        </AppLink>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="product__info">
                                        <FormProvider {...productForm.methods}>
                                            <form onSubmit={productForm.submit} className="product__info-card">
                                                {productInfoBody}

                                                {/* {product.options.length > 0 && ( */}
                                                {/*    <ProductForm */}
                                                {/*        options={product.options} */}
                                                {/*        className="product__form" */}
                                                {/*        namespace="options" */}
                                                {/*    /> */}
                                                {/* )} */}

                                                {productActions}

                                                {productTagsAndShareLinks}
                                            </form>
                                        </FormProvider>

                                        {shopFeatures}
                                    </div>

                                    <ProductTabs className="product__tabs" product={product} layout={layout} />
                                </div>
                            </div>

                            {relatedProducts.length > 0 && (
                                <React.Fragment>
                                    <BlockSpace layout="divider-nl" />

                                    <BlockProductsCarousel
                                        blockTitle={intl.formatMessage({ id: 'HEADER_RELATED_PRODUCTS' })}
                                        products={relatedProducts}
                                        layout={layout === 'sidebar' ? 'grid-4-sidebar' : 'grid-5'}
                                    />
                                </React.Fragment>
                            )}
                        </div>

                        {layout === 'sidebar' && sidebarPosition === 'end' && (
                            <div className="block-split__item block-split__item-sidebar col-auto">
                                <ProductSidebar />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default ShopPageProduct;
