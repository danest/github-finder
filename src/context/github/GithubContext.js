import { createContext, useReducer } from "react";
import githubReducer from "../GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = "https://api.github.com"
const GITHUB_TOKEN = "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"

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)

  const initialState = {
    users: [],
    repos: [],
    user: {},
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // get search results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text
    })
  
    const response = await fetch(`https://api.github.com/search/users?${params}`)

    const { items } = await response.json()

    // setUsers(data)
    // setLoading(false)

    dispatch({
      type: "GET_USERS",
      payload: items
    })

  }

  // get a single user
  const getUser = async (login) => {
    setLoading()

    const response = await fetch(`https://api.github.com/users/${login}`)
    console.log(response)
    if(response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json()

      // setUsers(data)
      // setLoading(false)

      dispatch({
        type: "GET_USER",
        payload: data
      })
    }

  }


  // get user repots
  const getUserRepos = async (login) => {
    setLoading()

    const response = await fetch(`https://api.github.com/users/${login}/repos`)

    const data = await response.json()

    // setUsers(data)
    // setLoading(false)

    dispatch({
      type: "GET_REPOS",
      payload: data
    })

  }

  // clear users from state
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS"
    })
  }

  // set loading

  const setLoading = () => dispatch({ type: "SET_LOADING" })

  return (
    <GithubContext.Provider value={{
      users: state.users,
      loading: state.loading,
      user: state.user,
      repos: state.repos,
      searchUsers,
      clearUsers,
      getUserRepos,
      getUser
      }}>
      {children}
    </GithubContext.Provider>
  )

}

export default GithubContext