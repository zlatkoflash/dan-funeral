'use client';

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IMenuHeaderItem } from "../PagesInterfaces";

export interface IDCToasterMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title: string;
  id: string;
};
// Interface for the Provider's state/values
interface IDashboardContext {
  menuHeaderItems: IMenuHeaderItem[];
  menuFooterItems: IMenuHeaderItem[];

  messages: IDCToasterMessage[],
  setMessages: Dispatch<SetStateAction<IDCToasterMessage[]>>,

  singleMessage: IDCToasterMessage,
  setSingleMessage: Dispatch<SetStateAction<IDCToasterMessage>>,

  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
}


// 1. Define the Context and its initial value
// We set default empty arrays for the menu items
const DashboardContext = createContext<IDashboardContext>({
  menuHeaderItems: [],
  menuFooterItems: [],
  messages: [],
  setMessages: () => { },

  singleMessage: {} as IDCToasterMessage,
  setSingleMessage: () => { },

  loading: false,
  setLoading: () => { },
});

// 2. Define the Provider component
export function DashboardProvider({ children, menuHeaderItems, menuFooterItems }: { children: React.ReactNode, menuHeaderItems: IMenuHeaderItem[], menuFooterItems: IMenuHeaderItem[] }) {

  const [messages, setMessages] = useState<IDCToasterMessage[]>([]);
  const [singleMessage, setSingleMessage] = useState<IDCToasterMessage>({
    type: 'success',
    message: '',
    title: '',
    id: '',
  } as IDCToasterMessage);

  const [loading, setLoading] = useState<boolean>(false);

  // --- Example/Mock Data using the IMenuHeaderItem interface ---
  // const [menuHeaderItems, setMenuHeaderItems] = useState<IMenuHeaderItem[]>([]);
  // const [menuFooterItems, setMenuFooterItems] = useState<IMenuHeaderItem[]>([]);
  // -------------------------------------------------------------------

  // Use useMemo to prevent unnecessary re-renders of consuming components
  /*const contextValue = useMemo(() => ({
    menuHeaderItems,
    menuFooterItems,
    // If you needed to let children update these menus, you would include 
    // setMenuHeaderItems and setMenuFooterItems here as well.
  }), [menuHeaderItems, menuFooterItems]);*/
  const contextValue = {
    menuHeaderItems,
    menuFooterItems,
    messages,
    setMessages,

    singleMessage,
    setSingleMessage,

    loading,
    setLoading,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

// 3. Define a Custom Hook for easy consumption
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};