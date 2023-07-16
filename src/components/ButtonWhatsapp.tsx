import React from 'react';
import AppLink from '~/components/shared/AppLink';

export default function ButtonWhatsApp({ className = '' }) {
    return (
        <AppLink
            className={`${className} btn btn-success`}
        >
            WhatsApp
        </AppLink>
    );
}
