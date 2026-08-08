import { Route, Routes, Link } from 'react-router-dom';
import Actors from './actors/Actors';

export function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Actors />
            </main>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
