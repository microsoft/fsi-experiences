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
	public enum msfsi_LoanApplication_msfsi_RefinanceType
	{
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("Cash Out", 0)]
		CashOut = 104800000,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("Limited Cash Out", 1)]
		LimitedCashOut = 104800001,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("N/A", 3)]
		NA = 104800003,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("No Cash Out", 2)]
		NoCashOut = 104800002,
	}
}