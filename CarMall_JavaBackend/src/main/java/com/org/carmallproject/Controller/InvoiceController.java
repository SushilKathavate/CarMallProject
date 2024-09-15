package com.org.carmallproject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.carmallproject.Service.InvoiceService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/mail/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/send/{orderId}")
    public ResponseEntity<String> sendInvoiceEmail(@PathVariable("orderId") int orderId) {
        // You may want to fetch the customer's email from the database instead of hardcoding it
        String customerEmail = "drakesimons104@gmail.com";
        
        try {
            invoiceService.sendInvoiceEmail(orderId, customerEmail);
            return ResponseEntity.ok("Invoice sent successfully.");
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send invoice: " + e.getMessage());
        }
    }
}