namespace Microsoft.CloudForFSI.Infra.Plugins.Validation.CommonValidationRules
{
    using System.Collections.Generic;

    public class GuidArrayParametersValidationRule<T> : IValidationRule<T>
    {
        private readonly string fieldName;
        private readonly bool isMandatoryParam;

        public GuidArrayParametersValidationRule(string fieldName, bool isMandatoryParam)
        {
            this.fieldName = fieldName;
            this.isMandatoryParam = isMandatoryParam;
        }

        public string ErrorMessage => $"{fieldName} is not a valid Guid array";

        public bool Validate(T model)
        {
            var fieldValue = model.GetType().GetField(fieldName).GetValue(model) as List<string>;
            return ((isMandatoryParam == false && fieldValue == null) || ValidationConstants.IsGuidList(fieldValue));
        }
    }
}
