import * as bootstrap from 'bootstrap';
import { useEffect, useState, props } from 'react';
import axios from 'axios';

function Dashboard(props){
    const [requests, setRequests] = useState([]);
    
    useEffect(() => {
        const fetchAllRequests = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/user?username=${props.username}`);
                setRequests(res.data.requests);
                console.log(requests);
            } catch(err) {
                console.log(err);
            }
        }
        fetchAllRequests()
    }, [])

    return (
        <>
            <h1>{props.username}'s Requests</h1>
            <div className='row row-cols-4 row-cols-md-4'>
                {requests.map(request => (
                    <div className="col">
                    <div className="card" style={{"width": 10 + "rem"}}>
                        <div className="card-header">
                            {request.request_type}
                        </div>
                        <ul className="list-group list-group-flush">
                        <li className="list-group-item">{request.request_status}</li>
                        <li className="list-group-item"><button className='btn btn-danger' id={request.request_id}>Delete</button></li>
                        </ul>
                  </div>
                  </div>
                ))}
            </div>
        </>
    );
}
export default Dashboard