import { Route, Routes, Link } from 'react-router-dom';
import Actors from './actors/Actors';
import { AppStoreProvider, useAppStore } from './useAppStore.hook';
import styles from './app.module.css';
import EditActor from './actors/EditActor';

const MainView = () => {
  const store = useAppStore();
  return (
    <main className={styles.grid} data-sidebar-opened={store.sidebarOpened}>
      <div className={styles.main}>
        <Actors />
      </div>
      <div className={styles.sidebar}>
        {store.selected && <EditActor {...store.selected} />}
      </div>
    </main>
  );
};

export function App() {
  return (
    <AppStoreProvider>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </AppStoreProvider>
  );
}

export default App;
