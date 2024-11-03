// Import our custom CSS
import '../scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login(){
    // State variables for login form
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // State variables for signup form
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [organization, setOrganization] = useState('');

    const navigate = useNavigate();

    // Handle login form submission
    const handleLogin = async () => {
        const body = { username: loginUsername, password: loginPassword };
        const response = await fetch('http://localhost:3000/login', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            // Handle success
            const data = await response.json(); // Parse the JSON response
            const userId = data.user.user_id; // Access the user ID
            console.log('Login successful. User ID:', userId);
            navigate(`/dashboard/${loginUsername}`);
        } else {
            // Handle error
            console.error('Login failed');
        }
    };

    // Handle signup form submission
    const handleSignupSubmit = async () => {
        const body = {
            username: signupUsername,
            password: signupPassword,
            email,
            role,
            organization,
        };
        const response = await fetch('http://localhost:3000/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            // Handle success
            console.log('Sign up successful');
            const modalElement = document.getElementById('exampleModal');
            const modal = bootstrap.Modal.getInstance(modalElement); // Get the modal instance
            modal.hide();
            setLoginUsername(signupUsername);
            setLoginPassword(signupPassword);
        } else {
            // Handle error
            console.error('Sign up failed');
        }
    };
    return (
        <>
            <div>
                <div class="d-flex flex-row w-100 vh-100">
                    <div class="d-flex flex-column w-100 justify-content-center align-items-center">
                        <div class="d-flex justify-content-center w-100 mt-5">
                            <h1>Sign In</h1>
                        </div>
                        <div class="d-flex justify-content-center w-100 mt-2">
                            <p>If you do not have an account, click Sign Up to create one!</p>
                        </div>
                        {/* Sign in form */}
                        <div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Enter your username" aria-label="Username" value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}></input>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Enter your password" aria-label="Passward"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}></input>
                            </div>
                        </div>
                        <div class="mb-2">
                            <button type="button" class="btn btn-primary btn-lg"onClick={handleLogin}>Sign In</button>
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">Sign Up</button>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 vh-100">
                        <div class="d-flex justify-content-center align-items-center vh-100" >
                            <img src="./src/hack.coms.logo.png" alt="teachmelogo" width="594" height="531"></img>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Sign Up</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {/* Sign up form */}
                    <div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Enter username" aria-label="Username"
                            value={signupUsername}
                            onChange={(e) => setSignupUsername(e.target.value)}></input>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Enter password" aria-label="Passward"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}></input>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Enter email" aria-label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <select class="form-select mb-3" aria-label="Select role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option selected>Select a role</option>
                            <option value="mentor">Mentor</option>
                            <option value="mentee">Mentee</option>
                            <option value="both">Both</option>
                        </select>
                        <select class="form-select" aria-label="Select organization" value={organization} onChange={(e) => setOrganization(e.target.value)}>
                            <option selected>Select an organization</option>
                            <option value="Tech for Good">Tech for Good</option>
                            <option value="Code Masters">Code Masters</option>
                            <option value="Youth Innovators">Youth Innovators</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onClick={handleSignupSubmit}>Submit</button>
                </div>
                </div>
            </div>
            </div>
        </>
        
        
    );
}

export default Login;