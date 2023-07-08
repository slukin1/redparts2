// react
import React from 'react';

function BlockMap() {
    return (
        <div className="block block-map">
            <div className="block-map__body">
                <iframe
                    title="Google Map"
                    src="https://maps.google.com/maps?q=2780-289+Takumachō+Matsusaki,+Mitoyo,+Kagawa+769-1102&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                />
            </div>
        </div>
    );
}

export default BlockMap;
