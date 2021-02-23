import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {createPages, getRandom} from '../utils/utils'
import {Container, Table, Button, ButtonGroup, Form} from 'react-bootstrap'

export const TableList = () => {
  const [data, setData] = useState([])
  const [fetching, setFetching] = useState(true)
  
  const [sorting, setSorting] = useState(true)
  const [visibleData, setVisibleData] = useState([])
  const [text, setText] = useState('')
  
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pagesCount = Math.ceil(totalCount / 50)
  const pages = []
  createPages(pages, pagesCount, currentPage)
  
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
        setData(newData)
        setVisibleData(newData)
        if (!totalCount) {
          setTotalCount(res.headers['x-total-count'])
        }
        setFetching(false)
      })
      .catch(error => console.error(error))
      .finally(() => setFetching(false))
    }
  }, [fetching, currentPage, totalCount])
  
  const handlePagination = (page) => {
    if (currentPage !== page) {
      setCurrentPage(page)
      setFetching(true)
    }
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
    setVisibleData(newData)
    setText('')
  }
  const handleSearch = (data, txt) => {
    if (txt === '') {
      setVisibleData(data)
      setText(txt)
    } else {
      setVisibleData(data.filter(item => item.title.includes(txt)))
      setText(txt)
    }
  }
  const tableRow = (id, number, title) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{number}</td>
        <td>{title}</td>
      </tr>
    )
  }
  
  return (
    <Container className="text-center">
      <ButtonGroup className="d-block mt-2 mb-2">
        {pages.map((item, index) => {
          return <Button className={currentPage === item ? `active` : ``} size="sm" key={index} onClick={() => handlePagination(item)}>{item}</Button>
        })}
      </ButtonGroup>
      <Form.Control size="sm" onChange={(event) => handleSearch(data, event.target.value)}
                className="w-50 mb-2 d-inline"
                type="text" name="search" 
                placeholder="Search" 
                value={text}/>
      
      
      {
        fetching ?
          <div>Loading...</div>
          :
          <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th style={{"cursor": "pointer"}} onClick={() =>handleSort(data)}>Number of photo</th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      visibleData.map(item => tableRow(item.id, item.number, item.title))                    
                    }
                  </tbody>
                </Table>
      }
      <ButtonGroup className="d-block mt-2 mb-2">
        {pages.map((item, index) => {
          return <Button className={currentPage === item ? `active` : ``} size="sm" key={index} onClick={() => handlePagination(item)}>{item}</Button>
        })}
      </ButtonGroup>
    </Container>
  )
}

