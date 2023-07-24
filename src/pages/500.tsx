// react
import React from 'react';
// application
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/api/services/url';

function SiteServerError() {
    return (
        <React.Fragment>
            <PageTitle>
                Server Error
            </PageTitle>

            <BlockSpace layout="spaceship-ledge-height" />

            <div className="block">
                <div className="container">
                    <div className="server-error">
                        <div className="server-error__500">
                            Oops! Error 500
                        </div>

                        <div className="server-error__content">
                            <h1 className="server-error__title">Server Error</h1>

                            <p className="server-error__text">
                                Sorry, something went wrong on the server.
                                <br />
                                Please try again later.
                            </p>

                            <p className="server-error__text">
                                Or go to the home page to start over.
                            </p>

                            <AppLink href={url.home()} className="btn btn-secondary btn-sm">
                                Go To Home Page
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default SiteServerError;
