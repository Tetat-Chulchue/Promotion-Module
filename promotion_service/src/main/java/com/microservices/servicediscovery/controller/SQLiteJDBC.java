package com.microservices.servicediscovery.controller;
import java.sql.*;

public class SQLiteJDBC {
	public static void main( String args[] ) {
	      Connection c = null;
	      Statement stmt = null;
	      
	      try {
	         Class.forName("org.sqlite.JDBC");
	         c = DriverManager.getConnection("jdbc:sqlite:test.db");
	         System.out.println("Opened database successfully");

	         stmt = c.createStatement();
	         String sql = "CREATE TABLE PROMOTIONS " +
	                        "(id INTEGER PRIMARY KEY   AUTOINCREMENT," +
	                        " name           TEXT    NOT NULL, " + 
	                        " method         TEXT     NOT NULL, " +
	                        " type			 TEXT    NOT NULL, " +
	                        " description    TEXT, " +
	                        " quantity    	 INT  NOT NULL, " + 
	                        " expDate        DATE, " +
	                        " amount		 INT 	NOT NULL, " +
	                        " min		 	 INT 	NOT NULL, " +
	                        " max		 	 INT 	NOT NULL) "; 
	         stmt.executeUpdate(sql);
	         sql = "CREATE TABLE PRODUCT_PROMOTIONS " +
                     "(id INTEGER PRIMARY KEY," +
                     " productId INTEGER NOT NULL) ";
	         stmt.executeUpdate(sql);
	         stmt.close();
	         c.close();
	      } catch ( Exception e ) {
	         System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	         System.exit(0);
	      }
	      System.out.println("Table created successfully");
	   }
	}