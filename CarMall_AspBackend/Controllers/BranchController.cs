using Microsoft.AspNetCore.Mvc;
using carManagement.Models;
using carManagement.Interface;
using System.Collections.Generic;

namespace carManagement.Controllers
{
    [ApiController]
    [Route("api/branch")]
    public class BranchController : ControllerBase
    {
        private readonly IBranch _branchService;

        public BranchController(IBranch branchService)
        {
            _branchService = branchService;
        }

        //[HttpGet("/Allbranches")]
        //public ActionResult<IEnumerable<Branch>> GetAllBranches()
        //{
        //    try
        //    {
        //        var branches = _branchService.GetAllBranches();
        //        if (branches == null || !branches.Any())
        //        {
        //            return NotFound("No branches found.");
        //        }
        //        return Ok(branches);
        //        //return Ok(branches);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle the exception (logging, etc.)
        //        return StatusCode(500, ex.Message);
        //    }
        //}
        [HttpGet("Allbranches")]
        public ActionResult<IEnumerable<Branch>> GetAllBranches()
        {
            try
            {
                var branches = _branchService.GetAllBranches();
                if (branches == null || !branches.Any())
                {
                    return NotFound("No branches found.");
                }
                return Ok(branches);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("{id}")]
        public ActionResult<Branch> GetBranchById(int id)
        {
            try
            {
                var branch = _branchService.GetBranchById(id);
                if (branch == null)
                {
                    return NotFound($"Branch with ID {id} not found.");
                }
                return Ok(branch);
            }
            catch (Exception ex)
            {
                // Handle the exception (logging, etc.)
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("newbranch")]
        public ActionResult<Branch> CreateBranch([FromBody] Branch branch)
        {
            try
            {
                if (branch == null)
                {
                    return BadRequest("Branch data is null.");
                }

                _branchService.CreateBranch(branch);
                return CreatedAtAction(nameof(GetBranchById), new { id = branch.BranchId }, branch);
            }
            catch (Exception ex)
            {
                // Handle the exception (logging, etc.)
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<Branch> UpdateBranch(int id, [FromBody] Branch branch)
        {
            try
            {
                if (id != branch.BranchId)
                {
                    return BadRequest("Branch ID mismatch.");
                }

                var updatedBranch = _branchService.GetBranchById(id);
                if (updatedBranch == null)
                {
                    return NotFound($"Branch with ID {id} not found.");
                }

                _branchService.UpdateBranch(branch);
                return Ok(branch);
            }
            catch (Exception ex)
            {
                // Handle the exception (logging, etc.)
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBranch(int id)
        {
            try
            {
                var branch = _branchService.GetBranchById(id);
                if (branch == null)
                {
                    return NotFound($"Branch with ID {id} not found.");
                }

                _branchService.DeleteBranch(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                // Handle the exception (logging, etc.)
                return StatusCode(500, ex.Message);
            }
        }
    }
}
