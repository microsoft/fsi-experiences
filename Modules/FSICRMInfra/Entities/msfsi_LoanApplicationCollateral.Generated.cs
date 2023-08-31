//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace Microsoft.CloudForFSI.Tables
{
	using Microsoft.CloudForFSI.OptionSets;

	[System.Runtime.Serialization.DataContractAttribute()]
	public enum msfsi_LoanApplicationCollateralState
	{
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		Active = 0,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		Inactive = 1,
	}
	
	/// <summary>
	/// 
	/// </summary>
	[System.Runtime.Serialization.DataContractAttribute()]
	[Microsoft.Xrm.Sdk.Client.EntityLogicalNameAttribute("msfsi_loanapplicationcollateral")]
	public partial class msfsi_LoanApplicationCollateral : Microsoft.Xrm.Sdk.Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
	{
		
		/// <summary>
		/// Default Constructor.
		/// </summary>
		[System.Diagnostics.DebuggerNonUserCode()]
		public msfsi_LoanApplicationCollateral() : 
				base(EntityLogicalName)
		{
		}
		
		public const string EntityLogicalName = "msfsi_loanapplicationcollateral";
		
		public const string EntitySchemaName = "msfsi_LoanApplicationCollateral";
		
		public const string PrimaryIdAttribute = "msfsi_loanapplicationcollateralid";
		
		public const string PrimaryNameAttribute = "msfsi_name";
		
		public const string EntityLogicalCollectionName = "msfsi_loanapplicationcollaterals";
		
		public const string EntitySetName = "msfsi_loanapplicationcollaterals";
		
		public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
		
		public event System.ComponentModel.PropertyChangingEventHandler PropertyChanging;
		
		[System.Diagnostics.DebuggerNonUserCode()]
		private void OnPropertyChanged(string propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
			}
		}
		
		[System.Diagnostics.DebuggerNonUserCode()]
		private void OnPropertyChanging(string propertyName)
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, new System.ComponentModel.PropertyChangingEventArgs(propertyName));
			}
		}
		
		/// <summary>
		/// Unique identifier of the user who created the record.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("createdby")]
		public Microsoft.Xrm.Sdk.EntityReference CreatedBy
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("createdby");
			}
		}
		
		/// <summary>
		/// Date and time when the record was created.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("createdon")]
		public System.Nullable<System.DateTime> CreatedOn
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.DateTime>>("createdon");
			}
		}
		
		/// <summary>
		/// Unique identifier of the delegate user who created the record.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("createdonbehalfby")]
		public Microsoft.Xrm.Sdk.EntityReference CreatedOnBehalfBy
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("createdonbehalfby");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("CreatedOnBehalfBy");
				this.SetAttributeValue("createdonbehalfby", value);
				this.OnPropertyChanged("CreatedOnBehalfBy");
			}
		}
		
		/// <summary>
		/// Exchange rate for the currency associated with the entity with respect to the base currency.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("exchangerate")]
		public System.Nullable<decimal> ExchangeRate
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<decimal>>("exchangerate");
			}
		}
		
		/// <summary>
		/// Sequence number of the import that created this record.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("importsequencenumber")]
		public System.Nullable<int> ImportSequenceNumber
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<int>>("importsequencenumber");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("ImportSequenceNumber");
				this.SetAttributeValue("importsequencenumber", value);
				this.OnPropertyChanged("ImportSequenceNumber");
			}
		}
		
		/// <summary>
		/// Unique identifier of the user who modified the record.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("modifiedby")]
		public Microsoft.Xrm.Sdk.EntityReference ModifiedBy
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("modifiedby");
			}
		}
		
		/// <summary>
		/// Date and time when the record was modified.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("modifiedon")]
		public System.Nullable<System.DateTime> ModifiedOn
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.DateTime>>("modifiedon");
			}
		}
		
		/// <summary>
		/// Unique identifier of the delegate user who modified the record.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("modifiedonbehalfby")]
		public Microsoft.Xrm.Sdk.EntityReference ModifiedOnBehalfBy
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("modifiedonbehalfby");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("ModifiedOnBehalfBy");
				this.SetAttributeValue("modifiedonbehalfby", value);
				this.OnPropertyChanged("ModifiedOnBehalfBy");
			}
		}
		
		/// <summary>
		/// 
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_amountexisitingliens")]
		public Microsoft.Xrm.Sdk.Money msfsi_AmountExisitingLiens
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_amountexisitingliens");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_AmountExisitingLiens");
				this.SetAttributeValue("msfsi_amountexisitingliens", value);
				this.OnPropertyChanged("msfsi_AmountExisitingLiens");
			}
		}
		
		/// <summary>
		/// Value of the Amount Exisiting Liens in base currency.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_amountexisitingliens_base")]
		public Microsoft.Xrm.Sdk.Money msfsi_amountexisitingliens_Base
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_amountexisitingliens_base");
			}
		}
		
		/// <summary>
		/// 
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_collateral")]
		public Microsoft.Xrm.Sdk.EntityReference msfsi_Collateral
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_collateral");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_Collateral");
				this.SetAttributeValue("msfsi_collateral", value);
				this.OnPropertyChanged("msfsi_Collateral");
			}
		}
		
		/// <summary>
		/// Is the loan application collateral valid from a legal perspective.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_islegalchecksuccessful")]
		public System.Nullable<bool> msfsi_IsLegalCheckSuccessful
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<bool>>("msfsi_islegalchecksuccessful");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_IsLegalCheckSuccessful");
				this.SetAttributeValue("msfsi_islegalchecksuccessful", value);
				this.OnPropertyChanged("msfsi_IsLegalCheckSuccessful");
			}
		}
		
		/// <summary>
		/// Specifies the completion date of the last legal check.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_legalcheckcompletiondate")]
		public System.Nullable<System.DateTime> msfsi_LegalCheckCompletionDate
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.DateTime>>("msfsi_legalcheckcompletiondate");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_LegalCheckCompletionDate");
				this.SetAttributeValue("msfsi_legalcheckcompletiondate", value);
				this.OnPropertyChanged("msfsi_LegalCheckCompletionDate");
			}
		}
		
		/// <summary>
		/// Legal description of the loan application collateral.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_legaldescription")]
		public string msfsi_LegalDescription
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<string>("msfsi_legaldescription");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_LegalDescription");
				this.SetAttributeValue("msfsi_legaldescription", value);
				this.OnPropertyChanged("msfsi_LegalDescription");
			}
		}
		
		/// <summary>
		/// 
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_lientype")]
		public virtual msfsi_LoanApplicationCollateral_msfsi_Lientype? msfsi_Lientype
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msfsi_LoanApplicationCollateral_msfsi_Lientype?)(EntityOptionSetEnum.GetEnum(this, "msfsi_lientype")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_Lientype");
				this.SetAttributeValue("msfsi_lientype", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("msfsi_Lientype");
			}
		}
		
		/// <summary>
		/// 
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loanapplication")]
		public Microsoft.Xrm.Sdk.EntityReference msfsi_LoanApplication
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_loanapplication");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_LoanApplication");
				this.SetAttributeValue("msfsi_loanapplication", value);
				this.OnPropertyChanged("msfsi_LoanApplication");
			}
		}
		
		/// <summary>
		/// Unique identifier for entity instances
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loanapplicationcollateralid")]
		public System.Nullable<System.Guid> msfsi_LoanApplicationCollateralId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.Guid>>("msfsi_loanapplicationcollateralid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_LoanApplicationCollateralId");
				this.SetAttributeValue("msfsi_loanapplicationcollateralid", value);
				if (value.HasValue)
				{
					base.Id = value.Value;
				}
				else
				{
					base.Id = System.Guid.Empty;
				}
				this.OnPropertyChanged("msfsi_LoanApplicationCollateralId");
			}
		}
		
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loanapplicationcollateralid")]
		public override System.Guid Id
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return base.Id;
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.msfsi_LoanApplicationCollateralId = value;
			}
		}
		
		/// <summary>
		/// The selected valuation of this loan application collateral.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loancollateralvaluation")]
		public Microsoft.Xrm.Sdk.EntityReference msfsi_LoanCollateralValuation
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_loancollateralvaluation");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_LoanCollateralValuation");
				this.SetAttributeValue("msfsi_loancollateralvaluation", value);
				this.OnPropertyChanged("msfsi_LoanCollateralValuation");
			}
		}
		
		/// <summary>
		/// Required name field
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_name")]
		public string msfsi_Name
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<string>("msfsi_name");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_Name");
				this.SetAttributeValue("msfsi_name", value);
				this.OnPropertyChanged("msfsi_Name");
			}
		}
		
		/// <summary>
		/// 
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_originalcost")]
		public Microsoft.Xrm.Sdk.Money msfsi_OriginalCost
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_originalcost");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_OriginalCost");
				this.SetAttributeValue("msfsi_originalcost", value);
				this.OnPropertyChanged("msfsi_OriginalCost");
			}
		}
		
		/// <summary>
		/// Value of the Original Cost in base currency.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_originalcost_base")]
		public Microsoft.Xrm.Sdk.Money msfsi_originalcost_Base
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_originalcost_base");
			}
		}
		
		/// <summary>
		/// 
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_purchasedate")]
		public System.Nullable<System.DateTime> msfsi_PurchaseDate
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.DateTime>>("msfsi_purchasedate");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_PurchaseDate");
				this.SetAttributeValue("msfsi_purchasedate", value);
				this.OnPropertyChanged("msfsi_PurchaseDate");
			}
		}
		
		/// <summary>
		/// Loan application collateral usage type.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_usagetype")]
		public virtual msfsi_LoanApplicationCollateral_msfsi_UsageType? msfsi_UsageType
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msfsi_LoanApplicationCollateral_msfsi_UsageType?)(EntityOptionSetEnum.GetEnum(this, "msfsi_usagetype")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_UsageType");
				this.SetAttributeValue("msfsi_usagetype", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("msfsi_UsageType");
			}
		}
		
		/// <summary>
		/// Date and time that the record was migrated.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("overriddencreatedon")]
		public System.Nullable<System.DateTime> OverriddenCreatedOn
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.DateTime>>("overriddencreatedon");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("OverriddenCreatedOn");
				this.SetAttributeValue("overriddencreatedon", value);
				this.OnPropertyChanged("OverriddenCreatedOn");
			}
		}
		
		/// <summary>
		/// Owner Id
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("ownerid")]
		public Microsoft.Xrm.Sdk.EntityReference OwnerId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("ownerid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("OwnerId");
				this.SetAttributeValue("ownerid", value);
				this.OnPropertyChanged("OwnerId");
			}
		}
		
		/// <summary>
		/// Unique identifier for the business unit that owns the record
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("owningbusinessunit")]
		public Microsoft.Xrm.Sdk.EntityReference OwningBusinessUnit
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("owningbusinessunit");
			}
		}
		
		/// <summary>
		/// Unique identifier for the team that owns the record.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("owningteam")]
		public Microsoft.Xrm.Sdk.EntityReference OwningTeam
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("owningteam");
			}
		}
		
		/// <summary>
		/// Unique identifier for the user that owns the record.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("owninguser")]
		public Microsoft.Xrm.Sdk.EntityReference OwningUser
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("owninguser");
			}
		}
		
		/// <summary>
		/// Status of the Loan Application Collateral
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statecode")]
		public System.Nullable<msfsi_LoanApplicationCollateralState> StateCode
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				Microsoft.Xrm.Sdk.OptionSetValue optionSet = this.GetAttributeValue<Microsoft.Xrm.Sdk.OptionSetValue>("statecode");
				if ((optionSet != null))
				{
					return ((msfsi_LoanApplicationCollateralState)(System.Enum.ToObject(typeof(msfsi_LoanApplicationCollateralState), optionSet.Value)));
				}
				else
				{
					return null;
				}
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("StateCode");
				if ((value == null))
				{
					this.SetAttributeValue("statecode", null);
				}
				else
				{
					this.SetAttributeValue("statecode", new Microsoft.Xrm.Sdk.OptionSetValue(((int)(value))));
				}
				this.OnPropertyChanged("StateCode");
			}
		}
		
		/// <summary>
		/// Reason for the status of the Loan Application Collateral
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statuscode")]
		public virtual msfsi_LoanApplicationCollateral_StatusCode? StatusCode
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msfsi_LoanApplicationCollateral_StatusCode?)(EntityOptionSetEnum.GetEnum(this, "statuscode")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("StatusCode");
				this.SetAttributeValue("statuscode", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("StatusCode");
			}
		}
		
		/// <summary>
		/// For internal use only.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("timezoneruleversionnumber")]
		public System.Nullable<int> TimeZoneRuleVersionNumber
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<int>>("timezoneruleversionnumber");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("TimeZoneRuleVersionNumber");
				this.SetAttributeValue("timezoneruleversionnumber", value);
				this.OnPropertyChanged("TimeZoneRuleVersionNumber");
			}
		}
		
		/// <summary>
		/// Unique identifier of the currency associated with the entity.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("transactioncurrencyid")]
		public Microsoft.Xrm.Sdk.EntityReference TransactionCurrencyId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("transactioncurrencyid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("TransactionCurrencyId");
				this.SetAttributeValue("transactioncurrencyid", value);
				this.OnPropertyChanged("TransactionCurrencyId");
			}
		}
		
		/// <summary>
		/// Time zone code that was in use when the record was created.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("utcconversiontimezonecode")]
		public System.Nullable<int> UTCConversionTimeZoneCode
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<int>>("utcconversiontimezonecode");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("UTCConversionTimeZoneCode");
				this.SetAttributeValue("utcconversiontimezonecode", value);
				this.OnPropertyChanged("UTCConversionTimeZoneCode");
			}
		}
		
		/// <summary>
		/// Version Number
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("versionnumber")]
		public System.Nullable<long> VersionNumber
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<long>>("versionnumber");
			}
		}
		
		/// <summary>
		/// 1:N msfsi_LoanApplicationCollateralValuation_
		/// </summary>
		[Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_LoanApplicationCollateralValuation_")]
		public System.Collections.Generic.IEnumerable<msfsi_LoanApplicationCollateralValuation> msfsi_LoanApplicationCollateralValuation_
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetRelatedEntities<msfsi_LoanApplicationCollateralValuation>("msfsi_LoanApplicationCollateralValuation_", null);
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_LoanApplicationCollateralValuation_");
				this.SetRelatedEntities<msfsi_LoanApplicationCollateralValuation>("msfsi_LoanApplicationCollateralValuation_", null, value);
				this.OnPropertyChanged("msfsi_LoanApplicationCollateralValuation_");
			}
		}
		
		/// <summary>
		/// N:1 msfsi_LoanApplicationCollateral_Collateral
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_collateral")]
		[Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_LoanApplicationCollateral_Collateral")]
		public msfsi_Collateral msfsi_LoanApplicationCollateral_Collateral
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetRelatedEntity<msfsi_Collateral>("msfsi_LoanApplicationCollateral_Collateral", null);
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_LoanApplicationCollateral_Collateral");
				this.SetRelatedEntity<msfsi_Collateral>("msfsi_LoanApplicationCollateral_Collateral", null, value);
				this.OnPropertyChanged("msfsi_LoanApplicationCollateral_Collateral");
			}
		}
		
		/// <summary>
		/// N:1 msfsi_LoanApplicationCollateral_LoanAppli
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loanapplication")]
		[Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_LoanApplicationCollateral_LoanAppli")]
		public msfsi_LoanApplication msfsi_LoanApplicationCollateral_LoanAppli
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetRelatedEntity<msfsi_LoanApplication>("msfsi_LoanApplicationCollateral_LoanAppli", null);
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_LoanApplicationCollateral_LoanAppli");
				this.SetRelatedEntity<msfsi_LoanApplication>("msfsi_LoanApplicationCollateral_LoanAppli", null, value);
				this.OnPropertyChanged("msfsi_LoanApplicationCollateral_LoanAppli");
			}
		}
		
		/// <summary>
		/// N:1 msfsi_LoanApplicationCollateral_LoanColla
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loancollateralvaluation")]
		[Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_LoanApplicationCollateral_LoanColla")]
		public msfsi_LoanApplicationCollateralValuation msfsi_LoanApplicationCollateral_LoanColla
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetRelatedEntity<msfsi_LoanApplicationCollateralValuation>("msfsi_LoanApplicationCollateral_LoanColla", null);
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_LoanApplicationCollateral_LoanColla");
				this.SetRelatedEntity<msfsi_LoanApplicationCollateralValuation>("msfsi_LoanApplicationCollateral_LoanColla", null, value);
				this.OnPropertyChanged("msfsi_LoanApplicationCollateral_LoanColla");
			}
		}
		
		/// <summary>
		/// Constructor for populating via LINQ queries given a LINQ anonymous type
		/// <param name="anonymousType">LINQ anonymous type.</param>
		/// </summary>
		[System.Diagnostics.DebuggerNonUserCode()]
		public msfsi_LoanApplicationCollateral(object anonymousType) : 
				this()
		{
            foreach (var p in anonymousType.GetType().GetProperties())
            {
                var value = p.GetValue(anonymousType, null);
                var name = p.Name.ToLower();
            
                if (name.EndsWith("enum") && value.GetType().BaseType == typeof(System.Enum))
                {
                    value = new Microsoft.Xrm.Sdk.OptionSetValue((int) value);
                    name = name.Remove(name.Length - "enum".Length);
                }
            
                switch (name)
                {
                    case "id":
                        base.Id = (System.Guid)value;
                        Attributes["msfsi_loanapplicationcollateralid"] = base.Id;
                        break;
                    case "msfsi_loanapplicationcollateralid":
                        var id = (System.Nullable<System.Guid>) value;
                        if(id == null){ continue; }
                        base.Id = id.Value;
                        Attributes[name] = base.Id;
                        break;
                    case "formattedvalues":
                        // Add Support for FormattedValues
                        FormattedValues.AddRange((Microsoft.Xrm.Sdk.FormattedValueCollection)value);
                        break;
                    default:
                        Attributes[name] = value;
                        break;
                }
            }
		}
	}
}