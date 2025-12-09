namespace TestSuiteApi.Models;

public class TestSuite
{
    public string Id { get; set; } = string.Empty;
    public Metadata Metadata { get; set; } = new();
    public FeatureInformation FeatureInformation { get; set; } = new();
    public PreSetup PreSetup { get; set; } = new();
    public ExecutionMatrix ExecutionMatrix { get; set; } = new();
    public List<Prerequisite> Prerequisites { get; set; } = new();
    public List<TestVariableCategory> TestVariables { get; set; } = new();
    public List<TestScenario> TestScenarios { get; set; } = new();
}

public class Metadata
{
    public string Title { get; set; } = string.Empty;
    public string Feature { get; set; } = string.Empty;
    public string CreatedBy { get; set; } = string.Empty;
    public string DateCreated { get; set; } = string.Empty;
    public string LastUpdated { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}

public class FeatureInformation
{
    public string Feature { get; set; } = string.Empty;
    public List<string> Details { get; set; } = new();
}

public class PreSetup
{
    public string Purpose { get; set; } = string.Empty;
    public List<string> TenantSetup { get; set; } = new();
    public List<UserAccount> UserAccounts { get; set; } = new();
    public List<string> ChecklistItems { get; set; } = new();
}

public class UserAccount
{
    public string Prerequisite { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Notes { get; set; } = string.Empty;
}

public class ExecutionMatrix
{
    public string Important { get; set; } = string.Empty;
    public List<MatrixRow> Matrix { get; set; } = new();
    public List<string> Instructions { get; set; } = new();
    public List<string> ExecutionFlow { get; set; } = new();
}

public class MatrixRow
{
    public string UserType { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
    public string VariableSet { get; set; } = string.Empty;
    public string ExecutionStatus { get; set; } = string.Empty;
}

public class Prerequisite
{
    public string Id { get; set; } = string.Empty;
    public string DataObject { get; set; } = string.Empty;
    public List<string> Steps { get; set; } = new();
}

public class TestVariableCategory
{
    public string Category { get; set; } = string.Empty;
    public List<TestVariable> Variables { get; set; } = new();
}

public class TestVariable
{
    public string Name { get; set; } = string.Empty;
    public string ActualValue { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
}

public class TestScenario
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<TestCase> TestCases { get; set; } = new();
}

public class TestCase
{
    public string TestId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string PrerequisiteReference { get; set; } = string.Empty;
    public List<string> ActionSteps { get; set; } = new();
    public List<string> ExpectedResult { get; set; } = new();
    public string Notes { get; set; } = string.Empty;
}

public class TestSuiteListItem
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Feature { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string LastUpdated { get; set; } = string.Empty;
}

