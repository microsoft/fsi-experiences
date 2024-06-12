namespace Microsoft.CloudForFSI.Infra.Plugins.Validation
{    
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class Validator<TModel> : IValidator<TModel>
    {
        private readonly List<Func<TModel, string>> validators = new List<Func<TModel, string>>();

        public IValidator<TModel> AddRule<TRule>() where TRule : IValidationRule<TModel>, new()
        {
            var rule = (IValidationRule<TModel>)Activator.CreateInstance(typeof(TRule));
            AddRuleInternal(rule.Validate, rule.ErrorMessage);
            return this;
        }

        public IValidator<TModel> AddRule(IValidationRule<TModel> rule)
        {
            AddRuleInternal(rule.Validate, rule.ErrorMessage);
            return this;
        }

        protected void AddRuleInternal(Func<TModel, bool> validator, string errorMessage) =>
            validators.Add((model) => validator(model) ? null : errorMessage);

        public PluginResult Validate(TModel model)
        {
            return new PluginResult(
                validators
                    .Select(validate => validate(model))
                    .FirstOrDefault(error => error != null));
        }
    }
}
