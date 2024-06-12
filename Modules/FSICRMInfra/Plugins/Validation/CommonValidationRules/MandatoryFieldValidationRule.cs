namespace Microsoft.CloudForFSI.Infra.Plugins.Validation.CommonValidationRules
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class MandatoryFieldValidationRule<T> : IValidationRule<T>
    {
        private readonly string fieldName;

        public MandatoryFieldValidationRule(string fieldName)
        {
            this.fieldName = fieldName;
        }

        public string ErrorMessage => $"{fieldName} mandatory field is null";

        public bool Validate(T model)
        {
            var fieldValue = model.GetType().GetField(fieldName)?.GetValue(model);
            return fieldValue != null;
        }
    }
}
