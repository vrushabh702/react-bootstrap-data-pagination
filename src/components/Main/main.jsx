import React, { useEffect, useState } from "react"
import { Alert, Col, Container, Row } from "react-bootstrap"
import Axios from "axios"
import DataTable from "../DataTable/dataTable"

const Main = () => {
  const [data, setMainData] = useState([])
  const [filterData, setFilteredData] = useState([])
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "https://jsonplaceholder.typicode.com/users"
      )
      console.log("Fetched Data:", response.data) // Log fetched data
      setMainData(response.data)
      setFilteredData(response.data)
    } catch (err) {
      setError("Failed to fetch data")
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <Row className="md-4">
        <Col className="text-center">
          <h1 className="text-primary">
            React Bootstrap Table with Pagination, Search, and Sorting
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            data={data}
            filterData={filterData}
            setFilteredData={setFilteredData}
          ></DataTable>
        </Col>
      </Row>
    </Container>
  )
}

export default Main
