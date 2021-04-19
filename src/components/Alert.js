import SweetAlert from 'react-bootstrap-sweetalert';

export default function Alerts(props) {
    return (
      <>
        {props.alert?
          (
            <SweetAlert
            {...props.type}
            title={props.message}
            timer={2000}
            onConfirm={props.onConfirm}
          >
          </SweetAlert>
          ): null
        } 
      </>  
    )
}

