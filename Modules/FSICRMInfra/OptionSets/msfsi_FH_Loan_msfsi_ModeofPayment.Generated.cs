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
	public enum msfsi_FH_Loan_msfsi_ModeofPayment
	{
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("check", 3, "#0000ff")]
		check = 104800003,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("checking account", 0, "#0000ff")]
		checkingaccount = 104800000,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("current account", 1, "#0000ff")]
		currentaccount = 104800001,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		[OptionSetMetadataAttribute("fund transfer", 2, "#0000ff")]
		fundtransfer = 104800002,
	}
}