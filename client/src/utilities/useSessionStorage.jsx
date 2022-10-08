import { useState, useEffect } from "react"


export default function useSessionStorage(key, initalValue) {
  const [state, setState] = useState(() => {
    const temp = sessionStorage.getItem(key)
    if(temp) return JSON.parse(temp)
    return initalValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state))
  }, [key, state])
  return [state, setState]
}
