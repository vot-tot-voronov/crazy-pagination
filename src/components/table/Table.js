import React, {useEffect, useReducer} from 'react'
import axios from 'axios'
import {initialState, reducer} from '../../reducer/reducer'
import {createPages, getRandom, tableRow} from '../utils/utils'
import {Container, Table, Button, ButtonGroup, Form} from 'react-bootstrap'
import * as actions from '../../actions/actions'
const {setData, setVisibleData, setTotalCount, setFetching, setCurrentPage, setSorting, setText} = actions

export const TableList = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {data, visibleData, fetching, totalCount, currentPage, sorting, text} = state

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
        dispatch(setData(newData))
        dispatch(setVisibleData(newData))
        if (!totalCount) {
          dispatch(setTotalCount(res.headers['x-total-count']))
        }
        dispatch(setFetching(false))
      })
      .catch(error => console.error(error))
      .finally(() => dispatch(setFetching(false)))
    }
  }, [fetching, currentPage, totalCount])
  
  const handlePagination = (page) => {
    if (currentPage !== page) {
      dispatch(setCurrentPage(page))
      dispatch(setFetching(true))
    }
  }
  const handleSort = (data) => {
    const newData = [...data]
    if (sorting) {
      newData.sort((a, b) => a.number - b.number)
      dispatch(setSorting(false))
    } else {
      newData.sort((a, b) => b.number - a.number)
      dispatch(setSorting(true))
    }
    dispatch(setVisibleData(newData))
  }
  const handleSearch = (data, txt) => {
    if (txt === '') {
      dispatch(setVisibleData(data))
      dispatch(setText(txt))
    } else {
      dispatch(setVisibleData(data.filter(item => item.title.includes(txt))))
      dispatch(setText(txt))
    }
  }
  
  return (
    <Container className="text-center">
      <ButtonGroup className="d-block mt-2 mb-2">
        {pages.map((item, index) => {
          return (
            <Button 
              className={currentPage === item ? `active` : ``} 
              size="sm" key={index} 
              onClick={() => handlePagination(item)}>{item}
            </Button>
          )
        })}
      </ButtonGroup>
      <Form.Control 
        size="sm" onChange={(event) => handleSearch(data, event.target.value)}
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
                <th style={{"cursor": "pointer"}} onClick={() =>handleSort(visibleData)}>Number of photo</th>
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
          return (
            <Button 
              className={currentPage === item ? `active` : ``} 
              size="sm" key={index} 
              onClick={() => handlePagination(item)}>{item}
            </Button>
          )
        })}
      </ButtonGroup>
    </Container>
  )
}