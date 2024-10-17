import React, {useState} from 'react';
import {geoMercator, geoPath} from 'd3-geo';
import {Feature, FeatureCollection} from 'geojson';

interface MapComponentProps {
    geoData: FeatureCollection;
    onRegionClick?: (feature: Feature) => void;
}

const width = 800;
const height = 600;

const MapComponent: React.FC<MapComponentProps> = ({geoData, onRegionClick}) => {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

    if (!geoData || !geoData.features) {
        return <div>Loading...</div>;
    }

    const projection = geoMercator().fitSize([width, height], geoData);
    const pathGenerator = geoPath().projection(projection);

    const handleClick = (feature: Feature) => {
        const regionId = feature.id || feature.properties?.name || `region-${Math.random()}`;
        setSelectedRegion(regionId);
        if (onRegionClick) {
            onRegionClick(feature);
        }
    };

    return (
        <svg width={width} height={height}>
            {geoData.features.map((feature, idx) => {
                const path = pathGenerator(feature);
                if (!path) {
                    return null;
                }

                const regionId = feature.id || feature.properties?.name || `region-${idx}`;

                let fillColor = 'steelblue';
                if (selectedRegion === regionId) {
                    fillColor = 'orange';
                } else if (hoveredRegion === regionId) {
                    fillColor = 'lightblue';
                }

                return (
                    <path
                        key={idx}
                        d={path}
                        fill={fillColor}
                        stroke="white"
                        onClick={() => handleClick(feature)}
                        onMouseEnter={() => setHoveredRegion(regionId)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        style={{cursor: onRegionClick ? 'pointer' : 'default'}}
                    />
                );
            })}
        </svg>
    );
};

export default MapComponent;