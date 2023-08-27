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
    public enum msfsi_applicationliabilityState
    {

        [System.Runtime.Serialization.EnumMemberAttribute()]
        Active = 0,

        [System.Runtime.Serialization.EnumMemberAttribute()]
        Inactive = 1,
    }

    /// <summary>
    /// Liability associated with the application.
    /// </summary>
    [System.Runtime.Serialization.DataContractAttribute()]
    [Microsoft.Xrm.Sdk.Client.EntityLogicalNameAttribute("msfsi_applicationliability")]
    public partial class msfsi_applicationliability : Microsoft.Xrm.Sdk.Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {

        /// <summary>
        /// Default Constructor.
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode()]
        public msfsi_applicationliability() :
                base(EntityLogicalName)
        {
        }

        public const string EntityLogicalName = "msfsi_applicationliability";

        public const string EntitySchemaName = "msfsi_applicationliability";

        public const string PrimaryIdAttribute = "msfsi_applicationliabilityid";

        public const string PrimaryNameAttribute = "msfsi_name";

        public const string EntityLogicalCollectionName = "msfsi_applicationliabilities";

        public const string EntitySetName = "msfsi_applicationliabilities";

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
        /// Account number for the liability held in financial institution.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_accountnumber")]
        public string msfsi_accountnumber
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_accountnumber");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_accountnumber");
                this.SetAttributeValue("msfsi_accountnumber", value);
                this.OnPropertyChanged("msfsi_accountnumber");
            }
        }

        /// <summary>
        /// A reference to the application entity.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_application")]
        public Microsoft.Xrm.Sdk.EntityReference msfsi_application
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_application");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_application");
                this.SetAttributeValue("msfsi_application", value);
                this.OnPropertyChanged("msfsi_application");
            }
        }

        /// <summary>
        /// Unique identifier for entity instances.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_applicationliabilityid")]
        public System.Nullable<System.Guid> msfsi_applicationliabilityId
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<System.Nullable<System.Guid>>("msfsi_applicationliabilityid");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_applicationliabilityId");
                this.SetAttributeValue("msfsi_applicationliabilityid", value);
                if (value.HasValue)
                {
                    base.Id = value.Value;
                }
                else
                {
                    base.Id = System.Guid.Empty;
                }
                this.OnPropertyChanged("msfsi_applicationliabilityId");
            }
        }

        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_applicationliabilityid")]
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
                this.msfsi_applicationliabilityId = value;
            }
        }

        /// <summary>
        /// The amount of outstanding balance owed on this liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_balance")]
        public Microsoft.Xrm.Sdk.Money msfsi_balance
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_balance");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_balance");
                this.SetAttributeValue("msfsi_balance", value);
                this.OnPropertyChanged("msfsi_balance");
            }
        }

        /// <summary>
        /// Value of the Balance in base currency.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_balance_base")]
        public Microsoft.Xrm.Sdk.Money msfsi_balance_Base
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_balance_base");
            }
        }

        /// <summary>
        /// Display value shows the balance of the liability as a positive value. That is, a liability with an accounting value of -500 will appear as 500.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_balancedisplayvalue")]
        public Microsoft.Xrm.Sdk.Money msfsi_balancedisplayvalue
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_balancedisplayvalue");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_balancedisplayvalue");
                this.SetAttributeValue("msfsi_balancedisplayvalue", value);
                this.OnPropertyChanged("msfsi_balancedisplayvalue");
            }
        }

        /// <summary>
        /// Value of the Balance display value in base currency.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_balancedisplayvalue_base")]
        public Microsoft.Xrm.Sdk.Money msfsi_balancedisplayvalue_Base
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_balancedisplayvalue_base");
            }
        }

        /// <summary>
        /// The bank to which a particular liability is owed.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_bank")]
        public Microsoft.Xrm.Sdk.EntityReference msfsi_bank
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_bank");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_bank");
                this.SetAttributeValue("msfsi_bank", value);
                this.OnPropertyChanged("msfsi_bank");
            }
        }

        /// <summary>
        /// The city where this liability is located.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_city")]
        public string msfsi_city
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_city");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_city");
                this.SetAttributeValue("msfsi_city", value);
                this.OnPropertyChanged("msfsi_city");
            }
        }

        /// <summary>
        /// The country or region where this liability is located.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_countryregion")]
        public string msfsi_countryregion
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_countryregion");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_countryregion");
                this.SetAttributeValue("msfsi_countryregion", value);
                this.OnPropertyChanged("msfsi_countryregion");
            }
        }

        /// <summary>
        /// Description of the liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_description")]
        public string msfsi_description
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_description");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_description");
                this.SetAttributeValue("msfsi_description", value);
                this.OnPropertyChanged("msfsi_description");
            }
        }

        /// <summary>
        /// When true, indicates that the liability will be paid off at or before closing.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_ispayoffpending")]
        public System.Nullable<bool> msfsi_ispayoffpending
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<System.Nullable<bool>>("msfsi_ispayoffpending");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_ispayoffpending");
                this.SetAttributeValue("msfsi_ispayoffpending", value);
                this.OnPropertyChanged("msfsi_ispayoffpending");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_liabilitytype")]
        public Microsoft.Xrm.Sdk.EntityReference msfsi_liabilitytype
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_liabilitytype");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_liabilitytype");
                this.SetAttributeValue("msfsi_liabilitytype", value);
                this.OnPropertyChanged("msfsi_liabilitytype");
            }
        }

        /// <summary>
        /// The dollar amount of the monthly payment required on this particular liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_monthlypaymentamount")]
        public Microsoft.Xrm.Sdk.Money msfsi_monthlypaymentamount
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_monthlypaymentamount");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_monthlypaymentamount");
                this.SetAttributeValue("msfsi_monthlypaymentamount", value);
                this.OnPropertyChanged("msfsi_monthlypaymentamount");
            }
        }

        /// <summary>
        /// The amount of the monthly payment required on this application liability, in base currency.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_monthlypaymentamount_base")]
        public Microsoft.Xrm.Sdk.Money msfsi_monthlypaymentamount_Base
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.Money>("msfsi_monthlypaymentamount_base");
            }
        }

        /// <summary>
        /// The name of the liability listed on the application.
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
        /// The number of remaining months owed to satisfy this liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_remainingtermsmonths")]
        public System.Nullable<int> msfsi_remainingtermsmonths
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<System.Nullable<int>>("msfsi_remainingtermsmonths");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_remainingtermsmonths");
                this.SetAttributeValue("msfsi_remainingtermsmonths", value);
                this.OnPropertyChanged("msfsi_remainingtermsmonths");
            }
        }

        /// <summary>
        /// The state or province of the primary address related to this application liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_stateprovince")]
        public string msfsi_stateprovince
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_stateprovince");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_stateprovince");
                this.SetAttributeValue("msfsi_stateprovince", value);
                this.OnPropertyChanged("msfsi_stateprovince");
            }
        }

        /// <summary>
        /// The first line of the address related to this real estate liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_street1")]
        public string msfsi_Street1
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_street1");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_Street1");
                this.SetAttributeValue("msfsi_street1", value);
                this.OnPropertyChanged("msfsi_Street1");
            }
        }

        /// <summary>
        /// The second line of the address related to this real estate liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_street2")]
        public string msfsi_Street2
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_street2");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_Street2");
                this.SetAttributeValue("msfsi_street2", value);
                this.OnPropertyChanged("msfsi_Street2");
            }
        }

        /// <summary>
        /// The third line of the address related to this real estate liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_street3")]
        public string msfsi_Street3
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_street3");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_Street3");
                this.SetAttributeValue("msfsi_street3", value);
                this.OnPropertyChanged("msfsi_Street3");
            }
        }

        /// <summary>
        /// The ZIP Code or postal code for the primary address related to this liability listed in the application.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_zippostalcode")]
        public string msfsi_zippostalcode
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_zippostalcode");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_zippostalcode");
                this.SetAttributeValue("msfsi_zippostalcode", value);
                this.OnPropertyChanged("msfsi_zippostalcode");
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
        /// Status of the Application Liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statecode")]
        public System.Nullable<Microsoft.CloudForFSI.Tables.msfsi_applicationliabilityState> StateCode
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                Microsoft.Xrm.Sdk.OptionSetValue optionSet = this.GetAttributeValue<Microsoft.Xrm.Sdk.OptionSetValue>("statecode");
                if ((optionSet != null))
                {
                    return ((Microsoft.CloudForFSI.Tables.msfsi_applicationliabilityState)(System.Enum.ToObject(typeof(Microsoft.CloudForFSI.Tables.msfsi_applicationliabilityState), optionSet.Value)));
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
        /// Reason for the status of the Application Liability.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statuscode")]
        public virtual msfsi_applicationliability_StatusCode? StatusCode
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return ((msfsi_applicationliability_StatusCode?)(EntityOptionSetEnum.GetEnum(this, "statuscode")));
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
        /// 1:N msfsi_appcontactliability_appliability
        /// </summary>
        [Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_appcontactliability_appliability")]
        public System.Collections.Generic.IEnumerable<Microsoft.CloudForFSI.Tables.msfsi_applicationcontactliability> msfsi_appcontactliability_appliability
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetRelatedEntities<Microsoft.CloudForFSI.Tables.msfsi_applicationcontactliability>("msfsi_appcontactliability_appliability", null);
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_appcontactliability_appliability");
                this.SetRelatedEntities<Microsoft.CloudForFSI.Tables.msfsi_applicationcontactliability>("msfsi_appcontactliability_appliability", null, value);
                this.OnPropertyChanged("msfsi_appcontactliability_appliability");
            }
        }

        /// <summary>
        /// 1:N msfsi_applicationexpense_poly_msfsi_applicationliability
        /// </summary>
        [Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_applicationexpense_poly_msfsi_applicationliability")]
        public System.Collections.Generic.IEnumerable<Microsoft.CloudForFSI.Tables.msfsi_applicationexpense> msfsi_applicationexpense_poly_msfsi_applicationliability
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetRelatedEntities<Microsoft.CloudForFSI.Tables.msfsi_applicationexpense>("msfsi_applicationexpense_poly_msfsi_applicationliability", null);
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_applicationexpense_poly_msfsi_applicationliability");
                this.SetRelatedEntities<Microsoft.CloudForFSI.Tables.msfsi_applicationexpense>("msfsi_applicationexpense_poly_msfsi_applicationliability", null, value);
                this.OnPropertyChanged("msfsi_applicationexpense_poly_msfsi_applicationliability");
            }
        }

        /// <summary>
        /// N:1 msfsi_applicationliability_application
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_application")]
        [Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_applicationliability_application")]
        public Microsoft.CloudForFSI.Tables.msfsi_application msfsi_applicationliability_application
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_application>("msfsi_applicationliability_application", null);
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_applicationliability_application");
                this.SetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_application>("msfsi_applicationliability_application", null, value);
                this.OnPropertyChanged("msfsi_applicationliability_application");
            }
        }

        /// <summary>
        /// N:1 msfsi_msfsi_applicationliability_liabilitytype_
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_liabilitytype")]
        [Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_msfsi_applicationliability_liabilitytype_")]
        public Microsoft.CloudForFSI.Tables.msfsi_onboardingfinancialtype msfsi_msfsi_applicationliability_liabilitytype_
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_onboardingfinancialtype>("msfsi_msfsi_applicationliability_liabilitytype_", null);
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_msfsi_applicationliability_liabilitytype_");
                this.SetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_onboardingfinancialtype>("msfsi_msfsi_applicationliability_liabilitytype_", null, value);
                this.OnPropertyChanged("msfsi_msfsi_applicationliability_liabilitytype_");
            }
        }

        /// <summary>
        /// Constructor for populating via LINQ queries given a LINQ anonymous type
        /// <param name="anonymousType">LINQ anonymous type.</param>
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode()]
        public msfsi_applicationliability(object anonymousType) :
                this()
        {
            foreach (var p in anonymousType.GetType().GetProperties())
            {
                var value = p.GetValue(anonymousType, null);
                var name = p.Name.ToLower();

                if (name.EndsWith("enum") && value.GetType().BaseType == typeof(System.Enum))
                {
                    value = new Microsoft.Xrm.Sdk.OptionSetValue((int)value);
                    name = name.Remove(name.Length - "enum".Length);
                }

                switch (name)
                {
                    case "id":
                        base.Id = (System.Guid)value;
                        Attributes["msfsi_applicationliabilityid"] = base.Id;
                        break;
                    case "msfsi_applicationliabilityid":
                        var id = (System.Nullable<System.Guid>)value;
                        if (id == null)
                        { continue; }
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