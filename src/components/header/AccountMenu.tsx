// react
import React, { useCallback } from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
// application
import { toast } from 'react-toastify';
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import url from '~/api/services/url';
import { useSignInForm } from '~/api/services/forms/sign-in';
import { useUser, useUserSignOut } from '~/store/user/userHooks';
import { validateEmail } from '~/api/services/validators';
import { AuthService } from '~/api/services/allapi';

interface Props {
    onCloseMenu: () => void;
}

function AccountMenu(props: Props) {
    const { onCloseMenu } = props;
    const intl = useIntl();
    const user = useUser();
    const userSignOut = useUserSignOut();

    const signInForm = useSignInForm({
        onSuccess: useCallback(() => {
            if (onCloseMenu) {
                onCloseMenu();
            }
        }, [onCloseMenu]),
    });

    const onLogOutButtonClick = () => {
        userSignOut().then(() => {
            if (onCloseMenu) {
                onCloseMenu();
            }
        });
    };
    function handleForgotPassword() {
        const email = signInForm.watch('email');
        if (!email || email === 'red-parts@example.com') {
            toast.error('Please enter email');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Please enter valid email');
            return;
        }
        AuthService.passwordForgot({ requestBody: { email: signInForm.watch('email') } })
            .then((res) => {
                toast.success('Password Reset Email sent successfully');
            });
    }

    return (
        <div className="account-menu" onSubmit={signInForm.submit}>
            {user === null && (
                <form className="account-menu__form">
                    <div className="account-menu__form-title">
                        <FormattedMessage id="HEADER_LOGIN_TO_YOUR_ACCOUNT" />
                    </div>
                    {signInForm.serverError && (
                        <div className="alert alert-xs alert-danger mt-n2">
                            <FormattedMessage id={signInForm.serverError} />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="header-signin-email" className="sr-only">
                            <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                        </label>
                        <input
                            id="header-signin-email"
                            type="email"
                            className={classNames('form-control', 'form-control-sm', {
                                'is-invalid': signInForm.errors.email,
                            })}
                            placeholder="customer@example.com"
                            {...signInForm.register('email', { required: true, validate: { email: validateEmail } })}
                        />
                        <div className="invalid-feedback">
                            {signInForm.errors.email?.type === 'required' && (
                                <FormattedMessage id="ERROR_FORM_REQUIRED" />
                            )}
                            {signInForm.errors.email?.type === 'email' && (
                                <FormattedMessage id="ERROR_FORM_INCORRECT_EMAIL" />
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="header-signin-password" className="sr-only">
                            <FormattedMessage id="INPUT_PASSWORD_LABEL" />
                        </label>
                        <div
                            className={classNames('account-menu__form-forgot', {
                                'is-invalid': signInForm.errors.password,
                            })}
                        >
                            <input
                                id="header-signin-password"
                                type="password"
                                className={classNames('form-control', 'form-control-sm', {
                                    'is-invalid': signInForm.errors.password,
                                })}
                                placeholder={intl.formatMessage({ id: 'INPUT_PASSWORD_PLACEHOLDER' })}
                                {...signInForm.register('password', { required: true })}
                            />
                            <button onClick={handleForgotPassword} type="button" className="account-menu__form-forgot-link btn btn-link">
                                <FormattedMessage id="LINK_FORGOT" />
                            </button>
                        </div>
                        <div className="invalid-feedback">
                            {signInForm.errors.password?.type === 'required' && (
                                <FormattedMessage id="ERROR_FORM_REQUIRED" />
                            )}
                        </div>
                    </div>

                    <div className="form-group account-menu__form-button">
                        <button
                            type="submit"
                            className={classNames('btn', 'btn-primary', 'btn-sm', {
                                'btn-loading': signInForm.submitInProgress,
                            })}
                        >
                            <FormattedMessage id="BUTTON_LOGIN" />
                        </button>
                    </div>
                    <div className="account-menu__form-link">
                        <AppLink href={url.signUp()} onClick={onCloseMenu}>
                            <FormattedMessage id="LINK_CREATE_ACCOUNT" />
                        </AppLink>
                    </div>
                </form>
            )}
            {user !== null && (
                <React.Fragment>
                    <AppLink href={url.accountDashboard()} className="account-menu__user" onClick={onCloseMenu}>
                        <div className="account-menu__user-avatar">
                            <AppImage src={user.avatar} />
                        </div>
                        <div className=" account-menu__user-info">
                            <div className=" account-menu__user-name">
                                {`${user.firstName} ${user.lastName}`}
                            </div>
                            <div className=" account-menu__user-email">
                                {user.email}
                            </div>
                        </div>
                    </AppLink>
                    <div className="account-menu__divider" />
                    <ul className="account-menu__links">
                        <li>
                            <AppLink href={url.accountDashboard()} onClick={onCloseMenu}>
                                <FormattedMessage id="LINK_ACCOUNT_DASHBOARD" />
                            </AppLink>
                        </li>
                        <li>
                            <AppLink href={url.accountProfile()} onClick={onCloseMenu}>
                                <FormattedMessage id="LINK_ACCOUNT_PROFILE" />
                            </AppLink>
                        </li>
                        <li>
                            <AppLink href={url.accountInquires()} onClick={onCloseMenu}>
                                <FormattedMessage id="LINK_ACCOUNT_INQUIRIES" />
                            </AppLink>
                        </li>
                        <li>
                            <AppLink href={url.accountOrders()} onClick={onCloseMenu}>
                                <FormattedMessage id="LINK_ACCOUNT_ORDERS" />
                            </AppLink>
                        </li>
                        <li>
                            <AppLink href={url.accountAddresses()} onClick={onCloseMenu}>
                                <FormattedMessage id="LINK_ACCOUNT_ADDRESSES" />
                            </AppLink>
                        </li>
                    </ul>
                    <div className="account-menu__divider" />
                    <ul className="account-menu__links">
                        <li>
                            <button type="button" onClick={onLogOutButtonClick}>
                                <FormattedMessage id="LINK_ACCOUNT_LOGOUT" />
                            </button>
                        </li>
                    </ul>
                </React.Fragment>
            )}
        </div>
    );
}

export default AccountMenu;
