//jshint esversion:8
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const moment = require('moment');

router.get('/', function (req, res, next) {
    //Connect to Database
    (async function () {
        try {
            let tableString = '';
            //Begin table for all order information
            tableString += '<thead class="thead-dark"><tr><th>Order Id</th><th>OrderDate</th><th>Customer Id</th><th>Customer Name</th><th>Total Amount</th></tr></thead>';
            let pool = await sql.connect(dbConfig);
            //SQL Query to select all Order Summaries
            let sqlQuery = "SELECT O.orderId as OrderId, FORMAT(O.orderDate, 'yy-MM-dd hh:mm:ss') as OrderDate, O.customerId as CustomerId, C.firstName as Name, C.lastName as LastName, O.totalAmount as TotalAmount from ordersummary O JOIN Customer C on O.customerId = C.customerId; ";
            let orderResults = await pool.request().query(sqlQuery);

            //Add each summary to table and query the products in each order
            for (let i = 0; i < orderResults.recordset.length; i++) {
                //Write each summary to a table row
                let result = orderResults.recordset[i];
                let orderNum = result.OrderId;
                tableString += "<tr><td rowspan=\"2\">" + result.OrderId + "</td><td>" + result.OrderDate.toString() + "</td><td>" + result.CustomerId + "</td><td>" + result.Name + " " + result.LastName + "</td><td>$" + result.TotalAmount + "</td></tr>";


                //get all products in each order
                let productQuery = "SELECT productId, quantity, price from orderproduct WHERE orderId = @orderNum";
                let productResults = await pool.request()
                    .input('orderNum', sql.Int, orderNum)
                    .query(productQuery);

                //create sub table and write
                tableString += "<tr><td colspan=\"4\"><table class=\"right\"><tr><th>Product Id</th><th>Quantity</th><th>Price</th></tr>";
                //add each product to sub table
                for (let i = 0; i < productResults.recordset.length; i++) {
                    let product = productResults.recordset[i];
                    tableString += "<tr><td>" + product.productId + "</td><td>" + product.quantity + "</td><td>" + "$" + product.price.toFixed(2) + "</td></tr>";
                }

                tableString += "</table></td></tr>";

            }

            res.render('test', {
                layout: 'main',
                ordersTable: tableString
            });

        } catch (err) {
            console.dir(err);
            res.write(err);
            res.end();
        }
    })(); 
});

module.exports = router;