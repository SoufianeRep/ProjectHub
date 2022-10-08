import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUploadForm from "./components/FileUploadForm";


function App() {
  return (
    <div className="container mt-5">
      <h1>Project Hub</h1>
      <h3>Proof of concept</h3>

      <FileUploadForm />
      <ToastContainer />
    </div>
  );
}

export default App;
