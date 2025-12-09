using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;
using TestSuiteApi.Models;

namespace TestSuiteApi.Services;

public interface ITestSuiteService
{
    Task<List<TestSuiteListItem>> GetAllTestSuitesAsync();
    Task<TestSuite?> GetTestSuiteByIdAsync(string id);
}

public class TestSuiteService : ITestSuiteService
{
    private readonly string _testSuitesPath;
    private readonly ILogger<TestSuiteService> _logger;

    public TestSuiteService(IConfiguration configuration, ILogger<TestSuiteService> logger)
    {
        _testSuitesPath = Path.Combine(AppContext.BaseDirectory, "Assets", "TestSuites");
        _logger = logger;
        
        // Create directory if it doesn't exist
        if (!Directory.Exists(_testSuitesPath))
        {
            Directory.CreateDirectory(_testSuitesPath);
        }
    }

    public async Task<List<TestSuiteListItem>> GetAllTestSuitesAsync()
    {
        try
        {
            var yamlFiles = Directory.GetFiles(_testSuitesPath, "*.yaml");
            var testSuites = new List<TestSuiteListItem>();

            foreach (var file in yamlFiles)
            {
                try
                {
                    var content = await File.ReadAllTextAsync(file);
                    var deserializer = new DeserializerBuilder()
                        .WithNamingConvention(CamelCaseNamingConvention.Instance)
                        .Build();
                    
                    var testSuite = deserializer.Deserialize<TestSuite>(content);
                    
                    // Generate ID from filename
                    var id = Path.GetFileNameWithoutExtension(file);
                    
                    testSuites.Add(new TestSuiteListItem
                    {
                        Id = id,
                        Title = testSuite.Metadata.Title,
                        Feature = testSuite.Metadata.Feature,
                        Status = testSuite.Metadata.Status,
                        LastUpdated = testSuite.Metadata.LastUpdated
                    });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error parsing test suite file: {FileName}", file);
                }
            }

            return testSuites.OrderByDescending(t => t.LastUpdated).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving test suites");
            return new List<TestSuiteListItem>();
        }
    }

    public async Task<TestSuite?> GetTestSuiteByIdAsync(string id)
    {
        try
        {
            var filePath = Path.Combine(_testSuitesPath, $"{id}.yaml");
            
            if (!File.Exists(filePath))
            {
                _logger.LogWarning("Test suite file not found: {FilePath}", filePath);
                return null;
            }

            var content = await File.ReadAllTextAsync(filePath);
            var deserializer = new DeserializerBuilder()
                .WithNamingConvention(CamelCaseNamingConvention.Instance)
                .Build();
            
            var testSuite = deserializer.Deserialize<TestSuite>(content);
            testSuite.Id = id;
            
            return testSuite;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving test suite: {Id}", id);
            return null;
        }
    }
}

