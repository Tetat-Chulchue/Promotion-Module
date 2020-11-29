package com.microservices.servicediscovery.controller;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.microservices.servicediscovery.bean.Promotion;

@CrossOrigin
@RestController
public class PromotionService {

	@Autowired
	private DiscoveryClient discoveryClient;
	
//	ADD PROMOTION
	@RequestMapping(value = "/promotion", method=RequestMethod.POST)
	public ResponseEntity<Promotion> add(@RequestBody Promotion promo) {
		Connection c = null;
	    Statement stmt = null;
	    String sql = "";
		try {
	         Class.forName("org.sqlite.JDBC");
	         c = DriverManager.getConnection("jdbc:sqlite:test.db");
	         stmt = c.createStatement();
	         sql = "INSERT INTO PROMOTIONS (name, method, type, description, quantity, expDate, amount, min, max)" + String.format("VALUES ('%s', '%s', '%s', '%s', %d , '%s', %d, %d, %d);", promo.getName(), promo.getMethod(), promo.getType(), promo.getDescription(), promo.getQuantity(), promo.getExpDate(), promo.getAmount(), promo.getMin(), promo.getMax());
	         stmt.executeUpdate(sql);
	         stmt.close();
	         c.close();
	         
	      } catch ( Exception e ) {
	         System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	         System.exit(0);
	      }
		return new ResponseEntity<Promotion>(promo, HttpStatus.OK);
	}
	
	// ADD PRODUCT
	@RequestMapping(value = "/promotion/product", method=RequestMethod.POST)
	public ResponseEntity<Promotion> add2(@RequestBody Promotion promo) {
		promo.setType("product");
		Connection c = null;
	    Statement stmt = null;
	    String sql = "";
		try {
	         Class.forName("org.sqlite.JDBC");
	         c = DriverManager.getConnection("jdbc:sqlite:test.db");
	         stmt = c.createStatement();
	         sql = "INSERT INTO PROMOTIONS (name, method, type, description, quantity, expDate, amount, min, max)" + String.format("VALUES ('%s', '%s', '%s', '%s', %d, '%s', %d, %d, %d);", promo.getName(), promo.getMethod(), "product", promo.getDescription(), promo.getQuantity(), promo.getExpDate(), promo.getAmount(), promo.getMin(), promo.getMax());
	         stmt.executeUpdate(sql);
	         
	         
	         sql = "SELECT id FROM PROMOTIONS WHERE name=\"" + promo.getName() + "\";";
	         ResultSet rs = stmt.executeQuery( sql );
	         int id = 0;
	         while ( rs.next() ) {
	             id = rs.getInt("id");
	             System.out.println( "ID = " + id );
	          }
	         
	         
	         sql = "INSERT INTO PRODUCT_PROMOTIONS (id, productId)" + String.format("VALUES (%d, %d);", id, promo.getProductId());
	         stmt.executeUpdate(sql);
	         stmt.close();
	         c.close();
	         
	         
	      } catch ( Exception e ) {
	         System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	         System.exit(0);
	      }
		return new ResponseEntity<Promotion>(promo, HttpStatus.OK);
	}
	
	// GET PROMOTIONS
	@RequestMapping(value = "/promotion", method=RequestMethod.GET)
	public  ResponseEntity<List<Promotion>> get() {
		
		ArrayList<Promotion> query = new ArrayList<Promotion>();
		
		Connection c = null;
	    Statement stmt = null;
	    String sql = "";
	    
		try {
	         Class.forName("org.sqlite.JDBC");
	         c = DriverManager.getConnection("jdbc:sqlite:test.db");
	         stmt = c.createStatement();
	         sql = "SELECT PROMOTIONS.id, PROMOTIONS.name, PROMOTIONS.method, PROMOTIONS.type, PROMOTIONS.description, PROMOTIONS.quantity, PROMOTIONS.expDate, PROMOTIONS.amount, PROMOTIONS.min, PROMOTIONS.max, PRODUCT_PROMOTIONS.productId FROM PROMOTIONS LEFT JOIN PRODUCT_PROMOTIONS ON PROMOTIONS.id=PRODUCT_PROMOTIONS.id";
	         ResultSet rs = stmt.executeQuery( sql );
	         
	         
	         
	         while ( rs.next() ) {
	        	 Date date1 = new SimpleDateFormat("E MMM dd HH:mm:ss z yyyy").parse(rs.getString("expDate"));
	        	 Promotion temp = new Promotion(rs.getInt("id"), rs.getString("name"), rs.getString("method"), rs.getString("type"), rs.getString("description"), rs.getInt("quantity"), date1, rs.getInt("amount"), rs.getInt("min"), rs.getInt("max"), rs.getInt("productId"));
	        	 query.add(temp);
	          }
	         
	         
	      } catch ( Exception e ) {
	         System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	         System.exit(0);
	      }
		
		 return new ResponseEntity<List<Promotion>>(query, HttpStatus.OK);
	}
	// EDIT QUANTITY
	@RequestMapping(value = "/promotion/apply/{id}", method=RequestMethod.PATCH)
	public ResponseEntity<Promotion> add3(@PathVariable("id") int id) {
		Connection c = null;
	    Statement stmt = null;
	    String sql = "";
	    Promotion temp = new Promotion();
		try {
	         Class.forName("org.sqlite.JDBC");
	         c = DriverManager.getConnection("jdbc:sqlite:test.db");
	         stmt = c.createStatement();     
	         
	         sql = "SELECT * FROM PROMOTIONS WHERE id=" + id + ";";
	         ResultSet rs = stmt.executeQuery( sql );
	         
	         while ( rs.next() ) {
	        	 temp = new Promotion(rs.getInt("id"), rs.getString("name"), rs.getString("method"), rs.getString("type"), rs.getString("description"), rs.getInt("quantity"), rs.getDate("expDate"), rs.getInt("amount"), rs.getInt("min"), rs.getInt("max"), 0);
	          }
	         if (temp.getQuantity() > 0) {
	        	 temp.setQuantity(temp.getQuantity()-1);
		         sql = "UPDATE PROMOTIONS set quantity=" + temp.getQuantity() + " WHERE id =" + id + ";";
		         stmt.executeUpdate(sql);
	         }
	         stmt.close();
	         c.close();
	         
	         
	      } catch ( Exception e ) {
	         System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	         System.exit(0);
	      }
		return new ResponseEntity<Promotion>(temp, HttpStatus.OK);
	}
	// DELETE PROMOTIONS
	@RequestMapping(value = "/promotion/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Promotion> delete(@PathVariable("id") int id) {
		Connection c = null;
	    Statement stmt = null;
	    String sql = "";
		try {
	         Class.forName("org.sqlite.JDBC");
	         c = DriverManager.getConnection("jdbc:sqlite:test.db");
	         stmt = c.createStatement();     
	         
	         sql = "DELETE from PROMOTIONS WHERE id=" + id + ";";
	         stmt.executeUpdate(sql);
	         sql = "DELETE from PRODUCT_PROMOTIONS WHERE id=" + id + ";";
	         stmt.executeUpdate(sql);
	         stmt.close();
	         c.close();
	         
	         
	      } catch ( Exception e ) {
	         System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	         System.exit(0);
	      }
		return new ResponseEntity<Promotion>(HttpStatus.OK);
	}

	@RequestMapping(value = "/shiba", method=RequestMethod.GET)
	public String shiba() {
		return "SHIBA IS THE CUTEST DOG IN THE UNIVERSE";
	}
}
