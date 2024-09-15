package com.org.carmallproject.Service;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.ByteArrayResource;
//import org.springframework.core.io.InputStreamSource;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Service;
//
//import com.itextpdf.text.Document;
//import com.itextpdf.text.pdf.PdfDocument;
//import com.itextpdf.text.pdf.PdfWriter;
//import com.org.carmallproject.Entity.Car;
//import com.org.carmallproject.Entity.Order;
//import com.org.carmallproject.Entity.Transaction;
//import com.org.carmallproject.Repo.CarRepository;
//import com.org.carmallproject.Repo.TransactionRepository;
//
//import java.io.ByteArrayOutputStream;
//import java.time.temporal.ChronoUnit;
//import java.util.Optional;
//
//@Service
//public class InvoiceService {
//
//    @Autowired
//    private TransactionRepository transactionRepository;
//
//    @Autowired
//    private CarRepository carRepository;  // For fetching Car details
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    // Fetch Transaction and Order details, then generate PDF
//    public byte[] generatePdfForOrder(int orderId) throws Exception {
//        // Fetch the Transaction details using orderId
//        Optional<Transaction> optionalTransaction = transactionRepository.findById(orderId);
//
//        // Handle the Optional, throw an exception if the Transaction is not found
//        if (!optionalTransaction.isPresent()) {
//            throw new Exception("Transaction not found for Order ID: " + orderId);
//        }
//        Transaction transaction = optionalTransaction.get();
//
//        // Fetch associated Order details
//        Order order = transaction.getOrder();  // Now you can safely call getOrder()
//
//        // Fetch Car details using carId from the order
//        Car car = carRepository.findById(order.getCarId())
//                .orElseThrow(() -> new Exception("Car not found for ID: " + order.getCarId()));
//
//        // Prepare PDF generation
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        PdfWriter writer = new PdfWriter(outputStream);
//        PdfDocument pdfDoc = new PdfDocument(writer);
//        Document document = new Document(pdfDoc);
//
//        // Add content to the PDF
//        document.add(new Paragraph("Invoice for Order ID: " + orderId));
//        document.add(new Paragraph("Transaction ID: " + transaction.getTransactionId()));
//        document.add(new Paragraph("User ID: " + order.getUserId()));
//        document.add(new Paragraph("Car ID: " + order.getCarId()));
//        document.add(new Paragraph("Car Model: " + car.getModel()));
//        document.add(new Paragraph("Car Brand: " + car.getBrand()));
//        document.add(new Paragraph("Branch ID: " + order.getBranch().getBranchId()));
//        document.add(new Paragraph("Purchase Status: " + (order.isPurchase() ? "Purchase" : "Rental")));
//
//        // Handle rental and purchase specific details
//        if (order.isPurchase()) {
//            document.add(new Paragraph("Purchase Price: $" + car.getPurchasePrice()));
//        } else {
//            long rentalDuration = ChronoUnit.DAYS.between(order.getStartDate(), order.getEndDate());
//            double rentalCost = rentalDuration * car.getPricePerDay();
//            document.add(new Paragraph("Rental Duration: " + rentalDuration + " days"));
//            document.add(new Paragraph("Rate per Day: $" + car.getPricePerDay()));
//            document.add(new Paragraph("Total Rental Cost: $" + rentalCost));
//        }
//
//        // Add transaction date and amount
//        document.add(new Paragraph("Transaction Date: " + transaction.getTransactionDate()));
//        document.add(new Paragraph("Amount Paid: $" + transaction.getAmount()));
//
//        // Finalize the document
//        document.close();
//        return outputStream.toByteArray();  // Return PDF as byte array
//    }
//
//    // Send email with the generated PDF as attachment
//    public void sendInvoiceEmail(Long orderId, String customerEmail) throws Exception {
//        // Generate the PDF
//        byte[] pdfBytes = generatePdfForOrder(orderId);
//
//        // Call helper method to send email
//        sendMailWithPdf(customerEmail, "Your Invoice", "Please find your invoice attached.", pdfBytes);
//    }
//
//    // Helper method to send the email with the PDF attachment
//    private void sendMailWithPdf(String to, String subject, String body, byte[] pdfBytes) throws MessagingException {
//        // Create a MimeMessage
//        MimeMessage message = mailSender.createMimeMessage();
//
//        // Create a MimeMessageHelper to assist in adding content to the email
//        MimeMessageHelper helper = new MimeMessageHelper(message, true); // true indicates the message is multipart
//
//        // Set the recipient, subject, and body text
//        helper.setTo(to);
//        helper.setSubject(subject);
//        helper.setText(body);
//
//        // Attach the PDF document
//        InputStreamSource pdfSource = new ByteArrayResource(pdfBytes);
//        helper.addAttachment("Invoice.pdf", pdfSource);
//
//        // Send the email
//        mailSender.send(message);
//    }
//}




import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;

import com.org.carmallproject.Entity.Car;
import com.org.carmallproject.Entity.Order;
import com.org.carmallproject.Entity.Transaction;
import com.org.carmallproject.Repo.CarRepository;
import com.org.carmallproject.Repo.TransactionRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private JavaMailSender mailSender;

    public byte[] generatePdfForOrder(int orderId) throws Exception {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(orderId);

        if (!optionalTransaction.isPresent()) {
            throw new Exception("Transaction not found for Order ID: " + orderId);
        }
        Transaction transaction = optionalTransaction.get();

        Order order = transaction.getOrder();

        Car car = carRepository.findById(order.getCarId())
                .orElseThrow(() -> new Exception("Car not found for ID: " + order.getCarId()));

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        // iText 5.x usage
        Document document = new Document();
        PdfWriter.getInstance(document, outputStream);
        document.open();

        document.add(new Paragraph("Invoice for Order ID: " + orderId));
        document.add(new Paragraph("Transaction ID: " + transaction.getTransactionId()));
        document.add(new Paragraph("User ID: " + order.getUserId()));
        document.add(new Paragraph("Car ID: " + order.getCarId()));
        document.add(new Paragraph("Car Model: " + car.getModel()));
        document.add(new Paragraph("Car Brand: " + car.getBrand()));
        document.add(new Paragraph("Branch ID: " + order.getBranch().getbranchId()));
        document.add(new Paragraph("Purchase Status: " + (order.isPurchase() ? "Purchase" : "Rental")));

        if (order.isPurchase()) {
            document.add(new Paragraph("Purchase Price: $" + car.getPurchasePrice()));
        } else {
            long rentalDuration = ChronoUnit.DAYS.between(order.getStartDate(), order.getEndDate());
            double rentalCost = rentalDuration * car.getPricePerDay();
            document.add(new Paragraph("Rental Duration: " + rentalDuration + " days"));
            document.add(new Paragraph("Rate per Day: $" + car.getPricePerDay()));
            document.add(new Paragraph("Total Rental Cost: $" + rentalCost));
        }

        document.add(new Paragraph("Transaction Date: " + transaction.getTransactionDate()));
        document.add(new Paragraph("Amount Paid: $" + transaction.getAmount()));

        document.close();
        return outputStream.toByteArray();
    }

    public void sendInvoiceEmail(int orderId, String customerEmail) throws Exception {
        byte[] pdfBytes = generatePdfForOrder(orderId);
        sendMailWithPdf(customerEmail, "Your Invoice", "Please find your invoice attached.", pdfBytes);
    }

    private void sendMailWithPdf(String to, String subject, String body, byte[] pdfBytes) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body);

        InputStreamSource pdfSource = new ByteArrayResource(pdfBytes);
        helper.addAttachment("Invoice.pdf", pdfSource);

        mailSender.send(message);
    }
}
