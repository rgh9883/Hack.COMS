import * as bootstrap from 'bootstrap';
import { useEffect, useState, props } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Dashboard(props){
    const [requests, setRequests] = useState([]);
    const [bgColor, setBGColor] = useState({});
    const navigate = useNavigate();
    const [newRequest, setNewRequest] = useState({
        username: props.username,
        request_type: "",
        request_status: "pending"
    })

    const { username } = useParams();
    
    useEffect(() => {
        const fetchAllRequests = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/user?username=${username}`);
                setRequests(res.data.requests);
                console.log(requests);
            } catch(err) {
                console.log(err);
            }
        }
        fetchAllRequests()
    }, [username])

    useEffect(() => {
        const firstColors = {};
        
        requests.forEach(request => {
          if (request.request_status === 'pending') {
            firstColors[request.request_id] = 'lightyellow';
          } else if (request.request_status === 'matched') {
            firstColors[request.request_id] = 'lightblue';
          } else if (request.request_status === 'completed') {
            firstColors[request.request_id] = 'lightgreen';
          } else {
            firstColors[request.request_id] = 'white'; // Default color
          }
        });
    
        setBGColor(firstColors);
      }, [requests]);

    const handleStatusChange = (id, e) => {
        let color;

        updateRequest(id, e.target.value);

        if(e.target.value === "pending") {
            color = "lightyellow";
        } else if(e.target.value === "matched") {
            color = "lightblue";
        } else {
            color = "lightgreen";
        }

        setBGColor((prevColors) => ({
            ...prevColors,
            [id]: color,
          }));
    }

    const updateRequest = async (id, status) => {
        const body = {
            request_status: status,
            request_id: id
        }
        try {
            const res = await axios.put("http://localhost:3000/updateRequest", body);
            console.log(res);
        } catch(err) {
            console.log(err);
        }
    }

    const handleLogout = async () => {
        navigate('/', { replace: true });
    }

    const handleCreateRequest = async () => {
        try {
            const res = await axios.post("http://localhost:3000/createRequest", newRequest);
            console.log(res);
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    }

    const handleRequestForm = (e) => {
        setNewRequest({
            username: props.username,
            request_type: e.target.value,
            request_status: "pending"
        })
    } 

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <button type="button" class="btn btn-primary me-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Create Request
                    </button>
                    <div className="d-flex flex-grow-1">
                        <span className="navbar-brand mx-auto"><h1>{username}'s Requests</h1></span>
                    </div>
                    <button className="btn btn-outline-danger ms-auto" onClick={() => handleLogout()}>
                        Logout
                    </button>
                </div>
            </nav>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Create New Request</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <select className="form-select" aria-label="Default select example" onChange={(event) => handleRequestForm(event)}>
                        <option value="resume_review">Resume Review</option>
                        <option value="elevator_pitch">Elevator Pitch</option>
                        <option value="class_help">Class Help</option>
                        <option value="business_idea">Business Idea</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onClick={handleCreateRequest}>Create</button>
                </div>
                </div>
            </div>
            </div>
            <div className='row row-cols-4 row-cols-md-4'>
                {requests.map(request => (
                    <div className="col d-flex justify-content-center align-items-center">
                    <div className="card" style={{width: "10rem", backgroundColor: bgColor[request.request_id] || 'white', margin: "2em"}}>
                        <div className="card-header">
                            {request.request_type}
                        </div>
                        <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <select className="form-select" aria-label="Default select example" defaultValue={request.request_status} onChange={(event) => handleStatusChange(request.request_id, event)}>
                                <option value="pending">Pending</option>
                                <option value="matched">Matched</option>
                                <option value="completed">Completed</option>
                            </select>
                        </li>
                        <li className="list-group-item d-flex justify-content-center"><button className='btn btn-danger' id={request.request_id}>Delete</button></li>
                        </ul>
                  </div>
                  </div>
                ))}
            </div>
        </>
    );
}
export default Dashboard;