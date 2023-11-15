const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', function(req, res, next) {
    // HTML HEAD
    res.setHeader('Content-Type', 'text/html');
    res.write("<title>Root Directory</title>");
    // HTML BODY
    res.write('<br> </br>');
    res.write('<h1>Search for the products you want to buy: <h1>');
    res.write('<form action="/listprod.js" > <input type= "text" id = "pname" name="pname"> <input type="submit" value = "Submit"> <input type="submit" value = "Reset"></form>');
    res.write('<h2>All Products<h2>');
    // Get the product name to search for
    let name = req.query.productName;
    res.write('<table><tr><th>           </th><th>Product Name</th><th>Price</th></tr>');
    
    //Connect to Database
    (async function () {
        try {
            let pool = await sql.connect(dbConfig);
            //SQL Query to select all products
            if (name == null)                
                let sqlQuery = "SELECT productName, productPrice FROM product;";
            else
                let sqlQuery = "SELECT productName, productPrice FROM product WHERE productName LIKE '%" + name + "%'"
            let productResult = await pool.request().query(sqlQuery);

            //Add each summary to table and query the products in each order
            for (let i = 0; i < productResult.recordset.length; i++) {
                //Write each summary to a table row
                let result = productResult.recordset[i];
                
                res.write("<tr> <td onClick = 'addcart?id="+i+"&name="+result.productName+"&price"+result.productPrice+"'> Add to Cart </td> <td>" + result.productName + "</td><td>" +"$" + result.productPrice.toFixed(2) + "</td></tr>");

            }
            res.write("</table>");

            res.end();
        } catch (err) {
            console.dir(err);
            res.write(err);
            res.end();
        }
    })();

    /** $name now contains the search string the user entered
     Use it to build a query and print out the results. **/

    /** Create and validate connection **/

    /** Print out the ResultSet **/

    /** 
    For each product create a link of the form
    addcart?id=<productId>&name=<productName>&price=<productPrice>
    **/

    /**
        Useful code for formatting currency:
        let num = 2.89999;
        num = num.toFixed(2);
    **/

    //res.end();
});

module.exports = router;
