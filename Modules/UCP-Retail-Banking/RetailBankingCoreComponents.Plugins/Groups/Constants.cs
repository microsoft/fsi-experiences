namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups
{
    using System;
    using System.Collections.Generic;
    using Infra;
    using Plugins;

    public static class Constants
    {
        public const string InputParameterName = "data";
        public const string OutputParameterName = "result";

        public static readonly IReadOnlyDictionary<Type, string> PluginTypeToMessageNames = new Dictionary<Type, string>
        { 
            { typeof(AddGroupPlugin), GroupConstants.AddGroupMessage },
            { typeof(UpdateGroupPlugin), GroupConstants.UpdateGroupMessage },
            { typeof(DeleteGroupPlugin), GroupConstants.DeleteGroupMessage }
        };
    }
}