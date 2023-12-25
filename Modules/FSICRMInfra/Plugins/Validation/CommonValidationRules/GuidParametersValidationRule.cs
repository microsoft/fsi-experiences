namespace Microsoft.CloudForFSI.Infra.Plugins.Validation.CommonValidationRules
{
    public class GuidParametersValidationRule<T> : IValidationRule<T>
    {
        private readonly string fieldName;
        private readonly bool isMandatoryParam;

        public GuidParametersValidationRule(string fieldName, bool isMandatoryParam)
        {
            this.fieldName = fieldName;
            this.isMandatoryParam = isMandatoryParam;
        }

        public string ErrorMessage => $"{fieldName} is not a valid Guid";

        public bool Validate(T model)
        {
            var fieldValue = model.GetType().GetField(fieldName)?.GetValue(model)?.ToString();
            return ((isMandatoryParam == false && fieldValue == null) || ValidationConstants.IsGuidElement(fieldValue));
        }
    }
}
