import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    BrowserRouter,
    Routes,
  } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard/:username" element={<Dashboard/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;