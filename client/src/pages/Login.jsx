// Import our custom CSS
import '../scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


function Login(){
    return (
        <div>
            <div class="d-flex flex-row w-100 vh-100">
                <div class="d-flex flex-column w-100 justify-content-center align-items-center">
                    <div class="d-flex justify-content-center w-100 mt-5">
                        <h1>Sign In</h1>
                    </div>
                    <div class="d-flex justify-content-center w-100 mt-2">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Enter your username" aria-label="Username"></input>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Enter your password" aria-label="Passward"></input>
                        </div>
                    </div>
                    <div class="mb-2">
                        <button type="button" class="btn btn-primary btn-lg">Sign In</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary btn-lg">Sign Up</button>
                    </div>
                </div>
                <div class="d-flex flex-column w-100 vh-100">
                    <div class="d-flex justify-content-center align-items-center vh-100" >
                        <img src="./src/hack.coms.logo.png" alt="teachmelogo" width="594" height="531"></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login