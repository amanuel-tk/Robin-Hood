import Pages from './pages/Pages'
import Header from './component/Header';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './pages/Auth';
function App() {
  return (
    <AuthProvider> {/* Provides authentication context */}
      <BrowserRouter> {/* Provides routing functionality */}
        <div className='flex flex-col gap-10'>
          <div>
            {/* Header component */}
            <Header />
          </div>
          {/* Pages component containing route definitions */}
          <Pages />

        </div> </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
