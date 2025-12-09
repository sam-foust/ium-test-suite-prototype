using Microsoft.AspNetCore.Mvc;
using TestSuiteApi.Models;
using TestSuiteApi.Services;

namespace TestSuiteApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestSuitesController : ControllerBase
{
    private readonly ITestSuiteService _testSuiteService;
    private readonly ILogger<TestSuitesController> _logger;

    public TestSuitesController(ITestSuiteService testSuiteService, ILogger<TestSuitesController> logger)
    {
        _testSuiteService = testSuiteService;
        _logger = logger;
    }

    /// <summary>
    /// Get all test suites (list view)
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<TestSuiteListItem>>> GetAllTestSuites()
    {
        try
        {
            var testSuites = await _testSuiteService.GetAllTestSuitesAsync();
            return Ok(testSuites);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving test suites");
            return StatusCode(500, "An error occurred while retrieving test suites");
        }
    }

    /// <summary>
    /// Get a specific test suite by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<TestSuite>> GetTestSuite(string id)
    {
        try
        {
            var testSuite = await _testSuiteService.GetTestSuiteByIdAsync(id);
            
            if (testSuite == null)
            {
                return NotFound($"Test suite with ID '{id}' not found");
            }
            
            return Ok(testSuite);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving test suite: {Id}", id);
            return StatusCode(500, "An error occurred while retrieving the test suite");
        }
    }
}

