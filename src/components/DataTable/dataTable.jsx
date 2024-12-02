import React, { useState } from "react"
import { Form, Button, Row, Col, Table } from "react-bootstrap"
import ReactPaginate from "react-paginate"

const DataTable = ({ data, filterData, setFilteredData }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [sortDirection, setSortDirection] = useState(true)

  const itemPerPage = 5

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    )
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

  return (
    <div>
      {/* search input */}
      <Row className="md-3">
        <Col md={6}>
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
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
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
