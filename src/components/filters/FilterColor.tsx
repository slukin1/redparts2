import React, { useState } from 'react';
import classNames from 'classnames';
import { ArrowRoundedDown9x6Svg, Check12x9Svg } from '~/svg';
import { colorType } from '~/api/services/color';
import { IColorFilter, IColorFilterValue } from '~/interfaces/filter';

interface Props {
    options: IColorFilter;
    value: IColorFilterValue;
    onChangeValue?: (event: { filter: IColorFilter; value: IColorFilterValue }) => void;
}

function FilterColor(props: Props) {
    const { options, value, onChangeValue } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const updateValue = (newValue: IColorFilterValue) => {
        if (onChangeValue) {
            onChangeValue({ filter: options, value: newValue });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            updateValue([event.target.value]);
        }
    };

    const displayedItems = isExpanded ? options.items : options.items.slice(0, 14);

    const handleShowMore = () => {
        setIsExpanded(true);
    };

    const handleShowLess = () => {
        setIsExpanded(false);
    };

    return (
        <div className="filter-color">
            <div className="filter-color__list">
                {displayedItems.map((item) => (
                    <div key={item.slug} className="filter-color__item">
                        <span
                            className={classNames('filter-color__check', 'input-check-color', {
                                'input-check-color--white': colorType(item.color) === 'white',
                                'input-check-color--light': colorType(item.color) === 'light',
                            })}
                            style={{ color: item.color }}
                        >
                            <label className="input-check-color__body">
                                <input
                                    className="input-check-color__input"
                                    type="radio"
                                    name="colorOption"
                                    value={item.slug}
                                    checked={value.includes(item.slug)}
                                    disabled={item.count === 0}
                                    onChange={handleChange}
                                />
                                <span className="input-check-color__box" />
                                <span className="input-check-color__icon">
                                    <Check12x9Svg />
                                </span>
                                <span className="input-check-color__stick" />
                            </label>
                        </span>
                    </div>
                ))}
            </div>
            {options.items.length > 14 && (
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

export default FilterColor;
