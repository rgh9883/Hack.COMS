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
                    <Route path="/" element/>
                    <Route path="/users" element={<Users/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;