import React, { useEffect, useState } from "react"
import { Alert, Col, Container, Row, Form } from "react-bootstrap"
import Axios from "axios"
import ReactPaginate from "react-paginate"
import DataTable from "../DataTable/dataTable"

const Main = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" })

  const itemsPerPage = 10

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "https://jsonplaceholder.typicode.com/users"
      )
      setData(response.data)
    } catch (err) {
      console.error("Failed to fetch data", err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Handle page click for pagination
  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  // Search handler for username
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  // Sorting handler
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    setSortConfig({ key, direction })
  }

  // Sorting and filtering the data
  const filteredAndSortedData = data
    .filter((item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })

  // Paginate the filtered and sorted data
  const currentData = filteredAndSortedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  // Odd/even row background color
  const oddEvenColor = (id) =>
    id % 2 === 0 ? "bg-success text-white" : "bg-danger text-white"

  // Check if the username starts with a vowel
  const isVowel = (username) => /^[aeiou]/i.test(username)

  return (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          <h1 className="text-primary">
            React Bootstrap Table with Pagination, Search, and Sorting
          </h1>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="mb-3">
        <Col md={12}>
          <Form.Control
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
      </Row>

      {/* Data Table */}
      <Row>
        <Col>
          <DataTable
            data={currentData}
            handleSort={handleSort}
            sortConfig={sortConfig}
            oddEvenColor={oddEvenColor}
            isVowel={isVowel}
          />
        </Col>
      </Row>

      {/* Pagination */}
      <ReactPaginate
        pageCount={Math.ceil(filteredAndSortedData.length / itemsPerPage)}
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
    </Container>
  )
}

export default Main
