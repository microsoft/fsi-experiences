﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Microsoft.CloudForFSI.OptionSets
{
	using Microsoft.CloudForFSI.Tables;

    [System.Runtime.Serialization.DataContractAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("CrmSvcUtil", "9.1.0.45")]
    public enum ActivityParty_InstanceTypeCode
    {

        [System.Runtime.Serialization.EnumMemberAttribute()] [OptionSetMetadataAttribute("Not Recurring", 0)]
        NotRecurring = 0,

        [System.Runtime.Serialization.EnumMemberAttribute()] [OptionSetMetadataAttribute("Recurring Exception", 3)]
        RecurringException = 3,

        [System.Runtime.Serialization.EnumMemberAttribute()]
        [OptionSetMetadataAttribute("Recurring Future Exception", 4)]
        RecurringFutureException = 4,

        [System.Runtime.Serialization.EnumMemberAttribute()] [OptionSetMetadataAttribute("Recurring Instance", 2)]
        RecurringInstance = 2,

        [System.Runtime.Serialization.EnumMemberAttribute()] [OptionSetMetadataAttribute("Recurring Master", 1)]
        RecurringMaster = 1,
    }
}