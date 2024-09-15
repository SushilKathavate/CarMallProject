using carManagement.Interface;
using carManagement.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace carManagement.Controllers
{
    [ApiController]
    [Route("/api/transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransaction _transactionService;

        public TransactionController(ITransaction transactionService)
        {
            _transactionService = transactionService;
        }

        // GET: api/transaction
        [HttpGet("Alltransactions")]
        public ActionResult<IEnumerable<Transaction>> GetAllTransactions()
        {
            var transactions = _transactionService.GetAllTransactions();
            return Ok(transactions);
        }

        // GET: api/transaction/{id}
        [HttpGet("{id}")]
        public ActionResult<Transaction> GetTransactionById(int id)
        {
            try
            {
                var transaction = _transactionService.GetTransactionById(id);
                return Ok(transaction);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // POST: api/transaction
        [HttpPost]
        public ActionResult<Transaction> CreateTransaction([FromBody] Transaction transaction)
        {
            if (transaction == null)
            {
                return BadRequest("Transaction object is null");
            }

            try
            {
                _transactionService.CreateTransaction(transaction);
                return CreatedAtAction(nameof(GetTransactionById), new { id = transaction.TransactionId }, transaction);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT: api/transaction/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateTransaction(int id, [FromBody] Transaction transaction)
        {
            if (transaction == null || transaction.TransactionId != id)
            {
                return BadRequest("Transaction object is null or ID mismatch");
            }

            try
            {
                _transactionService.Save(transaction);
                return Ok(transaction);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
