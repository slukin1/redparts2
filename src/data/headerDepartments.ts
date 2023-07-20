// application
import { IDepartmentsLink } from '~/interfaces/departments-link';

const dataHeaderDepartments: IDepartmentsLink[] = [
    {
        title: 'All Cars',
        url: '/catalog/products',
        submenu: {
            type: 'megamenu',
            size: 'md',
            image: '/images/departments/departments-3.jpg',
            columns: [
                {
                    size: 4,
                    links: [
                        {
                            title: 'Body Type',
                            url: '/catalog/products',
                            links: [

                                { title: 'Coupe', url: '/catalog/products?filter_bodyType=Coupe' },
                                { title: 'Crocan SUV', url: '/catalog/products?filter_bodyType=Crocan_SUV' },
                                { title: 'Hatchback', url: '/catalog/products?filter_bodyType=Hatchback' },
                                { title: 'Minivan', url: '/catalog/products?filter_bodyType=Minivan' },
                                { title: 'Open', url: '/catalog/products?filter_bodyType=Open' },
                                { title: 'Pick-up truck', url: '/catalog/products?filter_bodyType=Pick-up_truck' },
                                { title: 'Sedan', url: '/catalog/products?filter_bodyType=Sedan' },
                                { title: 'Station Wagon', url: '/catalog/products?filter_bodyType=Station_Wagon' },
                                { title: 'Truck', url: '/catalog/products?filter_bodyType=Truck' },
                            ],
                        },
                        {
                            title: 'Manufacture Year',
                            url: '/catalog/products',
                            links: [
                                { title: '1994 and newer', url: '/catalog/products?filter_year=1990-1994' },
                                { title: '2004 and newer', url: `/catalog/products?filter_year=2004-${new Date().getFullYear()}` },
                                { title: '2007 and newer', url: `/catalog/products?filter_year=2007-${new Date().getFullYear()}` },
                                { title: '2010 and newer', url: `/catalog/products?filter_year=2010-${new Date().getFullYear()}` },
                                { title: '2015 and newer', url: `/catalog/products?filter_year=2015-${new Date().getFullYear()}` },
                                { title: '2020 and newer', url: `/catalog/products?filter_year=2020-${new Date().getFullYear()}` },
                            ],
                        },
                    ],
                },
                {
                    size: 4,
                    links: [
                        {
                            title: 'Make',
                            url: '/catalog/products',
                            links: [
                                { title: 'TOYOTA', url: '/catalog/products?filter_maker=TOYOTA' },
                                { title: 'NISSAN', url: '/catalog/products?filter_maker=NISSAN' },
                                { title: 'HONDA', url: '/catalog/products?filter_maker=HONDA' },
                                { title: 'MITSUBISHI', url: '/catalog/products?filter_maker=MITSUBISHI' },
                                { title: 'MAZDA', url: '/catalog/products?filter_maker=MAZDA' },
                                { title: 'SUZUKI', url: '/catalog/products?filter_maker=SUZUKI' },
                                { title: 'DAIHATSU', url: '/catalog/products?filter_maker=DAIHATSU' },
                                { title: 'AUDI', url: '/catalog/products?filter_maker=AUDI' },
                                { title: 'BMW', url: '/catalog/products?filter_maker=BMW' },
                                { title: 'CHEVROLET', url: '/catalog/products?filter_maker=CHEVROLET' },
                                { title: 'FORD', url: '/catalog/products?filter_maker=FORD' },
                                { title: 'LEXUS', url: '/catalog/products?filter_maker=LEXUS' },
                                { title: 'PORSCHE', url: '/catalog/products?filter_maker=PORSCHE' },
                                { title: 'RENAULT', url: '/catalog/products?filter_maker=RENAULT' },
                                { title: 'SUBARU', url: '/catalog/products?filter_maker=SUBARU' },
                                { title: 'VOLKSWAGEN', url: '/catalog/products?filter_maker=VOLKSWAGEN' },
                                { title: 'VOLVO', url: '/catalog/products?filter_maker=VOLVO' },
                            ],
                        },
                    ],
                },
                {
                    size: 4,
                    links: [
                        {
                            title: 'Price List',
                            url: '/catalog/products',
                            links: [
                                { title: 'under $1,000', url: '/catalog/products?filter_price=0-129870' },
                                { title: '$1,000 ~ $2,000', url: `/catalog/products?filter_price=${129870}-${2 * 129870}` },
                                { title: '$2,000 ~ $3,000', url: `/catalog/products?filter_price=${2 * 129870}-${3 * 129870}` },
                                { title: '$3,000 ~ $4,000', url: `/catalog/products?filter_price=${3 * 129870}-${4 * 129870}` },
                                { title: '$4,000 ~ $5,000', url: `/catalog/products?filter_price=${4 * 129870}-${5 * 129870 + 1}` },
                                { title: '$5,000 ~ $6,000', url: `/catalog/products?filter_price=${5 * 129870 + 1}-${6 * 129870 + 1}` },
                                { title: 'Over $6,000', url: `/catalog/products?filter_price=${6 * 129870 + 1}-40000000` },

                            ],
                        },
                    ],
                },
            ],
        },
    },
    // { title: 'Shop by Body Type', url: '/vehicles/shop/shop-grid-5-full' },
    // { title: 'Shop by Make', url: '/vehicles/shop/shop-grid-4-full' },
    // { title: 'Shop by Year', url: '/vehicles/shop/shop-grid-4-sidebar' },
    // { title: 'Shop by Price', url: '/vehicles/shop/shop-grid-3-sidebar' },
    // { title: 'Clutches', url: '/catalog/products' },
    // { title: 'Fuel Systems', url: '/catalog/products' },
    // { title: 'Steering', url: '/catalog/products' },
    // { title: 'Suspension', url: '/catalog/products' },
    // { title: 'Body Parts', url: '/catalog/products' },
    // { title: 'Transmission', url: '/catalog/products' },
    // { title: 'Air Filters', url: '/catalog/products' },
    // {
    //     title: 'Headlights & Lighting',
    //     url: '/catalog/products',
    //     submenu: {
    //         type: 'megamenu',
    //         size: 'xl',
    //         image: '/images/departments/departments-2.jpg',
    //         columns: [
    //             {
    //                 size: '1of5',
    //                 links: [
    //                     {
    //                         title: 'Body Parts',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Bumpers', url: '/catalog/products' },
    //                             { title: 'Hoods', url: '/catalog/products' },
    //                             { title: 'Grilles', url: '/catalog/products' },
    //                             { title: 'Fog Lights', url: '/catalog/products' },
    //                             { title: 'Door Handles', url: '/catalog/products' },
    //                             { title: 'Car Covers', url: '/catalog/products' },
    //                             { title: 'Tailgates', url: '/catalog/products' },
    //                         ],
    //                     },
    //                     { title: 'Suspension', url: '/catalog/products' },
    //                     { title: 'Steering', url: '/catalog/products' },
    //                     { title: 'Fuel Systems', url: '/catalog/products' },
    //                     { title: 'Transmission', url: '/catalog/products' },
    //                     { title: 'Air Filters', url: '/catalog/products' },
    //                 ],
    //             },
    //             {
    //                 size: '1of5',
    //                 links: [
    //                     {
    //                         title: 'Headlights & Lighting',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Headlights', url: '/catalog/products' },
    //                             { title: 'Tail Lights', url: '/catalog/products' },
    //                             { title: 'Fog Lights', url: '/catalog/products' },
    //                             { title: 'Turn Signals', url: '/catalog/products' },
    //                             { title: 'Switches & Relays', url: '/catalog/products' },
    //                             { title: 'Corner Lights', url: '/catalog/products' },
    //                         ],
    //                     },
    //                     {
    //                         title: 'Brakes & Suspension',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Brake Discs', url: '/catalog/products' },
    //                             { title: 'Wheel Hubs', url: '/catalog/products' },
    //                             { title: 'Air Suspension', url: '/catalog/products' },
    //                             { title: 'Ball Joints', url: '/catalog/products' },
    //                             { title: 'Brake Pad Sets', url: '/catalog/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 size: '1of5',
    //                 links: [
    //                     {
    //                         title: 'Interior Parts',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Floor Mats', url: '/catalog/products' },
    //                             { title: 'Gauges', url: '/catalog/products' },
    //                             { title: 'Consoles & Organizers', url: '/catalog/products' },
    //                             { title: 'Mobile Electronics', url: '/catalog/products' },
    //                             { title: 'Steering Wheels', url: '/catalog/products' },
    //                             { title: 'Cargo Accessories', url: '/catalog/products' },
    //                         ],
    //                     },
    //                     {
    //                         title: 'Engine & Drivetrain',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Air Filters', url: '/catalog/products' },
    //                             { title: 'Oxygen Sensors', url: '/catalog/products' },
    //                             { title: 'Heating', url: '/catalog/products' },
    //                             { title: 'Exhaust', url: '/catalog/products' },
    //                             { title: 'Cranks & Pistons', url: '/catalog/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 size: '1of5',
    //                 links: [
    //                     {
    //                         title: 'Tools & Garage',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Repair Manuals', url: '/catalog/products' },
    //                             { title: 'Car Care', url: '/catalog/products' },
    //                             { title: 'Code Readers', url: '/catalog/products' },
    //                             { title: 'Tool Boxes', url: '/catalog/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },
    // {
    //     title: 'Interior Parts',
    //     url: '/catalog/products',
    //     submenu: {
    //         type: 'megamenu',
    //         size: 'lg',
    //         image: '/images/departments/departments-1.jpg',
    //         columns: [
    //             {
    //                 size: 3,
    //                 links: [
    //                     {
    //                         title: 'Body Parts',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Bumpers', url: '/catalog/products' },
    //                             { title: 'Hoods', url: '/catalog/products' },
    //                             { title: 'Grilles', url: '/catalog/products' },
    //                             { title: 'Fog Lights', url: '/catalog/products' },
    //                             { title: 'Door Handles', url: '/catalog/products' },
    //                             { title: 'Car Covers', url: '/catalog/products' },
    //                             { title: 'Tailgates', url: '/catalog/products' },
    //                         ],
    //                     },
    //                     { title: 'Suspension', url: '/catalog/products' },
    //                     { title: 'Steering', url: '/catalog/products' },
    //                     { title: 'Fuel Systems', url: '/catalog/products' },
    //                     { title: 'Transmission', url: '/catalog/products' },
    //                     { title: 'Air Filters', url: '/catalog/products' },
    //                 ],
    //             },
    //             {
    //                 size: 3,
    //                 links: [
    //                     {
    //                         title: 'Headlights & Lighting',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Headlights', url: '/catalog/products' },
    //                             { title: 'Tail Lights', url: '/catalog/products' },
    //                             { title: 'Fog Lights', url: '/catalog/products' },
    //                             { title: 'Turn Signals', url: '/catalog/products' },
    //                             { title: 'Switches & Relays', url: '/catalog/products' },
    //                             { title: 'Corner Lights', url: '/catalog/products' },
    //                         ],
    //                     },
    //                     {
    //                         title: 'Brakes & Suspension',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Brake Discs', url: '/catalog/products' },
    //                             { title: 'Wheel Hubs', url: '/catalog/products' },
    //                             { title: 'Air Suspension', url: '/catalog/products' },
    //                             { title: 'Ball Joints', url: '/catalog/products' },
    //                             { title: 'Brake Pad Sets', url: '/catalog/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 size: 3,
    //                 links: [
    //                     {
    //                         title: 'Interior Parts',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Floor Mats', url: '/catalog/products' },
    //                             { title: 'Gauges', url: '/catalog/products' },
    //                             { title: 'Consoles & Organizers', url: '/catalog/products' },
    //                             { title: 'Mobile Electronics', url: '/catalog/products' },
    //                             { title: 'Steering Wheels', url: '/catalog/products' },
    //                             { title: 'Cargo Accessories', url: '/catalog/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 size: 3,
    //                 links: [
    //                     {
    //                         title: 'Tools & Garage',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Repair Manuals', url: '/catalog/products' },
    //                             { title: 'Car Care', url: '/catalog/products' },
    //                             { title: 'Code Readers', url: '/catalog/products' },
    //                             { title: 'Tool Boxes', url: '/catalog/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },

    // {
    //     title: 'Tires & Wheels',
    //     url: '/catalog/products',
    //     submenu: {
    //         type: 'megamenu',
    //         size: 'nl',
    //         image: '/images/departments/departments-4.jpg',
    //         columns: [
    //             {
    //                 size: 6,
    //                 links: [
    //                     {
    //                         title: 'Body Parts',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Bumpers', url: '/catalog/products' },
    //                             { title: 'Hoods', url: '/catalog/products' },
    //                             { title: 'Grilles', url: '/catalog/products' },
    //                             { title: 'Fog Lights', url: '/catalog/products' },
    //                             { title: 'Door Handles', url: '/catalog/products' },
    //                             { title: 'Car Covers', url: '/catalog/products' },
    //                             { title: 'Tailgates', url: '/catalog/products' },
    //                         ],
    //                     },
    //                     { title: 'Suspension', url: '/catalog/products' },
    //                     { title: 'Steering', url: '/catalog/products' },
    //                     { title: 'Fuel Systems', url: '/catalog/products' },
    //                     { title: 'Transmission', url: '/catalog/products' },
    //                     { title: 'Air Filters', url: '/catalog/products' },
    //                 ],
    //             },
    //             {
    //                 size: 6,
    //                 links: [
    //                     {
    //                         title: 'Headlights & Lighting',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Headlights', url: '/catalog/products' },
    //                             { title: 'Tail Lights', url: '/catalog/products' },
    //                             { title: 'Fog Lights', url: '/catalog/products' },
    //                             { title: 'Turn Signals', url: '/catalog/products' },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },
    // {
    //     title: 'Tools & Garage',
    //     url: '/catalog/products',
    //     submenu: {
    //         type: 'megamenu',
    //         size: 'sm',
    //         columns: [
    //             {
    //                 size: 12,
    //                 links: [
    //                     {
    //                         title: 'Body Parts',
    //                         url: '/catalog/products',
    //                         links: [
    //                             { title: 'Bumpers', url: '/catalog/products' },
    //                             { title: 'Hoods', url: '/catalog/products' },
    //                             { title: 'Grilles', url: '/catalog/products' },
    //                             { title: 'Fog Lights', url: '/catalog/products' },
    //                             { title: 'Door Handles', url: '/catalog/products' },
    //                             { title: 'Car Covers', url: '/catalog/products' },
    //                             { title: 'Tailgates', url: '/catalog/products' },
    //                         ],
    //                     },
    //                     { title: 'Suspension', url: '/catalog/products' },
    //                     { title: 'Steering', url: '/catalog/products' },
    //                     { title: 'Fuel Systems', url: '/catalog/products' },
    //                     { title: 'Transmission', url: '/catalog/products' },
    //                     { title: 'Air Filters', url: '/catalog/products' },
    //                 ],
    //             },
    //         ],
    //     },
    // },

];

export default dataHeaderDepartments;
