import React from "react"
import { Table } from "react-bootstrap"

const DataTable = ({ data, handleSort, sortConfig, oddEvenColor, isVowel }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th onClick={() => handleSort("id")}>
            User-ID{" "}
            {sortConfig.key === "id" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("name")}>
            Name{" "}
            {sortConfig.key === "name" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("username")}>
            Username{" "}
            {sortConfig.key === "username" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("email")}>
            Email{" "}
            {sortConfig.key === "email" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("phone")}>
            Phone{" "}
            {sortConfig.key === "phone" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              No Data Found
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id}>
              <td className={oddEvenColor(item.id)}>{item.id}</td>
              <td>{item.name}</td>
              <td
                className={
                  isVowel(item.username)
                    ? "bg-info text-white"
                    : oddEvenColor(item.id)
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
  )
}

export default DataTable
