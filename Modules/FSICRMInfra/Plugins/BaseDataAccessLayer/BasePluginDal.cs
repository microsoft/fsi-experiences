using Microsoft.CloudForFSI.Infra.Logger;
using Microsoft.Xrm.Sdk;

namespace Microsoft.CloudForFSI.Infra.Plugins.BaseDataAccessLayer
{

    public class BasePluginDal : BaseDal, IBasePluginDal
    {
        public BasePluginDal(ILoggerService logger, IOrganizationService organizationService, IPluginExecutionContext executionContext)
            : base(logger, organizationService, executionContext) { }

        public bool TryGetTarget(out EntityReference value)
        {
            return executionContext.InputParameters.TryGetValue(Constants.TargetInputParamName, out value);
        }

        public bool TryGetPreImage<T>(string name, out T value) where T : Entity
        {
            if (executionContext.PreEntityImages.TryGetValue(name, out Entity entity))
            {
                value = entity.ToEntity<T>();
                return true;
            }

            value = default(T);
            return false;
        }

        public bool TryGetTarget<T>(out T value) where T : Entity
        {
            if (executionContext.InputParameters.TryGetValue(Constants.TargetInputParamName, out Entity entity))
            {
                value = entity.ToEntity<T>();
                return true;
            }

            value = default(T);
            return false;
        }
    }
}
