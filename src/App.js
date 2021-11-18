import './App.css';
import { useEffect, useState } from 'react'

const UserRows = ({ users }) => {
  if (!users) return (<tr></tr>)
  return (
    <>
      {
        users.map(user => (
          <tr key={user.computedName}>
            <td>{user.computedName}</td>
            <td>{user.streetNumber} {user.streetName}</td>
            <td>{user.city}</td>
            <td>{user.state}</td>
          </tr>
        ))
      }
    </>
  )
}
const UserColumns = ({ headers, handleSort }) => {

  const handleClick = (key) => {
    handleSort(key)
  }

  return (
    <>
      <tr>
        {
          headers.map(header => (
            <th onClick={() => handleClick(header.key)}
              key={header.key}>{header.name}</th>
          ))
        }
      </tr>
    </>
  )
}

const tableFilterData = (data, filterText) => {
  if (filterText === '') return data
  return data.filter(item => Object.values(item).some((word) => JSON.stringify(word).includes(filterText)))
}

const SORT_OPTIONS = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending'
}

const tableSortByColumn = (data, sortObject) => {
  switch (sortObject.order) {
    case SORT_OPTIONS.DESCENDING:
      return data.sort((a, b) => a[sortObject.key].localeCompare(b[sortObject.key]))
    case SORT_OPTIONS.ASCENDING:
      return data.sort((a, b) => b[sortObject.key].localeCompare(a[sortObject.key]))
    default:
      return data
  }
}

function App() {
  const [filterText, setFilterText] = useState('')
  const [users, setUsers] = useState([])
  const filteredUsers = tableFilterData(users, filterText)
  const [sortObject, setSortObject] = useState({ key: 'computedName', order: SORT_OPTIONS.DESCENDING })
  const sortedUsers = tableSortByColumn(filteredUsers, sortObject)

  useEffect(() => {
    getUsersList()
  }, [])

  const getUsersList = () => {
    fetch('https://randomuser.me/api/?results=50')
      .then(resp => resp.json())
      .then(data => {
        let usersList = []
        let results = data.results
        for (let user of results) {
          const { name, location } = user
          usersList.push({
            computedName: name.title + ' ' + name.first + ' ' + name.last,
            streetName: location.street.name,
            streetNumber: location.street.number,
            city: location.city,
            state: location.state
          })
        }
        setUsers(usersList)
      })
  }

  const headers = [
    { name: 'Name', key: 'computedName' },
    { name: 'Street', key: 'streetName' },
    { name: 'City', key: 'city' },
    { name: 'State', key: 'state' }
  ]

  const handleFilterText = (e) => {
    setFilterText(e.target.value)
  }

  const handleSort = (sort_key) => {
    if (sortObject.key !== sort_key) {
      setSortObject({
        key: sort_key,
        order: SORT_OPTIONS.ASCENDING
      })
    } else {
      setSortObject({
        key: sort_key,
        order: SORT_OPTIONS.DESCENDING
      })
    }
  }

  return (
    <div className="App">
      <input type='text' value={filterText} onChange={handleFilterText} />
      <table>
        <thead>
          <UserColumns headers={headers} handleSort={handleSort} />
        </thead>
        <tbody>
          <UserRows users={sortedUsers} />
        </tbody>
      </table>
    </div>
  );
}

export default App;
