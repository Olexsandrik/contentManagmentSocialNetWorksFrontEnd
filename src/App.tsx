import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import { store } from './app/store';
import { Auth } from './components/Auth/Auth';
import { MainContent } from './components/mainContent';
import { Home, NotFound, RootErrorBoundary } from './page';
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
            errorElement={<RootErrorBoundary />}
          />
          <Route
            path="/auth"
            element={<Auth />}
            errorElement={<RootErrorBoundary />}
          />
          <Route
            path="/maincontent"
            element={<MainContent />}
            errorElement={<RootErrorBoundary />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
