import React, { useState } from "react"
import { Form, Button, Row, Col, Table } from "react-bootstrap"
import ReactPaginate from "react-paginate"

const DataTable = ({ data, filterData, setFilteredData }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [sortDirection, setSortDirection] = useState(true)
  const [error, setError] = useState(false)

  const itemPerPage = 5

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    )
    setError(filtered.length === 0 ? true : false)
    setFilteredData(filtered)
  }

  // sorting
  const handleSort = () => {
    const sortedData = [...filterData].sort((a, b) => {
      console.log("Props Data:", data)
      console.log("Filtered Data:", filterData)
      if (sortDirection) {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })
    setFilteredData(sortedData)
    setSortDirection(!sortDirection)
  }

  const handlePageClick = (event) => {
    console.log("Page Clicked:", event.selected)
    setCurrentPage(event.selected)
  }

  const currentItems = filterData.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  )
  console.log("Current Items for Display:", currentItems)

  const isVowel = (username) => {
    const vowels = ["A", "E", "I", "O", "U"]
    const firstLetter = username.charAt(0).toUpperCase()
    return vowels.includes(firstLetter)
  }

  const oddEvenColor = (id) => {
    return id % 2 === 0 ? "bg-success text-white" : "bg-danger text-white"
  }

  return (
    <div>
      {/* search input */}
      <Row className="md-3">
        <Col md={12}>
          <Form.Control
            type="text"
            placeholder="search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User-ID</th>
            <th>
              Name
              <Button onClick={handleSort} variant="link" size="sm">
                {sortDirection ? "↑" : "↓"}
              </Button>
            </th>
            <th>UserName</th>
            <th>Email</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                <strong>No Data Found</strong>
              </td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td className={oddEvenColor(item.id)}>{item.id}</td>
                <td>{item.name}</td>
                <td
                  className={
                    isVowel(item.username)
                      ? "bg-danger text-white"
                      : "bg-success text-white"
                  }
                >
                  {item.username}
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <ReactPaginate
        pageCount={Math.ceil(filterData.length / itemPerPage)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        previousLabel={"<"}
        nextLabel={">"}
      />
    </div>
  )
}
export default DataTable
