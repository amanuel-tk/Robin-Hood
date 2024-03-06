import Pages from './pages/Pages'
import Header from './component/Header';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './pages/Auth';
function App() {
  return (
    <AuthProvider>  <BrowserRouter>
      <div className='flex flex-col gap-10'>
        <div>
          <Header />
        </div>
      
          <Pages />
       
      </div> </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
