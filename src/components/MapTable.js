import React from 'react'

// Third party liberary 
import Moment from 'react-moment'
import { Card, Table } from 'react-bootstrap'

export default function MapTable(props) {
    return (
        <>
            {/* If API don't work  */}
            {props.errorSubInfo && (
                <p variant='warning'>
                    {props.errorSubInfo}
                </p>
            )}

            {/* Else having stop information  */}
            {props.stopInfo != null && (
                <Card style={{width: `40%`}} >
                    <Card.Header className='p-2'> 
                        <h5 className='mb-0'>Bus: {props.stopInfo.stop.name} </h5>
                        <p style={{fontSize: `12px`}} className='mb-0'><b>Departures:</b> <Moment format="MM-DD-YY hh:mm">{props.stopInfo.dateTime}</Moment></p>
                    </Card.Header>
                    <Card.Body className="p-0" variant="flush"> 
                    <Table style={{width: `100%`}} striped bordered hover variant="dark">
                        <thead>
                        <tr className='th'>
                            <th>From</th>
                            <th>To</th>
                            <th>Estimated</th>
                            <th>Scheduled</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.stopInfo.departures.map((dep, index) => (
                        <tr key={index} className='td'>
                            <td>{dep.from}</td>
                            <td>{dep.to}</td>
                            <td>
                                {dep.estimated ? (<Moment format="MM-DD-YY hh:mm">{dep.estimated}</Moment>): 'Not estimated'} 
                            </td>
                            <td>
                                {dep.scheduled ? (<Moment format="MM-DD-YY hh:mm">{dep.scheduled}</Moment>): 'Not scheduled'} 
                            </td>
                        </tr>))
                        }
                        </tbody>
                    </Table>    
                    </Card.Body>
                </Card>
            )}
        </>        
    )
}
