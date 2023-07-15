// react
import React, { useState } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
// application
import Decor from '~/components/shared/Decor';
import url from '~/api/services/url';
import VehicleSelect from '~/components/shared/VehicleSelect';
import { baseUrl } from '~/api/services/utils';
import { hrefToRouterArgs } from '~/api/services/router';
import { IVehicle } from '~/interfaces/vehicle';

function BlockFinder() {
    const router = useRouter();
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // @ts-ignore
        const query: any = JSON.parse(localStorage.getItem('query'));
        localStorage.removeItem('query');
        if (!vehicle) {
            return;
        }
        let color = vehicle.toString();
        color = color.includes(' ') ? color.split(' ').join('_') : color;

        router.push(
            ...hrefToRouterArgs(url.products({
                filters: {
                    filter_year: `${query.yearFrom}-${query.yearTo}`,
                    filter_maker: query.make,
                    filter_model: query.model,
                    filter_engineType: query.engineType,
                    filter_price: `${query.priceFrom}-${query.priceTo}`,
                    filter_mileage: query.mileage,
                    filter_transmission: query.transmission,
                    filter_fuel: query.fuel,
                    filter_bodyType: query.bodyType,
                    filter_color: color,
                },
            })),
        ).then();
    };

    return (
        <div className="block block-finder">
            <Decor className="block-finder__decor" type="bottom" />
            <div
                className="block-finder__image"
                style={{ backgroundImage: `url(${baseUrl('/images/finder.jpg')})` }}
            />
            <div className="block-finder__body container container--max--xl">
                <div className="block-finder__title">
                    <FormattedMessage id="TEXT_BLOCK_FINDER_TITLE" />
                </div>
                <div className="block-finder__subtitle">
                    <FormattedMessage id="TEXT_BLOCK_FINDER_SUBTITLE" />
                </div>
                <form className="block-finder__form" onSubmit={onSubmit}>
                    <VehicleSelect className="block-finder__select" onVehicleChange={setVehicle} />

                    <button className="block-finder__button" type="submit">
                        <FormattedMessage id="BUTTON_BLOCK_FINDER_SEARCH" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default React.memo(BlockFinder);
