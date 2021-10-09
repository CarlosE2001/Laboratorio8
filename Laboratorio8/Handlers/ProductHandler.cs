using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

using Laboratorio_8.Models;
public class ProductHandler {

    private SqlConnection connection;
    private string connectionRoute;

    public ProductHandler() {
        connectionRoute = ConfigurationManager.ConnectionStrings["dataTable"].ToString();
        connection = new SqlConnection(connectionRoute);
    }

    private DataTable CreateTableFromQuery(string query) {
        SqlCommand queryCommand = new SqlCommand(query, connection);
        SqlDataAdapter tableAdapter = new SqlDataAdapter(queryCommand);
        DataTable queryTable = new DataTable();
        connection.Open();
        tableAdapter.Fill(queryTable);
        connection.Close();
        return queryTable;
    }

    public List<Product> GetAll() {
        List<Product> productsList = new List<Product>();
        string query = "SELECT * FROM Products";
        DataTable resultingTable = CreateTableFromQuery(query);
        foreach (DataRow column in resultingTable.Rows) {
            Product product = new Product();
            product.id = Convert.ToInt32(column["id"]);
            product.quantity = Convert.ToInt32(column["quantity"]);
            product.name = Convert.ToString(column["name"]);
            product.price = Convert.ToInt32(column["price"]);
            productsList.Add(product);
        }
        return productsList;
    }
}