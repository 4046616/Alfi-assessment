import Endpoints from '../util/Endpoints';

export default class Api {
    // constructor(){

    // }

    /*  
    For Question1, 
    Type post 
    Take 2 params 
    Capture on form data and post on server 
    */
    PostQuestion1(values, setAlert) {
        // show loading 
        setAlert({loading: true, message: 'Adding Record!', type:''});
        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            // Show Successfully added
            setAlert({loading: true, message: 'Added Successfully!', type:''});
        })
        .catch(error => {
            console.log(error);
            setAlert({loading: true, message: 'Please try again!', type:'warning'});
        })
    }


    /*  
    For Question3, 
    Type get 
    Take 4 params, stops info, 3 setter 
    */    
    StopInfo(stop, setStopInfo, setErrorSubInfo, setAlert) {
        // show loading 
        setAlert({loading: true, message: 'Loading Record!', type:''});
        fetch(Endpoints.STOP_INFO + '/' + stop.id)
          .then(res => res.json())
          .then(stopInfo => {
            setAlert({loading: false, message: '', type:''});
            if (stopInfo.status === 'ok') {
              setStopInfo(stopInfo);
            }
          })
          .catch(e => {
            console.log(e);
            setErrorSubInfo('Please try again!');
            setAlert({loading: true, message: 'Please try again!', type:'warning'});
        })
    }

    /*  
    For Question3, 
    Type get 
    Take 3 params, 3 setter 
    */ 
    Stops(setStops, setErrorStop, setAlert){
        fetch(Endpoints.STOPS)
        .then(res => res.json())
        .then(newStops => {
            setAlert({loading: false, message: '', type:''});
            if (newStops.stops.length) {
                setStops(newStops.stops);
            }
        })
        .catch(e => {
            console.log(e);
            setErrorStop('Please try again!');
            setAlert({loading: true, message: 'Please try again!', type:'warning'});
        })
    }
}