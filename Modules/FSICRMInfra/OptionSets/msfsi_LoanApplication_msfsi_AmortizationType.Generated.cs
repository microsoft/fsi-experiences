//------------------------------------------------------------------------------
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
	public enum msfsi_LoanApplication_msfsi_AmortizationType
	{
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("Adjustable Rate", 1)]
		AdjustableRate = 104800001,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("Fixed Rate", 0)]
		FixedRate = 104800000,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("Other", 2)]
		Other = 104800002,
	}
}