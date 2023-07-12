// application
import { IMobileMenuLink } from '~/interfaces/mobile-menu-link';

const dataMobileMenuLinks: IMobileMenuLink[] = [
    {
        title: 'Stock List',
        url: '/',
        submenu: [
            { title: 'Home One', url: '/' },
            { title: 'Home Two', url: '/vehicles/home-two' },
            // {
            //     title: 'Header Spaceship',
            //     url: '/vehicles/header-spaceship-variant-one',
            //     submenu: [
            //         { title: 'Variant One', url: '/vehicles/header-spaceship-variant-one' },
            //         { title: 'Variant Two', url: '/vehicles/header-spaceship-variant-two' },
            //         { title: 'Variant Three', url: '/vehicles/header-spaceship-variant-three' },
            //     ],
            // },
            // {
            //     title: 'Header Classic',
            //     url: '/vehicles/header-classic-variant-one',
            //     submenu: [
            //         { title: 'Variant One', url: '/vehicles/header-classic-variant-one' },
            //         { title: 'Variant Two', url: '/vehicles/header-classic-variant-two' },
            //         { title: 'Variant Three', url: '/vehicles/header-classic-variant-three' },
            //         { title: 'Variant Four', url: '/vehicles/header-classic-variant-four' },
            //         { title: 'Variant Five', url: '/vehicles/header-classic-variant-five' },
            //     ],
            // },
            // {
            //     title: 'Mobile Header',
            //     url: '/vehicles/mobile-header-variant-one',
            //     submenu: [
            //         { title: 'Variant One', url: '/vehicles/mobile-header-variant-one' },
            //         { title: 'Variant Two', url: '/vehicles/mobile-header-variant-two' },
            //     ],
            // },
        ],
    },
    {
        title: 'Shop',
        url: '/vehicles/shop/shop-grid-4-sidebar',
        submenu: [
            {
                title: 'Category',
                url: '/vehicles/shop/category-columns-4-sidebar',
                submenu: [
                    { title: '3 Columns Sidebar', url: '/vehicles/shop/category-columns-3-sidebar' },
                    { title: '4 Columns Sidebar', url: '/vehicles/shop/category-columns-4-sidebar' },
                    { title: '5 Columns Sidebar', url: '/vehicles/shop/category-columns-5-sidebar' },
                    { title: '4 Columns Full', url: '/vehicles/shop/category-columns-4-full' },
                    { title: '5 Columns Full', url: '/vehicles/shop/category-columns-5-full' },
                    { title: '6 Columns Full', url: '/vehicles/shop/category-columns-6-full' },
                    { title: '7 Columns Full', url: '/vehicles/shop/category-columns-7-full' },
                    { title: 'Right Sidebar', url: '/vehicles/shop/category-right-sidebar' },
                ],
            },
            {
                title: 'Shop Grid',
                url: '/vehicles/shop/shop-grid-4-sidebar',
                submenu: [
                    { title: '6 Columns Full', url: '/vehicles/shop/shop-grid-6-full' },
                    { title: '5 Columns Full', url: '/vehicles/shop/shop-grid-5-full' },
                    { title: '4 Columns Full', url: '/vehicles/shop/shop-grid-4-full' },
                    { title: '4 Columns Sidebar', url: '/vehicles/shop/shop-grid-4-sidebar' },
                    { title: '3 Columns Sidebar', url: '/vehicles/shop/shop-grid-3-sidebar' },
                ],
            },
            { title: 'Shop List', url: '/vehicles/shop/shop-list' },
            { title: 'Shop Table', url: '/vehicles/shop/shop-table' },
            { title: 'Shop Right Sidebar', url: '/vehicles/shop/shop-right-sidebar' },
            {
                title: 'Shop Navigation',
                url: '/vehicles/shop/shop-cursor-navigation',
                submenu: [
                    { title: 'Cursor-Based', url: '/vehicles/shop/shop-cursor-navigation' },
                    { title: 'Index-Based', url: '/vehicles/shop/shop-page-navigation' },
                ],
            },
            {
                title: 'Product',
                url: '/vehicles/shop/product-full',
                submenu: [
                    { title: 'Full Width', url: '/vehicles/shop/product-full' },
                    { title: 'Left Sidebar', url: '/vehicles/shop/product-sidebar' },
                ],
            },
            { title: 'Cart', url: '/cart' },
            { title: 'Checkout', url: '/cart/checkout' },
            { title: 'Order Success', url: '/vehicles/shop/order-success' },
            { title: 'Wishlist', url: '/wishlist' },
            { title: 'Compare', url: '/compare' },
            { title: 'Track Order', url: '/track-order' },
        ],
    },
    { title: 'About Us', url: '/about-us' },
    { title: 'FAQ', url: '/faq' },
    // {
    //     title: 'Blog',
    //     url: '/vehicles/blog/classic-right-sidebar',
    //     submenu: [
    //         {
    //             title: 'Blog Classic',
    //             url: '/vehicles/blog/classic-right-sidebar',
    //             submenu: [
    //                 { title: 'Left Sidebar', url: '/vehicles/blog/classic-left-sidebar' },
    //                 { title: 'Right Sidebar', url: '/vehicles/blog/classic-right-sidebar' },
    //             ],
    //         },
    //         {
    //             title: 'Blog List',
    //             url: '/vehicles/blog/list-right-sidebar',
    //             submenu: [
    //                 { title: 'Left Sidebar', url: '/vehicles/blog/list-left-sidebar' },
    //                 { title: 'Right Sidebar', url: '/vehicles/blog/list-right-sidebar' },
    //             ],
    //         },
    //         {
    //             title: 'Blog Grid',
    //             url: '/vehicles/blog/grid-right-sidebar',
    //             submenu: [
    //                 { title: 'Left Sidebar', url: '/vehicles/blog/grid-left-sidebar' },
    //                 { title: 'Right Sidebar', url: '/vehicles/blog/grid-right-sidebar' },
    //             ],
    //         },
    //         {
    //             title: 'Post Index',
    //             url: '/vehicles/blog/post-full-width',
    //             submenu: [
    //                 { title: 'Full Width', url: '/vehicles/blog/post-full-width' },
    //                 { title: 'Left Sidebar', url: '/vehicles/blog/post-left-sidebar' },
    //                 { title: 'Right Sidebar', url: '/vehicles/blog/post-right-sidebar' },
    //             ],
    //         },
    //         { title: 'Post Without Image', url: '/vehicles/blog/post-without-image' },
    //     ],
    // },
    // {
    //     title: 'Account',
    //     url: '/account/dashboard',
    //     submenu: [
    //         { title: 'Login & Register', url: '/account/login' },
    //         { title: 'Dashboard', url: '/account/dashboard' },
    //         { title: 'Garage', url: '/account/garage' },
    //         { title: 'Edit Profile', url: '/account/profile' },
    //         { title: 'Order History', url: '/account/orders' },
    //         {
    //             title: 'Order Details',
    //             url: {
    //                 href: '/account/orders/[id]?id=1',
    //                 as: '/account/orders/1',
    //             },
    //         },
    //         { title: 'Address Book', url: '/account/addresses' },
    //         {
    //             title: 'Edit Address',
    //             url: {
    //                 href: '/account/addresses/[id]?id=new',
    //                 as: '/account/addresses/new',
    //             },
    //         },
    //         { title: 'Change Password', url: '/account/password' },
    //     ],
    // },

    // {
    //     title: 'Pages',
    //     url: '/about-us',
    //     submenu: [
    //         { title: 'About Us', url: '/about-us' },
    //         { title: 'Contact Us v1', url: '/vehicles/site/contact-us-v1' },
    //         { title: 'Contact Us v2', url: '/vehicles/site/contact-us-v2' },
    //         { title: '404', url: '/vehicles/site/not-found' },
    //         { title: 'Terms And Conditions', url: '/terms' },
    //         { title: 'FAQ', url: '/faq' },
    //         { title: 'Components', url: '/vehicles/site/components' },
    //         { title: 'Typography', url: '/vehicles/site/typography' },
    //     ],
    // },
    // {
    //     title: 'TRAPIDE INC',
    //     url: 'https://trapide.com',
    //     customFields: {
    //         anchorProps: {
    //             target: '_blank',
    //         },
    //         highlight: true,
    //     },
    // },
];

export default dataMobileMenuLinks;
