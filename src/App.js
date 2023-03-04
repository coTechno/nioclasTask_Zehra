import "bootstrap/dist/css/bootstrap.min.css";
import MathQuestion from "./Components/MathQuestion";
import { MathJaxContext } from 'better-react-mathjax';

function App() {
  return (
    <MathJaxContext>
      <MathQuestion />
    </MathJaxContext>
  );
}

export default App;
