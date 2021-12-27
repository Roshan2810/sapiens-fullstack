import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from "@material-ui/core/styles";
import DataTableStyle from "../../styles/MuiDataTableStyle";
import { useState } from "react";
import { useEffect } from "react";
import { Typography } from "@material-ui/core";
import millisecondsToDate from "../../utils/millisecondsToDate";
import Header from "../../components/Header";

const ProductList = () => {
  const [data, setData] = useState([]);

  const makeProductListAPICall = () => {
    fetch(`http://localhost:5001/products/getList`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      let rsp_data = await res.json();
      if (res.ok) {
        setData(rsp_data.data);
      }
    });
  };
  useEffect(() => {
    makeProductListAPICall();
  }, []);

  const options = {
    selectableRows: false,
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
  };

  const columns = [
    {
      name: "productId",
      label: "Product ID",
      options: { sort: false, display: "excluded" },
    },
    { name: "productName", label: "Product Name", options: { sort: false } },
    { name: "quantity", label: "Quantity", options: { sort: false } },
    {
      name: "date",
      label: "Date",
      options: {
        sort: false,
        customBodyRender: (millisec) => {
          return <Typography>{millisecondsToDate(millisec)}</Typography>;
        },
      },
    },
  ];

  return (
    <MuiThemeProvider theme={DataTableStyle}>
      <Header />
      <MUIDataTable
        title="Product List"
        options={options}
        columns={columns}
        data={data}
      />
    </MuiThemeProvider>
  );
};

export default ProductList;
