using carManagement.Interface;
using carManagement.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace carManagement.Controllers
{
    //[ApiController]
    [Route("/api/Roles")]
    public class RoleController : ControllerBase
    {
        private readonly IRole _roleService;

        public RoleController(IRole roleService)
        {
            _roleService = roleService;
        }

        // GET: api/role
        [HttpGet("Allroles")]
        public ActionResult<IEnumerable<Role>> GetAllRoles()
        {
            var roles = _roleService.GetAllRoles();
            return Ok(roles);
        }

        // GET: api/role/{id}
        [HttpGet("{id}")]
        public ActionResult<Role> GetRoleById(int id)
        {
            try
            {
                var role = _roleService.GetRoleById(id);
                return Ok(role);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // POST: api/role
        [HttpPost]
        public ActionResult<Role> CreateRole([FromBody] Role role)
        {
            if (role == null)
            {
                return BadRequest("Role object is null");
            }

            try
            {
                _roleService.CreateRole(role);
                return CreatedAtAction(nameof(GetRoleById), new { id = role.RoleId }, role);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT: api/role/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateRole(int id, [FromBody] Role role)
        {
            if (role == null || role.RoleId != id)
            {
                return BadRequest("Role object is null or ID mismatch");
            }

            try
            {
                _roleService.UpdateRole(role);
                return Ok(role);
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

        // DELETE: api/role/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteRole(int id)
        {
            try
            {
                _roleService.DeleteRole(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
