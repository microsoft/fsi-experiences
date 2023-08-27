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
    public enum msfsi_documentrequestState
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
    [Microsoft.Xrm.Sdk.Client.EntityLogicalNameAttribute("msfsi_documentrequest")]
    public partial class msfsi_documentrequest : Microsoft.Xrm.Sdk.Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {

        /// <summary>
        /// Default Constructor.
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode()]
        public msfsi_documentrequest() :
                base(EntityLogicalName)
        {
        }

        public const string EntityLogicalName = "msfsi_documentrequest";

        public const string EntitySchemaName = "msfsi_documentrequest";

        public const string PrimaryIdAttribute = "msfsi_documentrequestid";

        public const string PrimaryNameAttribute = "msfsi_name";

        public const string EntityLogicalCollectionName = "msfsi_documentrequests";

        public const string EntitySetName = "msfsi_documentrequests";

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
        /// Polymorphic lookup to the context entity of the document request.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_context")]
        public Microsoft.Xrm.Sdk.EntityReference msfsi_context
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_context");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_context");
                this.SetAttributeValue("msfsi_context", value);
                this.OnPropertyChanged("msfsi_context");
            }
        }

        /// <summary>
        /// Brief description for document request
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
        /// Lookup to the actual document record
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_document")]
        public Microsoft.Xrm.Sdk.EntityReference msfsi_document
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_document");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_document");
                this.SetAttributeValue("msfsi_document", value);
                this.OnPropertyChanged("msfsi_document");
            }
        }

        /// <summary>
        /// Lookup to document definition table which provide relevant metadata regarding the document type
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_documentdefinition")]
        public Microsoft.Xrm.Sdk.EntityReference msfsi_documentdefinition
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_documentdefinition");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_documentdefinition");
                this.SetAttributeValue("msfsi_documentdefinition", value);
                this.OnPropertyChanged("msfsi_documentdefinition");
            }
        }

        /// <summary>
        /// Unique identifier for entity instances
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_documentrequestid")]
        public System.Nullable<System.Guid> msfsi_documentrequestId
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<System.Nullable<System.Guid>>("msfsi_documentrequestid");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_documentrequestId");
                this.SetAttributeValue("msfsi_documentrequestid", value);
                if (value.HasValue)
                {
                    base.Id = value.Value;
                }
                else
                {
                    base.Id = System.Guid.Empty;
                }
                this.OnPropertyChanged("msfsi_documentrequestId");
            }
        }

        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_documentrequestid")]
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
                this.msfsi_documentrequestId = value;
            }
        }

        /// <summary>
        /// A flag on whether the document request has an automatic flow or not.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_hasautomaticflow")]
        public System.Nullable<bool> msfsi_hasautomaticflow
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<System.Nullable<bool>>("msfsi_hasautomaticflow");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_hasautomaticflow");
                this.SetAttributeValue("msfsi_hasautomaticflow", value);
                this.OnPropertyChanged("msfsi_hasautomaticflow");
            }
        }

        /// <summary>
        /// Boolean whether the document was updated automatically or not.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_isautoupdated")]
        public System.Nullable<bool> msfsi_isautoupdated
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<System.Nullable<bool>>("msfsi_isautoupdated");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_isautoupdated");
                this.SetAttributeValue("msfsi_isautoupdated", value);
                this.OnPropertyChanged("msfsi_isautoupdated");
            }
        }

        /// <summary>
        /// Lookup to the last pipeline which was executed for the current document.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_latestpipeline")]
        public Microsoft.Xrm.Sdk.EntityReference msfsi_latestpipeline
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_latestpipeline");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_latestpipeline");
                this.SetAttributeValue("msfsi_latestpipeline", value);
                this.OnPropertyChanged("msfsi_latestpipeline");
            }
        }

        /// <summary>
        /// 
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
        /// Polymorphic lookup to the entity which is associated with the document.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_regarding")]
        public Microsoft.Xrm.Sdk.EntityReference msfsi_regarding
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_regarding");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_regarding");
                this.SetAttributeValue("msfsi_regarding", value);
                this.OnPropertyChanged("msfsi_regarding");
            }
        }

        /// <summary>
        /// The status of the document whether it's In review, missing, rejected or approved.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_state")]
        public virtual msfsi_Documentstate? msfsi_state
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return ((msfsi_Documentstate?)(EntityOptionSetEnum.GetEnum(this, "msfsi_state")));
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_state");
                this.SetAttributeValue("msfsi_state", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
                this.OnPropertyChanged("msfsi_state");
            }
        }

        /// <summary>
        /// The date on which the document status was updated.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_stateupdatedon")]
        public System.Nullable<System.DateTime> msfsi_stateupdatedon
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<System.Nullable<System.DateTime>>("msfsi_stateupdatedon");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_stateupdatedon");
                this.SetAttributeValue("msfsi_stateupdatedon", value);
                this.OnPropertyChanged("msfsi_stateupdatedon");
            }
        }

        /// <summary>
        /// The date on which the document was uploaded.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_uploadedon")]
        public System.Nullable<System.DateTime> msfsi_uploadedon
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<System.Nullable<System.DateTime>>("msfsi_uploadedon");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_uploadedon");
                this.SetAttributeValue("msfsi_uploadedon", value);
                this.OnPropertyChanged("msfsi_uploadedon");
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
        /// Status of the Document request
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statecode")]
        public System.Nullable<Microsoft.CloudForFSI.Tables.msfsi_documentrequestState> StateCode
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                Microsoft.Xrm.Sdk.OptionSetValue optionSet = this.GetAttributeValue<Microsoft.Xrm.Sdk.OptionSetValue>("statecode");
                if ((optionSet != null))
                {
                    return ((Microsoft.CloudForFSI.Tables.msfsi_documentrequestState)(System.Enum.ToObject(typeof(Microsoft.CloudForFSI.Tables.msfsi_documentrequestState), optionSet.Value)));
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
        /// Reason for the status of the Document request
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("statuscode")]
        public virtual msfsi_documentrequest_StatusCode? StatusCode
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return ((msfsi_documentrequest_StatusCode?)(EntityOptionSetEnum.GetEnum(this, "statuscode")));
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
        /// N:1 msfsi_documentrequest_poly_msfsi_application
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_context")]
        [Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_documentrequest_poly_msfsi_application")]
        public Microsoft.CloudForFSI.Tables.msfsi_application msfsi_documentrequest_poly_msfsi_application
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_application>("msfsi_documentrequest_poly_msfsi_application", null);
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_documentrequest_poly_msfsi_application");
                this.SetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_application>("msfsi_documentrequest_poly_msfsi_application", null, value);
                this.OnPropertyChanged("msfsi_documentrequest_poly_msfsi_application");
            }
        }

        /// <summary>
        /// N:1 msfsi_documentrequest_poly_msfsi_relatedpartycontract
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_regarding")]
        [Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_documentrequest_poly_msfsi_relatedpartycontract")]
        public Microsoft.CloudForFSI.Tables.msfsi_relatedpartycontract msfsi_documentrequest_poly_msfsi_relatedpartycontract
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_relatedpartycontract>("msfsi_documentrequest_poly_msfsi_relatedpartycontract", null);
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_documentrequest_poly_msfsi_relatedpartycontract");
                this.SetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_relatedpartycontract>("msfsi_documentrequest_poly_msfsi_relatedpartycontract", null, value);
                this.OnPropertyChanged("msfsi_documentrequest_poly_msfsi_relatedpartycontract");
            }
        }

        /// <summary>
        /// N:1 msfsi_msfsi_documentrequest_document_msfsi_docu
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_document")]
        [Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_msfsi_documentrequest_document_msfsi_docu")]
        public Microsoft.CloudForFSI.Tables.msfsi_document msfsi_msfsi_documentrequest_document_msfsi_docu
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_document>("msfsi_msfsi_documentrequest_document_msfsi_docu", null);
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_msfsi_documentrequest_document_msfsi_docu");
                this.SetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_document>("msfsi_msfsi_documentrequest_document_msfsi_docu", null, value);
                this.OnPropertyChanged("msfsi_msfsi_documentrequest_document_msfsi_docu");
            }
        }

        /// <summary>
        /// N:1 msfsi_msfsi_documentrequest_documentdefinition_
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_documentdefinition")]
        [Microsoft.Xrm.Sdk.RelationshipSchemaNameAttribute("msfsi_msfsi_documentrequest_documentdefinition_")]
        public Microsoft.CloudForFSI.Tables.msfsi_documentdefinition msfsi_msfsi_documentrequest_documentdefinition_
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_documentdefinition>("msfsi_msfsi_documentrequest_documentdefinition_", null);
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_msfsi_documentrequest_documentdefinition_");
                this.SetRelatedEntity<Microsoft.CloudForFSI.Tables.msfsi_documentdefinition>("msfsi_msfsi_documentrequest_documentdefinition_", null, value);
                this.OnPropertyChanged("msfsi_msfsi_documentrequest_documentdefinition_");
            }
        }

        /// <summary>
        /// Constructor for populating via LINQ queries given a LINQ anonymous type
        /// <param name="anonymousType">LINQ anonymous type.</param>
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode()]
        public msfsi_documentrequest(object anonymousType) :
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
                        Attributes["msfsi_documentrequestid"] = base.Id;
                        break;
                    case "msfsi_documentrequestid":
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