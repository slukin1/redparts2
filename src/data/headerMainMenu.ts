// application
import { IMainMenuLink } from '~/interfaces/main-menu-link';

const dataHeaderMainMenu: IMainMenuLink[] = [
    {
        title: 'Stock List',
        url: '/',
        submenu: {
            type: 'menu',
            links: [
                { title: 'Jacokin Stock', url: '/' },
                { title: 'Popular Categories', url: '/vehicles/home-two' },
                // {
                //     title: 'Header Spaceship',
                //     url: '/vehicles/header-spaceship-variant-one',
                //     links: [
                //         { title: 'Variant One', url: '/vehicles/header-spaceship-variant-one' },
                //         { title: 'Variant Two', url: '/vehicles/header-spaceship-variant-two' },
                //         { title: 'Variant Three', url: '/vehicles/header-spaceship-variant-three' },
                //     ],
                // },
                // {
                //     title: 'Header Classic',
                //     url: '/vehicles/header-classic-variant-one',
                //     links: [
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
                //     links: [
                //         { title: 'Variant One', url: '/vehicles/mobile-header-variant-one' },
                //         { title: 'Variant Two', url: '/vehicles/mobile-header-variant-two' },
                //     ],
                // },
            ],
        },
    },
    {
        title: 'Browse Stock',
        url: '/catalog/products',
        submenu: {
            type: 'megamenu',
            size: 'nl',
            columns: [
                {
                    size: 6,
                    links: [
                        {
                            title: 'Headlights & Lighting',
                            url: '/catalog/products',
                            // links: [
                            //     { title: 'Headlights', url: '/catalog/products' },
                            //     { title: 'Tail Lights', url: '/catalog/products' },
                            //     { title: 'Fog Lights', url: '/catalog/products' },
                            //     { title: 'Turn Signals', url: '/catalog/products' },
                            //     { title: 'Switches & Relays', url: '/catalog/products' },
                            //     { title: 'Corner Lights', url: '/catalog/products' },
                            // ],
                        },
                        {
                            title: 'Brakes & Suspension',
                            url: '/catalog/products',
                            // links: [
                            //     { title: 'Brake Discs', url: '/catalog/products' },
                            //     { title: 'Wheel Hubs', url: '/catalog/products' },
                            //     { title: 'Air Suspension', url: '/catalog/products' },
                            //     { title: 'Ball Joints', url: '/catalog/products' },
                            // ],
                        },
                    ],
                },
                {
                    size: 6,
                    links: [
                        {
                            title: 'Interior Parts',
                            url: '/catalog/products',
                            // links: [
                            //     { title: 'Floor Mats', url: '/catalog/products' },
                            //     { title: 'Gauges', url: '/catalog/products' },
                            //     { title: 'Consoles & Organizers', url: '/catalog/products' },
                            //     { title: 'Mobile Electronics', url: '/catalog/products' },
                            // ],
                        },
                        {
                            title: 'Engine & Drivetrain',
                            url: '/catalog/products',
                            // links: [
                            //     { title: 'Air Filters', url: '/catalog/products' },
                            //     { title: 'Oxygen Sensors', url: '/catalog/products' },
                            //     { title: 'Heating', url: '/catalog/products' },
                            //     { title: 'Exhaust', url: '/catalog/products' },
                            //     { title: 'Cranks & Pistons', url: '/catalog/products' },
                            //     { title: 'Cargo Accessories', url: '/catalog/products' },
                            // ],
                        },
                    ],
                },
            ],
        },
        customFields: {
            ignoreIn: ['spaceship'],
        },
    },
    { title: 'Shop List', url: '/vehicles/shop/shop-list' },
    // { title: '4 Columns Sidebar', url: '/vehicles/shop/shop-grid-4-sidebar' },
    { title: 'FAQ', url: '/faq' },
    {
        title: 'Pages',
        url: '/about-us',
        submenu: {
            type: 'menu',
            links: [
                { title: 'Components', url: '/vehicles/site/components' },
                { title: 'Typography', url: '/vehicles/site/typography' },
            ],
        },
    }
    // {
    //     title: 'Stock',
    //     url: '/vehicles/shop/shop-grid-4-sidebar',
    //     submenu: {
    //         type: 'menu',
    //         links: [
    //             {
    //                 title: 'Category',
    //                 url: '/vehicles/shop/category-columns-4-sidebar',
    //                 links: [
    //                     { title: '3 Columns Sidebar', url: '/vehicles/shop/category-columns-3-sidebar' },
    //                     { title: '4 Columns Sidebar', url: '/vehicles/shop/category-columns-4-sidebar' },
    //                     { title: '5 Columns Sidebar', url: '/vehicles/shop/category-columns-5-sidebar' },
    //                     { title: '4 Columns Full', url: '/vehicles/shop/category-columns-4-full' },
    //                     { title: '5 Columns Full', url: '/vehicles/shop/category-columns-5-full' },
    //                     { title: '6 Columns Full', url: '/vehicles/shop/category-columns-6-full' },
    //                     { title: '7 Columns Full', url: '/vehicles/shop/category-columns-7-full' },
    //                     { title: 'Right Sidebar', url: '/vehicles/shop/category-right-sidebar' },
    //                 ],
    //             },
    //             {
    //                 title: 'Shop Grid',
    //                 url: '/vehicles/shop/shop-grid-4-sidebar',
    //                 links: [
    //                     { title: '6 Columns Full', url: '/vehicles/shop/shop-grid-6-full' },
    //                     { title: '5 Columns Full', url: '/vehicles/shop/shop-grid-5-full' },
    //                     { title: '4 Columns Full', url: '/vehicles/shop/shop-grid-4-full' },
    //                     { title: '4 Columns Sidebar', url: '/vehicles/shop/shop-grid-4-sidebar' },
    //                     { title: '3 Columns Sidebar', url: '/vehicles/shop/shop-grid-3-sidebar' },
    //                 ],
    //             },
    //             { title: 'Shop List', url: '/vehicles/shop/shop-list' },
    //             { title: 'Shop Table', url: '/vehicles/shop/shop-table' },
    //             { title: 'Shop Right Sidebar', url: '/vehicles/shop/shop-right-sidebar' },
    //             {
    //                 title: 'Shop Navigation',
    //                 url: '/vehicles/shop/shop-cursor-navigation',
    //                 links: [
    //                     { title: 'Cursor-Based', url: '/vehicles/shop/shop-cursor-navigation' },
    //                     { title: 'Page-Based', url: '/vehicles/shop/shop-page-navigation' },
    //                 ],
    //             },
    //             {
    //                 title: 'Product',
    //                 url: '/vehicles/shop/product-full',
    //                 links: [
    //                     { title: 'Full Width', url: '/vehicles/shop/product-full' },
    //                     { title: 'Left Sidebar', url: '/vehicles/shop/product-sidebar' },
    //                 ],
    //             },
    //             { title: 'Cart', url: '/cart' },
    //             { title: 'Checkout', url: '/cart/checkout' },
    //             { title: 'Order Success', url: '/vehicles/shop/order-success' },
    //             { title: 'Wishlist', url: '/wishlist' },
    //             { title: 'Compare', url: '/compare' },
    //             { title: 'Track Order', url: '/track-order' },
    //         ],
    //     },
    // },
    // {
    //     title: 'Blog',
    //     url: '/vehicles/blog/classic-right-sidebar',
    //     submenu: {
    //         type: 'menu',
    //         links: [
    //             {
    //                 title: 'Blog Classic',
    //                 url: '/vehicles/blog/classic-right-sidebar',
    //                 links: [
    //                     { title: 'Left Sidebar', url: '/vehicles/blog/classic-left-sidebar' },
    //                     { title: 'Right Sidebar', url: '/vehicles/blog/classic-right-sidebar' },
    //                 ],
    //             },
    //             {
    //                 title: 'Blog List',
    //                 url: '/vehicles/blog/list-right-sidebar',
    //                 links: [
    //                     { title: 'Left Sidebar', url: '/vehicles/blog/list-left-sidebar' },
    //                     { title: 'Right Sidebar', url: '/vehicles/blog/list-right-sidebar' },
    //                 ],
    //             },
    //             {
    //                 title: 'Blog Grid',
    //                 url: '/vehicles/blog/grid-right-sidebar',
    //                 links: [
    //                     { title: 'Left Sidebar', url: '/vehicles/blog/grid-left-sidebar' },
    //                     { title: 'Right Sidebar', url: '/vehicles/blog/grid-right-sidebar' },
    //                 ],
    //             },
    //             {
    //                 title: 'Post Page',
    //                 url: '/vehicles/blog/post-full-width',
    //                 links: [
    //                     { title: 'Full Width', url: '/vehicles/blog/post-full-width' },
    //                     { title: 'Left Sidebar', url: '/vehicles/blog/post-left-sidebar' },
    //                     { title: 'Right Sidebar', url: '/vehicles/blog/post-right-sidebar' },
    //                 ],
    //             },
    //             { title: 'Post Without Image', url: '/vehicles/blog/post-without-image' },
    //         ],
    //     },
    // },
    // {
    //     title: 'Account',
    //     url: '/account/dashboard',
    //     submenu: {
    //         type: 'menu',
    //         links: [
    //             { title: 'Login & Register', url: '/account/login' },
    //             { title: 'Dashboard', url: '/account/dashboard' },
    //             { title: 'Garage', url: '/account/garage' },
    //             { title: 'Edit Profile', url: '/account/profile' },
    //             { title: 'Order History', url: '/account/orders' },
    //             {
    //                 title: 'Order Details',
    //                 url: {
    //                     href: '/account/orders/[id]?id=1',
    //                     as: '/account/orders/1',
    //                 },
    //             },
    //             { title: 'Address Book', url: '/account/addresses' },
    //             {
    //                 title: 'Edit Address',
    //                 url: {
    //                     href: '/account/addresses/[id]?id=new',
    //                     as: '/account/addresses/new',
    //                 },
    //             },
    //             { title: 'Change Password', url: '/account/password' },
    //         ],
    //     },
    // },

];

export default dataHeaderMainMenu;
