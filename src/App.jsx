// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./Pages/LandingPage";
// import Questionnaire from "./Pages/Questionnaire";
// import "./index.css";


// function App() {
//   return (
//     <Router>
      
//         <div className="App">
//           <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/Questionnaire" element={<Questionnaire />} />
            
//           </Routes>
//         </div>
  
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Questionnaire from "./Pages/Questionnaire";
import "./index.css";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Questionnaire" element={<Questionnaire />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;