import React, { createContext, useState } from 'react'

//1 create context
export const searchContext = createContext("")

function SearchContext({children}) {

    //2 global state creation
    const [searchKey, setSearchKey] = useState("");

  return (
    <searchContext.Provider value={{ searchKey, setSearchKey }}>
      {children}
    </searchContext.Provider>
  )
}

export default SearchContext
