import Pages from './pages/Pages'
import Header from './component/Header';
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
