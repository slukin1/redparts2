import React from 'react';
import AppLink from '~/components/shared/AppLink';

export default function ButtonWhatsApp({ className = '', href = '/catalog/products' }) {
    return (
        <AppLink
            href={href}
            className={`${className} btn btn-success`}
        >
            WhatsApp
        </AppLink>
    );
}
