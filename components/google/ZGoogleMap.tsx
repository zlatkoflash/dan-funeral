"use client";

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function ZGoogleMap() {

  const position = { lat: 41.1126, lng: 20.8001 };

  return <div className="z-google-map">

    <div style={{ height: '400px', width: '100%' }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <Map
          defaultCenter={position}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          <Marker position={position} />
        </Map>
      </APIProvider>
    </div>

  </div>
}