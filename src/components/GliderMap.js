import React, { } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';

const BELFAST_DEFAULT_LOCATION = {
  lat: 54.59728,
  lng: -5.92139
}

const GliderMap = withScriptjs(withGoogleMap((props) => {
  // console.log( props.stops)
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={BELFAST_DEFAULT_LOCATION}
    >
     {props.stops.map((info, index) => (
        <Marker key={index}
          position={{lat: info.lat,lng: info.lng }}
          label={info.name}
          onClick={()=>props.fetchStopInfo(info)}
        />
     ))}
     
    </GoogleMap>
  )
}))

export default GliderMap;
