import React, {useEffect, useState} from "react";
import GliderMap from "../components/GliderMap";

// Model logic 
import AlertInfo from './../statics/Alert';

// Api sevice 
import Api from './../services/Api';

// Custom Component 
import Alerts from '../components/Alert';
// For destination and stops 
import MapTable from "../components/MapTable";

export default function Question3 (props) {
  //Displaying real-time metrics for our devices' locations and statuses is a critical component of our reporting strategy.
  // This allows us to provide accurate, live data to our clients.
  //
  // Using Translink's JourneyPlanner API, implement an MVP in React for a real-time reporting dashboard.
  // What exactly this consists of is up to you, but preferably it will include:
  // - A map component (or a *very* pretty table, lol)
  // - A way to locate/inspect stops
  // - A way to track buses
  // - Information about the routes available
  //
  // As Translink's JourneyPlanner API is supposedly quite complex and undocumented (surprise surprise!) you may find this package useful:
  // https://github.com/McPo/belfast-glider-api-server
  //
  // This file contains the map component and two endpoints to obtain Stop data.


  const [stops, setStops] = useState([]);
  const [errorStop, setErrorStop] = useState([]);
  const [errorSubInfo, setErrorSubInfo] = useState([]);
  const [stopInfo,setStopInfo] =useState(null);
  const [alert, setAlert] = useState(AlertInfo);

  useEffect(() => {
    fetchStops();
  }, [])

  // fetch stops list and show in map 
  const fetchStops = () => {
    new Api().Stops(setStops, setErrorStop, setAlert);
  }

  // fetch stop info by Id
  const fetchStopInfo = (stop) => {
    new Api().StopInfo(stop, setStopInfo, setErrorSubInfo, setAlert);
  }

  // Alert Ok 
  const onConfirm = () => {
    setAlert({loading: false});
  }

  return (
    <div>
       {/* Loading and alert  */}
       <Alerts message={alert.message} alert={alert.loading} type={alert.type} onConfirm={onConfirm}/>
      {/* error if API don't work  */}
      {errorStop && (
        <p variant='warning'>
          {errorStop}
        </p>
      )}

      {/* Showing details of stops and destination  */}
      <MapTable
        stopInfo={stopInfo}
        error={errorSubInfo}
      />

      {/* Google map show all stops if you click on stop it will popup details of that stop and destination  */}
      <GliderMap
        stops={stops}
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkHRuOEvL8BERtTR0oIB-mw8e0QkMVA2U&v=3.exp&libraries=geometry,drawing,places'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `800px`, margin: 20 }} />}
        mapElement={<div style={{ height: `100%` }} />}
        fetchStopInfo={fetchStopInfo}
      />
    </div>
  );
}
