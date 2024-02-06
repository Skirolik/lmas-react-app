import React, { useState } from "react";
import {
  Table,
  Text,
  useMantineTheme,
  Divider,
  Pagination,
  Select,
  Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const TableComponent = ({ data, columns, visibleColumns }) => {
  console.log("cols", columns);
  const theme = useMantineTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateColumn, setSelectedDateColumn] = useState("");

  // Function to create table rows based on visible columns
  const createRows = (rowData) => {
    return visibleColumns.map((column) => (
      <td key={column}>
        {column.endsWith("_date")
          ? new Date(rowData[column]).toLocaleDateString()
          : rowData[column]}
      </td>
    ));
  };

  const handleDatePickerButtonClick = (column) => {
    setShowDatePicker((prev) => !prev);
    setSelectedDateColumn(column);
  };

  const handleDatePickerChange = (date) => {
    handleFilterChange(selectedDateColumn, date ? date.toISOString() : "");
    setShowDatePicker(false);
  };

  const handleClearButtonClick = () => {
    handleFilterChange(selectedDateColumn, "");
    setShowDatePicker(false);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const filteredData = applyFilters(data);
    return filteredData.slice(startIndex, endIndex);
  };

  const applyFilters = (data) => {
    return data.filter((row) =>
      Object.entries(filters).every(([column, filterValue]) => {
        if (!filterValue) return true; // Return true if filter is not set

        const rowValue = row[column];

        if (column.endsWith("_date")) {
          // Check if the date is equal to the filter value
          //console.log("date", data);
          const formattedRowDate = new Date(rowValue).toLocaleDateString();
          console.log("rowDare", formattedRowDate);
          const formattedFilterDate = new Date(
            filterValue
          ).toLocaleDateString();
          console.log("filter", formattedFilterDate);
          return formattedRowDate === formattedFilterDate;
        }

        // Check if the non-date value (or formatted date) is equal to the filter value
        const formattedRowValue =
          typeof rowValue === "object"
            ? rowValue.toLocaleDateString()
            : rowValue;
        return String(formattedRowValue) === filterValue;
      })
    );
  };
  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const generateFilterOptions = (column) => {
    const uniqueValues = Array.from(new Set(data.map((row) => row[column])));
    return [
      { label: "All", value: "" },
      ...uniqueValues.map((value) => ({
        label: String(value),
        value: String(value),
      })),
    ];
  };

  const activePageStyle = {
    backgroundImage:
      theme.colorScheme === "dark"
        ? "linear-gradient(45deg, #FFC0CB, violet)"
        : theme.colors.blue[6],
    border: 0,
  };

  return (
    <div>
      <Divider size="lg" />
      <Table
        mt="xl"
        striped
        highlightOnHover
        withColumnBorders
        withBorder
        verticalSpacing="xs"
        // horizontalSpacing="xs"
        columnWidth="content"
        data={data}
      >
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th key={column}>
                {columns[column]}
                <br />
                {column.endsWith("_date") ? (
                  <div>
                    <Button
                      variant="outline"
                      size="xs"
                      radius="xl"
                      onClick={() => handleDatePickerButtonClick(column)}
                    >
                      {showDatePicker && selectedDateColumn === column
                        ? "close"
                        : "Filter"}
                    </Button>
                    {showDatePicker && selectedDateColumn === column && (
                      <DatePicker
                        value={
                          filters[column] ? new Date(filters[column]) : null
                        }
                        onChange={handleDatePickerChange}
                        placeholder="Select date"
                        withSelect
                      />
                    )}
                  </div>
                ) : (
                  <Select
                    placeholder="Filter"
                    clearable
                    searchable
                    data={generateFilterOptions(column)}
                    value={filters[column] || ""}
                    onChange={(value) => handleFilterChange(column, value)}
                    placement="bottom-start" // Set the placement to "bottom-start"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((row) => (
            <tr key={row.id} style={{ cursor: "pointer" }}>
              {createRows(row)}
            </tr>
          ))}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
          size="sm"
          siblings={2}
          limit={1}
          boundaries={1}
          position="right"
          style={{ marginTop: "20px" }}
          styles={(currentTheme) => ({
            control: {
              "&[data-active]": activePageStyle,
            },
          })}
        />
      )}

      {data.length === 0 && <Text>No data available.</Text>}
    </div>
  );
};

export default TableComponent;
