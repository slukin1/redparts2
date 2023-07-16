import React, { useState } from 'react';
import RadioButton from '~/components/shared/RadioButton';
import { ArrowRoundedDown9x6Svg } from '~/svg';
import { IRadioFilter, IRadioFilterValue } from '~/interfaces/filter';

interface Props {
    options: IRadioFilter;
    value: IRadioFilterValue;
    onChangeValue?: (event: { filter: IRadioFilter; value: IRadioFilterValue }) => void;
}

function FilterRadio(props: Props) {
    const { options, value, onChangeValue } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const updateValue = (newValue: IRadioFilterValue) => {
        if (onChangeValue) {
            onChangeValue({ filter: options, value: newValue });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked && event.target.value !== value) {
            updateValue(event.target.value);
        }
    };

    const handleShowMore = () => {
        setIsExpanded(true);
    };

    const handleShowLess = () => {
        setIsExpanded(false);
    };

    const displayedItems = isExpanded ? options.items : options.items.slice(0, 10);

    return (
        <div className="filter-list">
            <div className="filter-list__list">
                {displayedItems.map((item) => (
                    <label key={item.slug} className="filter-list__item">
                        <RadioButton
                            className="filter-list__input"
                            name={options.slug}
                            value={item.slug}
                            checked={value === item.slug}
                            disabled={item.count === 0}
                            onChange={handleChange}
                        />
                        <span className="filter-list__title">{item.name}</span>
                        {item.count !== 1 && (
                            <span className="filter-list__counter">{item.count}</span>
                        )}
                    </label>
                ))}
            </div>
            {options.items.length > 10 && (
                <button
                    className="bg-white text-black-50 font-weight-bold px-0 py-3 w-100 d-flex justify-content-between align-items-center btn-sm"
                    type="button"
                    onClick={isExpanded ? handleShowLess : handleShowMore}
                    style={{
                        padding: '0',
                        border: 'none',
                        cursor: 'pointer',
                        outline: 'none',
                    }}
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                    {isExpanded ? (
                        <ArrowRoundedDown9x6Svg style={{ transform: 'rotate(180deg)' }} />
                    ) : (
                        <ArrowRoundedDown9x6Svg />
                    )}
                </button>
            )}
        </div>
    );
}

export default FilterRadio;
