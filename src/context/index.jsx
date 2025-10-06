import React, { createContext, useEffect, useState } from 'react';
import UserStore from '@/store/UserStore';

export const Context = createContext(null);

export default function AppProvider({ children }) {
  const [stores] = useState(() => ({ user: new UserStore() }));
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    (async () => {
      if (typeof stores.user.checkOnStart === 'function') {
        await stores.user.checkOnStart();
      }
      setBooted(true);
    })();
  }, [stores]);

  if (!booted) return null; // можно поставить сплэш/скелетон

  return (
    <Context.Provider value={stores}>
      {children}
    </Context.Provider>
  );
}
