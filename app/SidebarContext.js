import React, { createContext, useState } from 'react'
const SidebarContext = createContext();
export function MobileSidebarContext({children}) {
  const [Sidebarvisible, setSidebarVisible] = useState(false);
  return (
    <SidebarContext.Provider value={{Sidebarvisible,setSidebarVisible}}>
      {children}
 </SidebarContext.Provider>
  )
}
