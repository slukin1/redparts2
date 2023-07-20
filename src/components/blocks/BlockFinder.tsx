// react
import React, { useState } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
// application
import { toast } from 'react-toastify';
import Decor from '~/components/shared/Decor';
import url from '~/api/services/url';
import VehicleSelect from '~/components/shared/VehicleSelect';
import { baseUrl } from '~/api/services/utils';
import { hrefToRouterArgs } from '~/api/services/router';
import { IVehicle } from '~/interfaces/vehicle';

function BlockFinder() {
    const router = useRouter();
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    const [loading, setLoading] = useState(false);
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (loading) {
            return;
        }
        const queryFromLocalStorage = JSON.parse(localStorage.getItem('query') || '{}');
        localStorage.removeItem('query');
        console.log('queryFromLocalStorage', queryFromLocalStorage);
        const {
            yearFrom,
            yearTo,
            make,
            model,
            engineType,
            priceFrom,
            priceTo,
            mileage,
            transmission,
            fuel,
            bodyType,
            vehicle,
        } = queryFromLocalStorage;
        if (!yearFrom || !yearTo || !make || !model) {
            toast.success('Please select the required fields, Make, Model, Year From and Year To', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                theme: 'colored',

            });
            return;
        }
        if (priceFrom && !priceTo) {
            toast.success('Please select the Price To field', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                theme: 'colored',
            });
            return;
        }
        setLoading(true);
        const color = vehicle ? vehicle.replace(/ /g, '_') : '';
        const filters = {
            ...(yearFrom && { filter_year: `${yearFrom}-${yearTo}` }),
            ...(make && { filter_maker: make }),
            ...(model && { filter_model: model }),
            ...(engineType && { filter_engineType: engineType }),
            ...(priceFrom && priceTo && { filter_price: `${priceFrom}-${priceTo}` }),
            ...(mileage && { filter_mileage: mileage }),
            ...(transmission && { filter_transmission: transmission }),
            ...(fuel && { filter_fuel: fuel }),
            ...(bodyType && { filter_bodyType: bodyType }),
            ...(color && { filter_color: color }),
        };
        router.push(...hrefToRouterArgs(url.products({ filters }))).then();
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
                <form className="block-finder__form">
                    <VehicleSelect className="block-finder__select" onVehicleChange={setVehicle} />
                    {loading ? (
                        <button className="btn-primary btn-lg btn btn-loading" type="submit" onClick={onSubmit}>
                            <FormattedMessage id="BUTTON_BLOCK_FINDER_SEARCH" />
                        </button>
                    ) : (
                        <button className="btn-primary btn-lg btn" type="submit" onClick={onSubmit}>
                            <FormattedMessage id="BUTTON_BLOCK_FINDER_SEARCH" />
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default React.memo(BlockFinder);
