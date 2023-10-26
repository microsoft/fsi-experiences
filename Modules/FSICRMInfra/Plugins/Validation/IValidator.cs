namespace Microsoft.CloudForFSI.Infra.Plugins.Validation
{
    public interface IValidator<TModel>
    {
        IValidator<TModel> AddRule<TRule>() where TRule : IValidationRule<TModel>, new();

        IValidator<TModel> AddRule(IValidationRule<TModel> rule);

        PluginResult Validate(TModel model);
    }
}
