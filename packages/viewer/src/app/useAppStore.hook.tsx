import { DmMonster, DmMonsterSprite } from '@dungeonmans-mod-tools/schemas';
import { createContext, PropsWithChildren, use, useState } from 'react';

type Entity = { actor: DmMonster; sprite: DmMonsterSprite };
interface AppStoreContext {
  sidebarOpened: boolean;
  toggleSidebar: () => void;
  openSidebar: (val: boolean) => void;
  setSelected: (data: Entity) => void;
  selected: Entity | null;
}

export const AppStoreContext = createContext<AppStoreContext>(null!);

export const useAppStore = () => {
  const appStore = use(AppStoreContext);
  if (!appStore)
    throw new Error('You must wrap your app with <AppStoreContext>!');

  return appStore;
};

export const AppStoreProvider: React.FC<PropsWithChildren> = (props) => {
  const [sidebarOpened, openSidebar] = useState(false);
  const [selected, setSelected] = useState<Entity | null>(null);

  return (
    <AppStoreContext.Provider
      value={{
        sidebarOpened,
        toggleSidebar: () => openSidebar((prev) => !prev),
        openSidebar,
        selected,
        setSelected,
      }}
    >
      {props.children}
    </AppStoreContext.Provider>
  );
};
