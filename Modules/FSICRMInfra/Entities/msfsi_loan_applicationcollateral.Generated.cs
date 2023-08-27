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
	public enum msfsi_loan_applicationcollateralState
	{
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		Active = 0,
		
		[System.Runtime.Serialization.EnumMemberAttribute()]
		Inactive = 1,
	}
	
	/// <summary>
	/// Collateral associated with the loan application.
	/// </summary>
	[System.Runtime.Serialization.DataContractAttribute()]
	[Microsoft.Xrm.Sdk.Client.EntityLogicalNameAttribute("msfsi_loan_applicationcollateral")]
	public partial class msfsi_loan_applicationcollateral : Microsoft.Xrm.Sdk.Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
	{
		
		/// <summary>
		/// Default Constructor.
		/// </summary>
		[System.Diagnostics.DebuggerNonUserCode()]
		public msfsi_loan_applicationcollateral() : 
				base(EntityLogicalName)
		{
		}
		
		public const string EntityLogicalName = "msfsi_loan_applicationcollateral";
		
		public const string EntitySchemaName = "msfsi_loan_applicationcollateral";
		
		public const string PrimaryIdAttribute = "msfsi_loan_applicationcollateralid";
		
		public const string PrimaryNameAttribute = "msfsi_name";
		
		public const string EntityLogicalCollectionName = "msfsi_loan_applicationcollaterals";
		
		public const string EntitySetName = "msfsi_loan_applicationcollaterals";
		
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
		/// The amount of an existing liens on an item of collateral.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_amountexisitingliens")]
		public Microsoft.Xrm.Sdk.Money msfsi_amountexisitingliens
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_amountexisitingliens");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_amountexisitingliens");
				this.SetAttributeValue("msfsi_amountexisitingliens", value);
				this.OnPropertyChanged("msfsi_amountexisitingliens");
			}
		}
		
		/// <summary>
		/// Amount of an exisiting liens on a collateral, in base currency.
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
		/// The collateral offered for the loan application.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_applicationcollateral")]
		public Microsoft.Xrm.Sdk.EntityReference msfsi_applicationcollateral
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_applicationcollateral");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_applicationcollateral");
				this.SetAttributeValue("msfsi_applicationcollateral", value);
				this.OnPropertyChanged("msfsi_applicationcollateral");
			}
		}
		
		/// <summary>
		/// Is the collateral valid from a legal perspective for this loan application?.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_islegalchecksuccessful")]
		public System.Nullable<bool> msfsi_islegalchecksuccessful
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<bool>>("msfsi_islegalchecksuccessful");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_islegalchecksuccessful");
				this.SetAttributeValue("msfsi_islegalchecksuccessful", value);
				this.OnPropertyChanged("msfsi_islegalchecksuccessful");
			}
		}
		
		/// <summary>
		/// Specifies the completion date of the last legal check.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_legalcheckcompletiondate")]
		public System.Nullable<System.DateTime> msfsi_legalcheckcompletiondate
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.DateTime>>("msfsi_legalcheckcompletiondate");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_legalcheckcompletiondate");
				this.SetAttributeValue("msfsi_legalcheckcompletiondate", value);
				this.OnPropertyChanged("msfsi_legalcheckcompletiondate");
			}
		}
		
		/// <summary>
		/// Legal description of this collateral.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_legaldescription")]
		public string msfsi_legaldescription
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<string>("msfsi_legaldescription");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_legaldescription");
				this.SetAttributeValue("msfsi_legaldescription", value);
				this.OnPropertyChanged("msfsi_legaldescription");
			}
		}
		
		/// <summary>
		/// The type of the lien.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_lientype")]
		public virtual msfsi_loan_applicationcollateral_msfsi_lientype? msfsi_lientype
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msfsi_loan_applicationcollateral_msfsi_lientype?)(EntityOptionSetEnum.GetEnum(this, "msfsi_lientype")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_lientype");
				this.SetAttributeValue("msfsi_lientype", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("msfsi_lientype");
			}
		}
		
		/// <summary>
		/// Unique identifier for entity instances.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loan_applicationcollateralid")]
		public System.Nullable<System.Guid> msfsi_loan_applicationcollateralId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.Guid>>("msfsi_loan_applicationcollateralid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_loan_applicationcollateralId");
				this.SetAttributeValue("msfsi_loan_applicationcollateralid", value);
				if (value.HasValue)
				{
					base.Id = value.Value;
				}
				else
				{
					base.Id = System.Guid.Empty;
				}
				this.OnPropertyChanged("msfsi_loan_applicationcollateralId");
			}
		}
		
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loan_applicationcollateralid")]
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
				this.msfsi_loan_applicationcollateralId = value;
			}
		}
		
		/// <summary>
		/// The loan application associated with this collateral.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loanapplication")]
		public Microsoft.Xrm.Sdk.EntityReference msfsi_loanapplication
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_loanapplication");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_loanapplication");
				this.SetAttributeValue("msfsi_loanapplication", value);
				this.OnPropertyChanged("msfsi_loanapplication");
			}
		}
		
		/// <summary>
		/// The valuation of this collateral.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loancollateralvaluation")]
		public Microsoft.Xrm.Sdk.EntityReference msfsi_loancollateralvaluation
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_loancollateralvaluation");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_loancollateralvaluation");
				this.SetAttributeValue("msfsi_loancollateralvaluation", value);
				this.OnPropertyChanged("msfsi_loancollateralvaluation");
			}
		}
		
		/// <summary>
		/// Required name field.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_name")]
		public string msfsi_name
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<string>("msfsi_name");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_name");
				this.SetAttributeValue("msfsi_name", value);
				this.OnPropertyChanged("msfsi_name");
			}
		}
		
		/// <summary>
		/// The date this collateral was purchased.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_purchasedate")]
		public System.Nullable<System.DateTime> msfsi_purchasedate
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.DateTime>>("msfsi_purchasedate");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_purchasedate");
				this.SetAttributeValue("msfsi_purchasedate", value);
				this.OnPropertyChanged("msfsi_purchasedate");
			}
		}
		
		/// <summary>
		/// Usage type for this collateral, if real estate.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_usagetype")]
		public virtual msfsi_loan_applicationcollateral_msfsi_usagetype? msfsi_usagetype
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msfsi_loan_applicationcollateral_msfsi_usagetype?)(EntityOptionSetEnum.GetEnum(this, "msfsi_usagetype")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_usagetype");
				this.SetAttributeValue("msfsi_usagetype", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("msfsi_usagetype");
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
		/// Owner Id.
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
		/// Unique identifier for the business unit that owns the record.
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
		/// Status of the Loan Application Collateral.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statecode")]
		public System.Nullable<Microsoft.CloudForFSI.Tables.msfsi_loan_applicationcollateralState> StateCode
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				Microsoft.Xrm.Sdk.OptionSetValue optionSet = this.GetAttributeValue<Microsoft.Xrm.Sdk.OptionSetValue>("statecode");
				if ((optionSet != null))
				{
					return ((Microsoft.CloudForFSI.Tables.msfsi_loan_applicationcollateralState)(System.Enum.ToObject(typeof(Microsoft.CloudForFSI.Tables.msfsi_loan_applicationcollateralState), optionSet.Value)));
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
		/// Reason for the status of the Loan Application Collateral.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statuscode")]
		public virtual msfsi_loan_applicationcollateral_StatusCode? StatusCode
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msfsi_loan_applicationcollateral_StatusCode?)(EntityOptionSetEnum.GetEnum(this, "statuscode")));
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
		/// N:1 msfsi_msfsi_loan_applicationcollateral_loanappl
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_loanapplication")]
		[Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_msfsi_loan_applicationcollateral_loanappl")]
		public Microsoft.CloudForFSI.Tables.msfsi_application msfsi_msfsi_loan_applicationcollateral_loanappl
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_application>("msfsi_msfsi_loan_applicationcollateral_loanappl", null);
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_msfsi_loan_applicationcollateral_loanappl");
				this.SetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_application>("msfsi_msfsi_loan_applicationcollateral_loanappl", null, value);
				this.OnPropertyChanged("msfsi_msfsi_loan_applicationcollateral_loanappl");
			}
		}
		
		/// <summary>
		/// Constructor for populating via LINQ queries given a LINQ anonymous type
		/// <param name="anonymousType">LINQ anonymous type.</param>
		/// </summary>
		[System.Diagnostics.DebuggerNonUserCode()]
		public msfsi_loan_applicationcollateral(object anonymousType) : 
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
                        Attributes["msfsi_loan_applicationcollateralid"] = base.Id;
                        break;
                    case "msfsi_loan_applicationcollateralid":
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