namespace Microsoft.CloudForFSI.Infra.Plugins.Validation
{
    public interface IValidationRule<TModel>
    {
        string ErrorMessage { get; }
        bool Validate(TModel model);
    }
}
