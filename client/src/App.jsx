import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    BrowserRouter,
    Routes,
  } from "react-router-dom";
import Users from "./pages/Users";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;