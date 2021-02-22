import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const App = () => {
  const [data, setData] = useState([])
  const [fetching, setFetching] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [sorting, setSorting] = useState(true)
  
  useEffect(() => {
    if (fetching) {
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=50&_page=${currentPage}`)
      .then(res => {
        const newData = res.data.map(item => {
          return {
            ...item,
            number: getRandom()
          }
        })
        console.log(newData)
        setData(newData)
        setFetching(false)
      })
      .catch(error => console.error(error))
      .finally(() => setFetching(false))
    }
  }, [fetching, currentPage])
  function getRandom() {
    return Math.ceil(Math.random() * 10000);
  }

  const handlePagination = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1)
    setFetching(true)
  }
  const handleSort = (data) => {
    const newData = [...data]
    if (sorting) {
      newData.sort((a, b) => a.number - b.number)
      setSorting(false)
    } else {
      newData.sort((a, b) => b.number - a.number)
      setSorting(true)
    }
    setData(newData)
  }
  

  return (
    <div>
      <button onClick={handlePagination}>Paginate</button>
      <button onClick={() => handleSort(data)}>Sort</button>
      {
        fetching ?
          <div>Loading...</div>
          :
          data.map(item => {
            return (
              <div key={item.id}>
                <p>Photo's id: {item.id}</p>
                <p>Photo's number: {item.number}</p>
                <h1>{item.title}</h1>
              </div>
            );
          })
      }
      <button onClick={handlePagination}>Paginate</button>
      <button onClick={() => handleSort(data)}>Sort</button>
    </div>
  )
}

