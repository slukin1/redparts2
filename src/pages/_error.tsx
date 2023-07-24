import React from 'react';
import Link from 'next/link';

const ErrorPage = ({ statusCode }: {
    statusCode: number;
}) => {
    const errorMessage = statusCode
        ? `An error ${statusCode} occurred on the server`
        : 'An error occurred on the client';

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 p-5">
            <div className="card w-100 h-100">
                <div className="card-body w-100">
                    <div className="text-center">
                        <h1 className="display-4">Oops!</h1>
                        <p className="lead">{errorMessage}</p>
                        <Link href="/">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="btn btn-primary">Go back to Home</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }: {
    res: any;
    err: any;
}) => {
    // eslint-disable-next-line no-nested-ternary
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;
