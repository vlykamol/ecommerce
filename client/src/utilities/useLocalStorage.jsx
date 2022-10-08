import { useState, useEffect } from "react"


export default function useLocalStorage(key, initalValue) {
  const [state, setState] = useState(() => {
    const temp = localStorage.getItem(key)
    if(temp) return JSON.parse(temp)
    return initalValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])
  return [state, setState]
}
