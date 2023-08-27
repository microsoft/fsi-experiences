﻿//------------------------------------------------------------------------------
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
	/// <summary>
	/// Resource that has capacity which can be allocated to work.
	/// </summary>
	[System.Runtime.Serialization.DataContractAttribute()]
	[Microsoft.Xrm.Sdk.Client.EntityLogicalNameAttribute("bookableresource")]
	[System.CodeDom.Compiler.GeneratedCodeAttribute("CrmSvcUtil", "9.1.0.45")]
	public partial class BookableResource : Microsoft.Xrm.Sdk.Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
	{
		
		/// <summary>
		/// Default Constructor.
		/// </summary>
		[System.Diagnostics.DebuggerNonUserCode()]
		public BookableResource() : 
				base(EntityLogicalName)
		{
		}
		
		public const string EntityLogicalName = "bookableresource";
		
		public const string EntitySchemaName = "BookableResource";
		
		public const string PrimaryIdAttribute = "bookableresourceid";
		
		public const string PrimaryNameAttribute = "name";
		
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
		/// Select the account that represents this resource.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("accountid")]
		public Microsoft.Xrm.Sdk.EntityReference AccountId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("accountid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("AccountId");
				this.SetAttributeValue("accountid", value);
				this.OnPropertyChanged("AccountId");
			}
		}
		
		/// <summary>
		/// Unique identifier of the resource.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("bookableresourceid")]
		public System.Nullable<System.Guid> BookableResourceId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.Guid>>("bookableresourceid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("BookableResourceId");
				this.SetAttributeValue("bookableresourceid", value);
				if (value.HasValue)
				{
					base.Id = value.Value;
				}
				else
				{
					base.Id = System.Guid.Empty;
				}
				this.OnPropertyChanged("BookableResourceId");
			}
		}
		
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("bookableresourceid")]
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
				this.BookableResourceId = value;
			}
		}
		
		/// <summary>
		/// Specifies the working days and hours of the resource.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("calendarid")]
		public Microsoft.Xrm.Sdk.EntityReference CalendarId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("calendarid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("CalendarId");
				this.SetAttributeValue("calendarid", value);
				this.OnPropertyChanged("CalendarId");
			}
		}
		
		/// <summary>
		/// Select the contact that represents this resource.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("contactid")]
		public Microsoft.Xrm.Sdk.EntityReference ContactId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("contactid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("ContactId");
				this.SetAttributeValue("contactid", value);
				this.OnPropertyChanged("ContactId");
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
		/// Exchange rate for the currency associated with the bookableresource with respect to the base currency.
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
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_derivecapacity")]
		public System.Nullable<bool> msdyn_DeriveCapacity
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<bool>>("msdyn_derivecapacity");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_DeriveCapacity");
				this.SetAttributeValue("msdyn_derivecapacity", value);
				this.OnPropertyChanged("msdyn_DeriveCapacity");
			}
		}
		
		/// <summary>
		/// Specify if this resource should be enabled for availablity search.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_displayonscheduleassistant")]
		public System.Nullable<bool> msdyn_DisplayOnScheduleAssistant
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<bool>>("msdyn_displayonscheduleassistant");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_DisplayOnScheduleAssistant");
				this.SetAttributeValue("msdyn_displayonscheduleassistant", value);
				this.OnPropertyChanged("msdyn_DisplayOnScheduleAssistant");
			}
		}
		
		/// <summary>
		/// Specify if this resource should be displayed on the schedule board.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_displayonscheduleboard")]
		public System.Nullable<bool> msdyn_DisplayOnScheduleBoard
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<bool>>("msdyn_displayonscheduleboard");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_DisplayOnScheduleBoard");
				this.SetAttributeValue("msdyn_displayonscheduleboard", value);
				this.OnPropertyChanged("msdyn_DisplayOnScheduleBoard");
			}
		}
		
		/// <summary>
		/// Enable appointments to display on the new schedule board and be considered in availability search for resources.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_enableappointments")]
		public virtual msdyn_enableappointmentsoption? msdyn_EnableAppointments
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msdyn_enableappointmentsoption?)(EntityOptionSetEnum.GetEnum(this, "msdyn_enableappointments")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_EnableAppointments");
				this.SetAttributeValue("msdyn_enableappointments", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("msdyn_EnableAppointments");
			}
		}
		
		/// <summary>
		/// This only applies when directly calling the API. It does not apply when the Book button is clicked on the Schedule Board or on any schedulable entity.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_enableoutlookschedules")]
		public virtual msdyn_enableappointmentsoption? msdyn_EnableOutlookSchedules
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msdyn_enableappointmentsoption?)(EntityOptionSetEnum.GetEnum(this, "msdyn_enableoutlookschedules")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_EnableOutlookSchedules");
				this.SetAttributeValue("msdyn_enableoutlookschedules", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("msdyn_EnableOutlookSchedules");
			}
		}
		
		/// <summary>
		/// Shows the default ending location type when booking daily schedules for this resource.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_endlocation")]
		public virtual msdyn_WorkStartLocationType? msdyn_EndLocation
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msdyn_WorkStartLocationType?)(EntityOptionSetEnum.GetEnum(this, "msdyn_endlocation")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_EndLocation");
				this.SetAttributeValue("msdyn_endlocation", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("msdyn_EndLocation");
			}
		}
		
		/// <summary>
		/// 
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_generictype")]
		public virtual msdyn_generictype? msdyn_GenericType
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msdyn_generictype?)(EntityOptionSetEnum.GetEnum(this, "msdyn_generictype")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_GenericType");
				this.SetAttributeValue("msdyn_generictype", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("msdyn_GenericType");
			}
		}
		
		/// <summary>
		/// Organizational Unit that resource belong to
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_organizationalunit")]
		public Microsoft.Xrm.Sdk.EntityReference msdyn_organizationalunit
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msdyn_organizationalunit");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_organizationalunit");
				this.SetAttributeValue("msdyn_organizationalunit", value);
				this.OnPropertyChanged("msdyn_organizationalunit");
			}
		}
		
		/// <summary>
		/// Select whether the pool is an account, contact, user, equipment or a facility of resources.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_pooltype")]
		public virtual System.Collections.Generic.IEnumerable<msdyn_PoolType> msdyn_PoolType
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return EntityOptionSetEnum.GetMultiEnum<msdyn_PoolType>(this, "msdyn_pooltype");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_PoolType");
				this.SetAttributeValue("msdyn_pooltype", EntityOptionSetEnum.GetMultiEnum(this, "msdyn_pooltype", value));
				this.OnPropertyChanged("msdyn_PoolType");
			}
		}
		
		/// <summary>
		/// 
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_primaryemail")]
		public string msdyn_PrimaryEMail
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<string>("msdyn_primaryemail");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_PrimaryEMail");
				this.SetAttributeValue("msdyn_primaryemail", value);
				this.OnPropertyChanged("msdyn_PrimaryEMail");
			}
		}
		
		/// <summary>
		/// Shows the default starting location type when booking daily schedules for this resource.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_startlocation")]
		public virtual msdyn_WorkStartLocationType? msdyn_StartLocation
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((msdyn_WorkStartLocationType?)(EntityOptionSetEnum.GetEnum(this, "msdyn_startlocation")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_StartLocation");
				this.SetAttributeValue("msdyn_startlocation", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("msdyn_StartLocation");
			}
		}
		
		/// <summary>
		/// Shows the target utilization for the resource.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_targetutilization")]
		public System.Nullable<int> msdyn_targetutilization
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<int>>("msdyn_targetutilization");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_targetutilization");
				this.SetAttributeValue("msdyn_targetutilization", value);
				this.OnPropertyChanged("msdyn_targetutilization");
			}
		}
		
		/// <summary>
		/// 
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_isavailableonline")]
		public System.Nullable<bool> msfsi_isavailableonline
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<bool>>("msfsi_isavailableonline");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_isavailableonline");
				this.SetAttributeValue("msfsi_isavailableonline", value);
				this.OnPropertyChanged("msfsi_isavailableonline");
			}
		}
		
		/// <summary>
		/// Type the name of the resource.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("name")]
		public string Name
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<string>("name");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("Name");
				this.SetAttributeValue("name", value);
				this.OnPropertyChanged("Name");
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
		/// Contains the id of the process associated with the entity.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("processid")]
		public System.Nullable<System.Guid> ProcessId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.Guid>>("processid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("ProcessId");
				this.SetAttributeValue("processid", value);
				this.OnPropertyChanged("ProcessId");
			}
		}
		
		/// <summary>
		/// Select whether the resource is a user, equipment, contact, account, generic resource or a group of resources.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("resourcetype")]
		public virtual BookableResource_ResourceType? ResourceType
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((BookableResource_ResourceType?)(EntityOptionSetEnum.GetEnum(this, "resourcetype")));
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("ResourceType");
				this.SetAttributeValue("resourcetype", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
				this.OnPropertyChanged("ResourceType");
			}
		}
		
		/// <summary>
		/// Contains the id of the stage where the entity is located.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("stageid")]
		public System.Nullable<System.Guid> StageId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<System.Guid>>("stageid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("StageId");
				this.SetAttributeValue("stageid", value);
				this.OnPropertyChanged("StageId");
			}
		}
		
		/// <summary>
		/// Status of the Bookable Resource
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statecode")]
		public System.Nullable<BookableResourceState> StateCode
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				Microsoft.Xrm.Sdk.OptionSetValue optionSet = this.GetAttributeValue<Microsoft.Xrm.Sdk.OptionSetValue>("statecode");
				if ((optionSet != null))
				{
					return ((BookableResourceState)(System.Enum.ToObject(typeof(BookableResourceState), optionSet.Value)));
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
		/// Reason for the status of the Bookable Resource
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statuscode")]
		public virtual BookableResource_StatusCode? StatusCode
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return ((BookableResource_StatusCode?)(EntityOptionSetEnum.GetEnum(this, "statuscode")));
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
		/// Specifies the timezone for the resource's working hours.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("timezone")]
		public System.Nullable<int> TimeZone
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<System.Nullable<int>>("timezone");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("TimeZone");
				this.SetAttributeValue("timezone", value);
				this.OnPropertyChanged("TimeZone");
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
		/// Exchange rate for the currency associated with the BookableResource with respect to the base currency.
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
		/// A comma separated list of string values representing the unique identifiers of stages in a Business Process Flow Instance in the order that they occur.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("traversedpath")]
		public string TraversedPath
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<string>("traversedpath");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("TraversedPath");
				this.SetAttributeValue("traversedpath", value);
				this.OnPropertyChanged("TraversedPath");
			}
		}
		
		/// <summary>
		/// Select the user who represents this resource.
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("userid")]
		public Microsoft.Xrm.Sdk.EntityReference UserId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("userid");
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("UserId");
				this.SetAttributeValue("userid", value);
				this.OnPropertyChanged("UserId");
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
		/// 1:N msfsi_contactresource_bookableresource
		/// </summary>
		[Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_contactresource_bookableresource")]
		public System.Collections.Generic.IEnumerable<msfsi_contactresource> msfsi_contactresource_bookableresource
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetRelatedEntities<msfsi_contactresource>("msfsi_contactresource_bookableresource", null);
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msfsi_contactresource_bookableresource");
				this.SetRelatedEntities<msfsi_contactresource>("msfsi_contactresource_bookableresource", null, value);
				this.OnPropertyChanged("msfsi_contactresource_bookableresource");
			}
		}
		
		/// <summary>
		/// N:1 contact_bookableresource_ContactId
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("contactid")]
		[Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("contact_bookableresource_ContactId")]
		public Contact contact_bookableresource_ContactId
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetRelatedEntity<Contact>("contact_bookableresource_ContactId", null);
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("contact_bookableresource_ContactId");
				this.SetRelatedEntity<Contact>("contact_bookableresource_ContactId", null, value);
				this.OnPropertyChanged("contact_bookableresource_ContactId");
			}
		}
		
		/// <summary>
		/// N:1 msdyn_msdyn_organizationalunit_bookableresource_organizationalunit
		/// </summary>
		[Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msdyn_organizationalunit")]
		[Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msdyn_msdyn_organizationalunit_bookableresource_organizationalunit")]
		public msdyn_organizationalunit msdyn_msdyn_organizationalunit_bookableresource_organizationalunit
		{
			[System.Diagnostics.DebuggerNonUserCode()]
			get
			{
				return this.GetRelatedEntity<msdyn_organizationalunit>("msdyn_msdyn_organizationalunit_bookableresource_organizationalunit", null);
			}
			[System.Diagnostics.DebuggerNonUserCode()]
			set
			{
				this.OnPropertyChanging("msdyn_msdyn_organizationalunit_bookableresource_organizationalunit");
				this.SetRelatedEntity<msdyn_organizationalunit>("msdyn_msdyn_organizationalunit_bookableresource_organizationalunit", null, value);
				this.OnPropertyChanged("msdyn_msdyn_organizationalunit_bookableresource_organizationalunit");
			}
		}
		
		/// <summary>
		/// Constructor for populating via LINQ queries given a LINQ anonymous type
		/// <param name="anonymousType">LINQ anonymous type.</param>
		/// </summary>
		[System.Diagnostics.DebuggerNonUserCode()]
		public BookableResource(object anonymousType) : 
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
                        Attributes["bookableresourceid"] = base.Id;
                        break;
                    case "bookableresourceid":
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
