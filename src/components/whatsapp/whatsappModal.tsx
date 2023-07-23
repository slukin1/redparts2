/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
// Path: src/components/inquiry/InquiryModal.tsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import { Cross12Svg } from "~/svg";
import { useWhatsapp, useWhatsappClose } from "~/store/whatsapp/whatsappHooks";

interface Country {
    name: string;
    code: string;
    callingCode: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    port: string;
    country: string;
    email: string;
    phoneNumber: string;
    comments: string;
}

function WhatsAppModal() {
    const whatsapp = useWhatsapp();
    const whatsappClose = useWhatsappClose();
    const { product } = whatsapp;
    const [loading, setLoading] = useState(false);
    const image = useMemo(() => product?.images || [], [product]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const formattedCountries = data.map((country: any) => ({
                    name: country.name.common,
                    code: country.cca2,
                }));
                formattedCountries.sort((a: Country, b: Country) => a.name.localeCompare(b.name));
                setCountries(formattedCountries);
            });
    }, []);

    const toggle = useCallback(() => {
        if (whatsapp.open) {
            whatsappClose();
        }
    }, [whatsapp.open, whatsappClose]);

    if (!product) {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function onSubmit(data: FormData) {
        setLoading(true);
        console.log(product);
        const phoneNumber = "818070858003";
        const message = `*Hello Jacokin!*
        I am interested in this car, the *${product.name}*.

        **Car Details:**
        Product Name: ${product.name}
        Url: ${window.location.protocol}//${window.location.host}/product/${product.slug}
        RefNo: ${product.refNo}
        Make: ${product?.attributes[0].values[0].name}
        Model: ${product?.attributes[1].values[0].name}
        Engine Type: ${product?.attributes[2].values[0].name}
        Body Type: ${product?.attributes[3].values[0].name}
        Transmission: ${product?.attributes[4].values[0].name}
        Fuel: ${product?.attributes[5].values[0].name}
        Mileage: ${product?.attributes[6].values[0].name}

        **Event Details:**
        Port:
        Pre-export Inspection: ${data.prexInspection}
        Marine Insurance Fee: ${data.marineInsurance}

        Please provide me with more details about the product,
        including pricing, availability, and any other relevant information.

        **My Contact info:**
        First Name: ${data.firstName}
        Last Name: ${data.lastName}
        Phone Number: ${data.phoneNumber}
        Email: ${data.email}
        My country: ${data.country}
        Port: ${data.port}

        Looking forward to your response.

        Best regards,
        ${data.firstName} ${data.lastName}`;

        const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        toast.success("Redirecting to WhatsApp", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            theme: "colored",
        });
        setTimeout(() => {
            window.open(url, "_blank");
        }, 3000);

        reset();
        setLoading(false);
    }

    const productTemplate = (
        <div className="quickview__product d-flex flex-column flex-lg-row">
            <div className="quickview__body p-0 pr-1">
                <img src={image[0]} alt="" className="w-100 h-100 d-flex " />
            </div>
            <div className="w-100 flex">
                <div className="quickview__product-name text-start">{product.name}</div>
                <div className="quickview__product-meta d-flex justify-content-start align-items-center flex-col">
                    <CurrencyFormat value={product.price} />
                </div>

                {product.excerpt && <div className="quickview__product-description">{product.excerpt}</div>}
                <div className="">
                    <div className="form-group m-0 p-0">
                        <label htmlFor="country">Country</label>
                        <select
                            className={`form-control ${errors.country ? "is-invalid" : ""}`}
                            id="country"
                            {...register("country", { required: "Country is required" })}
                        >
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                    </div>
                    <div className="form-group m-0 p-0">
                        <label htmlFor="port">Port</label>
                        <select
                            className={`form-control ${errors.country ? "is-invalid" : ""}`}
                            id="port"
                            {...register("port")}
                        >
                            <option value="">Select a port</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="prexInspection"
                                        {...register("prexInspection")}
                                    />
                                    <label className="custom-control-label" htmlFor="prexInspection">
                                        Pre-export Inspection
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="marineInsurance"
                                        {...register("marineInsurance")}
                                    />
                                    <label className="custom-control-label" htmlFor="marineInsurance">
                                        Marine Insurance Fee
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-50 d-flex"> */}
                        {/*     <div className="form-group d-flex" style={{ width: '100px' }}> */}
                        {/*         <ReCAPTCHA */}
                        {/*             sitekey="YOUR_RECAPTCHA_SITE_KEY" */}
                        {/*             {...register('recapt</div>cha', { */}
                        {/*                 required: 'reCAPTCHA validation is required', */}
                        {/*             })} */}
                        {/*         /> */}
                        {/*         {errors.recaptcha && <div className="invalid-feedback">{errors.recaptcha.message}</div>} */}
                        {/*     </div> */}
                        {/* </div> */}
                    </div>
                    {/* <div className="quickview__product-actions d-flex flex-row"> */}
                    {/*    <AsyncAction */}
                    {/*        action={() => wishlistAddItem(product)} */}
                    {/*        render={({ run, loading }) => ( */}
                    {/*            <div */}
                    {/*                className="quickview__product-actions-item quickview__product-actions-item--wishlist" */}
                    {/*            > */}
                    {/*                <button */}
                    {/*                    type="button" */}
                    {/*                    className={classNames('btn btn-muted btn-icon', { */}
                    {/*                        'btn-loading': loading, */}
                    {/*                    })} */}
                    {/*                    onClick={run} */}
                    {/*                > */}
                    {/*                    <Wishlist16Svg /> */}
                    {/*                </button> */}
                    {/*            </div> */}
                    {/*        )} */}
                    {/*    /> */}

                    {/*    <AsyncAction */}
                    {/*        action={() => compareAddItem(product)} */}
                    {/*        render={({ run, loading }) => ( */}
                    {/*            <div */}
                    {/*                className="quickview__product-actions-item quickview__product-actions-item--compare" */}
                    {/*            > */}
                    {/*                <button */}
                    {/*                    type="button" */}
                    {/*                    className={classNames('btn btn-muted btn-icon', { */}
                    {/*                        'btn-loading': loading, */}
                    {/*                    })} */}
                    {/*                    onClick={run} */}
                    {/*                > */}
                    {/*                    <Compare16Svg /> */}
                    {/*                </button> */}
                    {/*            </div> */}
                    {/*        )} */}
                    {/*    /> */}
                    {/* </div> */}
                    {/* <div className="quickview__product-prices-stock mt-3 pt-0 pt-lg-3 mt-lg-0"> */}
                    {/*    <div className="quickview__product-prices"> */}
                    {/*        {product.compareAtPrice !== null && ( */}
                    {/*            <React.Fragment> */}
                    {/*                <div className="quickview__product-price quickview__product-price--old"> */}
                    {/*                    <CurrencyFormat value={product.compareAtPrice} /> */}
                    {/*                </div> */}
                    {/*                <div className="quickview__product-price quickview__product-price--new"> */}
                    {/*                    <CurrencyFormat value={product.price} /> */}
                    {/*                </div> */}
                    {/*            </React.Fragment> */}
                    {/*        )} */}
                    {/*        {product.compareAtPrice === null && ( */}
                    {/*            <div className="quickview__product-price quickview__product-price--current"> */}
                    {/*                <CurrencyFormat value={product.price} /> */}
                    {/*            </div> */}
                    {/*        )} */}
                    {/*    </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );

    // @ts-ignore
    // @ts-ignore
    return (
        <Modal isOpen={whatsapp.open} toggle={toggle} centered className="quickview">
            <button type="button" className="quickview__close" onClick={whatsappClose}>
                <Cross12Svg />
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="quickview__body p-3 d-flex flex-column">
                {productTemplate}
                <div className="d-flex flex-row w-100">
                    {/* First Name */}
                    <div className="form-group w-100 pr-2 m-0">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                            id="firstName"
                            {...register("firstName", { required: "First Name is required" })}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                    </div>

                    {/* Last Name */}
                    <div className="form-group w-100 pl-2 m-0">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                            id="lastName"
                            {...register("lastName", { required: "Last Name is required" })}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                    </div>
                </div>
                <div className="d-flex flex-row w-100">
                    {/* Email */}
                    <div className="form-group w-100 pr-2 m-0">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    {/* Phone Number with Country Code Selector */}
                    <div className="form-group w-100 pl-2 m-0">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                                id="phoneNumber"
                                {...register("phoneNumber", {
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^[+]*[(]?[0-9]{1,3}[)]?[-\s./0-9]*$/g,
                                        message: "Invalid phone number",
                                    },
                                })}
                            />
                        </div>
                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
                    </div>
                </div>
                {/* Comments Text Area */}
                <div className="form-group">
                    <label htmlFor="comments">Comments</label>
                    <textarea
                        className={`form-control ${errors.comments ? "is-invalid" : ""}`}
                        id="comments"
                        {...register("comments", { required: "Comments are required" })}
                    />
                    {errors.comments && <div className="invalid-feedback">{errors.comments.message}</div>}
                </div>
                {/* Submit Button */}
                {loading ? (
                    <button type="submit" className="btn btn-primary btn-loading" disabled>
                        Submit
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                )}
            </form>
        </Modal>
    );
}

export default WhatsAppModal;
