import React, { useEffect } from "react"
import { Alert, Col, Container, Row } from "react-bootstrap"
import DataTable from "../Database/database"

const main = () => {
  const [mainData, setMainData] = useState([])
  const [error, setError] = useState([])

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "https://jsonplaceholder.typicode.com/users"
      )
      setMainData(response.data)
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
          <DataTable></DataTable>
        </Col>
      </Row>
    </Container>
  )
}

export default main
