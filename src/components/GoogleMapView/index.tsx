import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Button } from '../../elements';
import LoadingSpinner from '../Loader';

type LatLngLiteral = google.maps.LatLngLiteral;

const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "500px",
};

const defaultCenter: LatLngLiteral = {
    lat: 34.7836,
    lng: -82.3168
};

const GoogleMapView: React.FC = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(15);

    const places = useMemo(
        () => [
            {
                id: "office",
                label: "Grandview Office",
                position: defaultCenter,
                zoom: 20,
            },
        ],
        []
    );

    const handlePlaceClick = (place: any) => {
        setCenter(place.position);
        setZoom(place.zoom);
    };

    if (loadError) return <p className="text-red-500">Map failed to load.</p>;
    if (!isLoaded) return <LoadingSpinner />

    return (
        <div className="w-full space-y-4 bg-white shadow-[0_4px_4px_rgba(0,0,0,0.16)] p-8">
            <div className="flex gap-2">
                {places.map((place) => (
                    <Button
                        key={place.id}
                        onClick={() => handlePlaceClick(place)}
                        className="px-3 py-1 cursor-pointer rounded-none bg-ib-1 text-white hover:bg-ib-1/70"
                    >
                        {place.label}
                    </Button>
                ))}
            </div>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
            >
                {places.map((place) => (
                    <Marker
                        key={place.id}
                        position={place.position}
                        onClick={() => handlePlaceClick(place)}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapView;
