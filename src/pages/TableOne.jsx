// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Card, Typography } from "@mui/material";

// import React, { useRef } from "react";
// import { useReactToPrint } from "react-to-print";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

// export default function DenseTable({
//   tabValues,
//   heading,
//   selectedItems,
//   setSelectedItems,
//   handleShift,
// }) {
//   console.log(heading[1]);
//   return (
//     <>
//       <Card style={{ background: "lightgrey", padding: "20px" }}>
//         <Typography>Table One</Typography>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 {heading.map((h) => (
//                   <TableCell>{h}</TableCell>
//                 ))}

//                 {/* <TableCell align="right">Calories</TableCell>
//                 <TableCell align="right">Fat&nbsp;(g)</TableCell>
//                 <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                 <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {selectedItems.map((ob, index) => {
//                 <TableRow>
//                   {heading.map((h) => (
//                     <TableCell align="center" className="table_data">
//                       {ob[h]}
//                     </TableCell>
//                   ))}
//                   <TableCell
//                     style={{
//                       cursor: "pointer",
//                     }}
//                     className="table_data"
//                     align="center"
//                     onClick={() => handleShift(0, index)}
//                   >
//                     🔻
//                   </TableCell>
//                 </TableRow>;
//               })}
//               {/* {rows.map((row) => (
//                 <TableRow
//                   key={row.name}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     {row.name}
//                   </TableCell>
//                   <TableCell align="right">{row.calories}</TableCell>
//                   <TableCell align="right">{row.fat}</TableCell>
//                   <TableCell align="right">{row.carbs}</TableCell>
//                   <TableCell align="right">{row.protein}</TableCell>
//                 </TableRow>
//               ))} */}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
//     </>
//   );
// }



import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";

function DataTable() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

    const componentToPrintRef = useRef();

      const handleExport = useReactToPrint({
        content: () => componentToPrintRef.checked,
      });

  const handleFileChange = (event) => {
    setData([]);
    setSelected([]);
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleCheckboxChange = (index) => {
    const newSelected = [...selected];
    if (newSelected.includes(index)) {
      newSelected.splice(newSelected.indexOf(index), 1);
    } else {
      newSelected.push(index);
    }
    setSelected(newSelected);
  };

  const handleRowClick = (index) => {
    console.log("Selected row data:", data[index]);
  };


  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleExport}>Print PDF</button>
      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={() => {
                    setSelected(
                      selected.length === data.length
                        ? []
                        : data.map((_, index) => index)
                    );
                  }}
                  checked={selected.length === data.length}
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                />
              </th>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} }>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(index)}
                    checked={selected.includes(index)}
                  />
                </td>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
                <td>{row[5]}</td>
                <td>{row[6]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
          }
export default DataTable;
