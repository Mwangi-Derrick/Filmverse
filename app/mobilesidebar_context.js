"use client"
import React, { createContext, useState } from 'react'
export const SidebarContext = createContext();
export function MobileSidebarContextProvider({children}) {
  const [Sidebarvisible, setSidebarVisible] = useState(false);
  return (
    <SidebarContext.Provider value={{Sidebarvisible,setSidebarVisible}}>
      {children}
 </SidebarContext.Provider>
  )
}
