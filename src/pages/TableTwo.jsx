import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { padding } from "@mui/system";

const Table2 = ({ heading, items, handleShift }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item, index) => {
    let updatedSelectedItems = [...selectedItems];
    if (selectedItems.includes(index)) {
      updatedSelectedItems = selectedItems.filter(
        (selectedIndex) => selectedIndex !== index
      );
    } else {
      updatedSelectedItems.push(index);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const handlePrint = () => {
    const selectedData = selectedItems.map((index) => items[index]);
    const headers = Object.keys(selectedData[0]);
    const convertedArray = selectedData.map((obj) =>
      headers.map((header) => obj[header])
    );

    const doc = new jsPDF("p", "pt");

    const columns = heading.map((h) => {
      return { title: h, dataKey: h };
    });

    doc.autoTable({
      head: [columns],
      body: convertedArray,
      styles: {
        fontSize: 8,
      },
    });

    doc.save("selected-data.pdf");
  };

  return (
    <div className="table_box">
      <h2
        style={{
          textAlign: "center",
        }}
      >
        
      </h2>

      <table className="table">
        <thead>
          <tr>
            {heading.map((h) => (
              <th scope="col" className="table_heading">
                {h}
              </th>
            ))}
            <th className="table_heading">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d, idx) => (
            <tr key={idx}>
              {heading.map((h) => {
                return (
                  <td align="center" className="table_data">
                    {d[h]}
                  </td>
                );
              })}
              <td align="center" className="table_data">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(d, idx)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{ maxWidth: "200px" }}
        class="button-28 print"
        role="button "
        onClick={handlePrint}
      >
        Download Pdf
      </button>
    </div>
  );
};

export default Table2;
