/* eslint-disable no-alert */

// react
import React, { useEffect } from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
// application
import { GetServerSideProps } from 'next';
import AppLink from '~/components/shared/AppLink';
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockSpace from '~/components/blocks/BlockSpace';
import Checkbox from '~/components/shared/Checkbox';
import CheckoutCart from '~/components/shop/CheckoutCart';
import CheckoutForm from '~/components/shop/CheckoutForm';
import CheckoutPayments from '~/components/shop/CheckoutPayments';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/services/url';
import { getAddressFormDefaultValue, IAddressForm } from '~/components/shared/AddressForm';
import { getRegisterFormDefaultValue, IRegisterForm } from '~/components/shared/RegisterForm';
import { hrefToRouterArgs } from '~/services/router';
import { ICheckoutData } from '~/api/base';
import { shopApi } from '~/api';
import { useAsyncAction } from '~/store/hooks';
import { useCart } from '~/store/cart/cartHooks';
import { useUser, useUserSignUp } from '~/store/user/userHooks';
import { IProduct } from '~/interfaces/product';

interface Props {
    product: IProduct | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const slug = typeof params?.slug === 'string' ? params?.slug : null;

    return {
        props: {
            product: slug ? await shopApi.getProductBySlug(slug) : null,
        },
    };
};

interface IForm {
    billingAddress: IAddressForm;
    createAccount: boolean;
    account: IRegisterForm;
    shipToDifferentAddress: boolean;
    shippingAddress: IAddressForm;
    comment: string;
    payment: string;
    agree: boolean;
}
// {
//     "lastItemId": 13,
//     "quantity": 1,
//     "items": [
//         {
//             "id": 13,
//             "product": {
//                 "id": "64a900fb1f310332d631b6cb",
//                 "name": "SUZUKI WagonR 2021",
//                 "excerpt": "",
//                 "description": "",
//                 "slug": "64a900fb1f310332d631b6cb",
//                 "sku": "AU2340017181",
//                 "partNumber": "64a900fb1f310332d631b6cb",
//                 "location": "Northern Osaka, Osaka",
//                 "stock": "Available",
//                 "price": 799000,
//                 "compareAtPrice": null,
//                 "images": [
//                     "https://media.muepu-devapi.com/jck-media/car-photo/vehicles/bkkn/523/003/U00041523003/U00041523003_001L.JPG",
//                     "https://media.muepu-devapi.com/jck-media/car-photo/vehicles/ml/523/003/U00041523003/U00041523003_1_001.jpg",
//                     "https://media.muepu-devapi.com/jck-media/car-photo/vehicles/ml/523/003/U00041523003/U00041523003_2_001.jpg"
//                 ],
//                 "badges": [
//                     "sale"
//                 ],
//                 "rating": 5,
//                 "reviews": 0,
//                 "availability": "Available",
//                 "compatibility": [],
//                 "brand": {
//                     "name": "SUZUKI",
//                     "slug": "SUZUKI",
//                     "country": "",
//                     "image": ""
//                 },
//                 "bodyType": {
//                     "slug": "Hatchback",
//                     "name": "Hatchback",
//                     "image": "",
//                     "country": ""
//                 },
//                 "type": {
//                     "slug": "default",
//                     "name": "Default",
//                     "attributeGroups": [
//                         {
//                             "name": "General",
//                             "slug": "general",
//                             "attributes": [
//                                 "make",
//                                 "model",
//                                 "transmission",
//                                 "engine-type",
//                                 "body-type",
//                                 "mileage",
//                                 "fuel",
//                                 "doors"
//                             ]
//                         },
//                         {
//                             "name": "Dimensions",
//                             "slug": "dimensions",
//                             "attributes": [
//                                 "length",
//                                 "width",
//                                 "height"
//                             ]
//                         }
//                     ]
//                 },
//                 "attributes": [
//                     {
//                         "name": "Make",
//                         "slug": "make",
//                         "featured": true,
//                         "values": [
//                             {
//                                 "name": "SUZUKI",
//                                 "slug": "SUZUKI"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Model",
//                         "slug": "model",
//                         "featured": true,
//                         "values": [
//                             {
//                                 "name": "WagonR",
//                                 "slug": "WagonR"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Engine Type",
//                         "slug": "engine-type",
//                         "featured": true,
//                         "values": [
//                             {
//                                 "name": "Hybrid",
//                                 "slug": "Hybrid"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Body Type",
//                         "slug": "body-type",
//                         "featured": true,
//                         "values": [
//                             {
//                                 "name": "Hatchback",
//                                 "slug": "Hatchback"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Transmission",
//                         "slug": "transmission",
//                         "featured": true,
//                         "values": [
//                             {
//                                 "name": "Instrument panel CVT",
//                                 "slug": "Instrument panel CVT"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Fuel",
//                         "slug": "fuel",
//                         "featured": true,
//                         "values": [
//                             {
//                                 "name": "Petrol",
//                                 "slug": "Petrol"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Mileage",
//                         "slug": "mileage",
//                         "featured": true,
//                         "values": [
//                             {
//                                 "name": "3000",
//                                 "slug": "3000"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Doors",
//                         "slug": "doors",
//                         "featured": true,
//                         "values": [
//                             {
//                                 "name": "5",
//                                 "slug": "5"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Length",
//                         "slug": "length",
//                         "featured": false,
//                         "values": [
//                             {
//                                 "name": "3395(mm)",
//                                 "slug": "3395(mm)"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Width",
//                         "slug": "width",
//                         "featured": false,
//                         "values": [
//                             {
//                                 "name": "1475(mm)",
//                                 "slug": "1475(mm)"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Height",
//                         "slug": "height",
//                         "featured": false,
//                         "values": [
//                             {
//                                 "name": "1650(mm)",
//                                 "slug": "1650(mm)"
//                             }
//                         ]
//                     },
//                     {
//                         "name": "Color",
//                         "slug": "color",
//                         "featured": false,
//                         "values": [
//                             {
//                                 "name": "Silver M",
//                                 "slug": "Silver M"
//                             }
//                         ]
//                     }
//                 ],
//                 "options": [
//                     {
//                         "type": "default",
//                         "slug": "material",
//                         "name": "Material",
//                         "values": [
//                             {
//                                 "slug": "steel",
//                                 "name": "Steel"
//                             },
//                             {
//                                 "slug": "aluminium",
//                                 "name": "Aluminium"
//                             },
//                             {
//                                 "slug": "thorium",
//                                 "name": "Thorium"
//                             }
//                         ]
//                     },
//                     {
//                         "type": "color",
//                         "slug": "color",
//                         "name": "Color",
//                         "values": [
//                             {
//                                 "slug": "Silver M",
//                                 "name": "Silver M"
//                             }
//                         ]
//                     }
//                 ],
//                 "tags": [],
//                 "categories": [],
//                 "customFields": {}
//             },
//             "options": [],
//             "price": 799000,
//             "total": 799000,
//             "quantity": 1
//         }
//     ],
//     "subtotal": 799000,
//     "totals": [
//         {
//             "type": "shipping",
//             "title": "SHIPPING",
//             "price": 25
//         },
//         {
//             "type": "tax",
//             "title": "TAX",
//             "price": 159800
//         }
//     ],
//     "total": 958825,
//     "stateFrom": "client"
// }
function Page({ product }: Props) {
    console.log(product);
    const router = useRouter();
    const intl = useIntl();
    const user = useUser();
    const userSignUp = useUserSignUp();
    const cart = useCart();
    console.log(cart);
    const formMethods = useForm<IForm>({
        defaultValues: {
            billingAddress: getAddressFormDefaultValue(),
            createAccount: false,
            account: getRegisterFormDefaultValue(),
            shipToDifferentAddress: false,
            shippingAddress: getAddressFormDefaultValue(),
            comment: '',
            payment: 'bank',
        },
    });
    const { handleSubmit, register, formState: { errors } } = formMethods;
    const [checkout, checkoutInProgress] = useAsyncAction(async (data: IForm) => {
        const { billingAddress } = data;
        const shippingAddress = data.shipToDifferentAddress ? data.shippingAddress : data.billingAddress;

        const checkoutData: ICheckoutData = {
            payment: data.payment,
            items: cart.items.map((item) => ({
                productId: item.product.id,
                options: item.options.map((option) => ({
                    name: option.name,
                    value: option.value,
                })),
                quantity: item.quantity,
            })),
            billingAddress,
            shippingAddress,
            comment: data.comment,
        };

        if (data.createAccount) {
            try {
                await userSignUp(data.account.email, data.account.password, data.account.username);
            } catch (error) {
                if (error instanceof Error) {
                    alert(intl.formatMessage({ id: `ERROR_API_${error.message}` }));
                }

                return;
            }
        }

        const order = await shopApi.checkout(checkoutData);

        await router.push(...hrefToRouterArgs(url.checkoutSuccess(order)));
    }, [intl, cart, userSignUp, router]);

    useEffect(() => {
        if (cart.stateFrom === 'client' && cart.items.length < 1) {
            router.replace(url.cart()).then();
        }
    }, [cart.stateFrom, cart.items.length, router]);

    if (cart.items.length < 1) {
        return null;
    }

    const { ref: agreeRef, ...agreeProps } = register('agree', { required: true });

    return (
        <React.Fragment>
            <PageTitle>{intl.formatMessage({ id: 'HEADER_CHECKOUT' })}</PageTitle>

            <BlockHeader
                pageTitle={<FormattedMessage id="HEADER_CHECKOUT" />}
                breadcrumb={[
                    { title: (<FormattedMessage id="LINK_HOME" />), url: url.home() },
                ]}
            />

            <FormProvider {...formMethods}>
                <form className="checkout block" onSubmit={handleSubmit(checkout)}>
                    <div className="container container--max--xl">
                        <div className="row">
                            {!user && (
                                <div className="col-12 mb-3">
                                    <div className="alert alert-lg alert-primary">
                                        <FormattedMessage
                                            id="TEXT_ALERT_RETURNING_CUSTOMER"
                                            values={{
                                                link: (
                                                    <AppLink href={url.signIn()}>
                                                        <FormattedMessage id="TEXT_ALERT_RETURNING_CUSTOMER_LINK" />
                                                    </AppLink>
                                                ),
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="col-12 col-lg-6 col-xl-7">
                                <div className="card mb-lg-0">
                                    <div className="card-body card-body--padding--2">
                                        <CheckoutForm />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                                <div className="card mb-0">
                                    <div className="card-body card-body--padding--2">
                                        <h3 className="card-title">
                                            <FormattedMessage id="HEADER_YOUR_ORDER" />
                                        </h3>

                                        <CheckoutCart />

                                        <CheckoutPayments />

                                        <div className="checkout__agree form-group">
                                            <div className="form-check">
                                                <Checkbox
                                                    id="checkout-form-agree"
                                                    className={classNames('form-check-input', {
                                                        'is-invalid': errors.agree,
                                                    })}
                                                    inputRef={agreeRef}
                                                    {...agreeProps}
                                                />
                                                <label className="form-check-label" htmlFor="checkout-form-agree">
                                                    <FormattedMessage
                                                        id="INPUT_TERMS_AGREE_LABEL"
                                                        values={{
                                                            link: (
                                                                <AppLink href={url.pageTerms()} target="_blank">
                                                                    <FormattedMessage
                                                                        id="INPUT_TERMS_AGREE_LABEL_LINK"
                                                                    />
                                                                </AppLink>
                                                            ),
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className={classNames(
                                                'btn',
                                                'btn-primary',
                                                'btn-xl',
                                                'btn-block',
                                                {
                                                    'btn-loading': checkoutInProgress,
                                                },
                                            )}
                                        >
                                            <FormattedMessage id="BUTTON_PLACE_ORDER" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
