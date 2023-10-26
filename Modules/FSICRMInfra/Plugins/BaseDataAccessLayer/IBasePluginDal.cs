using Microsoft.Xrm.Sdk;

namespace Microsoft.CloudForFSI.Infra.Plugins
{

    public interface IBasePluginDal : IBaseDal
    {
        bool TryGetTarget(out EntityReference value);
        bool TryGetTarget<T>(out T value) where T : Entity;
        bool TryGetPreImage<T>(string name, out T value) where T : Entity;
    }
}
