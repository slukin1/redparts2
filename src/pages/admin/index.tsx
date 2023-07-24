import { FormattedMessage, useIntl } from 'react-intl';
import classNames from 'classnames';
import React from 'react';
import { validateEmail } from '~/api/services/validators';
import { useSignInForm } from '~/api/services/forms/sign-in';
import PageTitle from '~/components/shared/PageTitle';
import BlockSpace from '~/components/blocks/BlockSpace';

export default function Page() {
    const signInForm = useSignInForm();
    const intl = useIntl();
    function handleForgotPassowrd() {
        alert('Forgot password');
    }
    return (
        <React.Fragment>
            <BlockSpace layout="after-header" />
            <div className="block h-100 w-100">
                <div className="container container--max--lg">
                    <div className="row">
                        <div className="card flex-grow-1 mb-md-0 mr-0 mr-lg-3 ml-0 ml-lg-4">
                            <div className="card-body card-body--padding--2">
                                <h3 className="card-title">
                                    Admin Login
                                </h3>
                                <form onSubmit={signInForm.submit}>
                                    {signInForm.serverError && (
                                        <div className="alert alert-sm alert-danger">
                                            <FormattedMessage id={signInForm.serverError} />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label htmlFor="signin-email">
                                            <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                                        </label>
                                        <input
                                            id="signin-email"
                                            type="email"
                                            className={classNames('form-control', {
                                                'is-invalid': signInForm.errors.email,
                                            })}
                                            placeholder="customer@example.com"
                                            {...signInForm.register('email', {
                                                required: true,
                                                validate: { email: validateEmail },
                                            })}
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
                                        <label htmlFor="signin-password">
                                            <FormattedMessage id="INPUT_PASSWORD_LABEL" />
                                        </label>
                                        <input
                                            id="signin-password"
                                            type="password"
                                            className={classNames('form-control', {
                                                'is-invalid': signInForm.errors.password,
                                            })}
                                            placeholder={intl.formatMessage({ id: 'INPUT_PASSWORD_PLACEHOLDER' })}
                                            {...signInForm.register('password', { required: true })}
                                        />
                                        <div className="invalid-feedback">
                                            {signInForm.errors.password?.type === 'required' && (
                                                <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group mb-0">
                                        <button
                                            type="submit"
                                            className={classNames('btn', 'btn-primary', 'mt-3', {
                                                'btn-loading': signInForm.submitInProgress,
                                            })}
                                        >
                                            <FormattedMessage id="BUTTON_LOGIN" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BlockSpace layout="after-header" />
        </React.Fragment>
    );
}
