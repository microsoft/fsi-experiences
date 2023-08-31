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

    /// <summary>
    /// Table connecting Customer Insights model predictions to Customers
    /// </summary>
    [System.Runtime.Serialization.DataContractAttribute()]
    [Microsoft.Xrm.Sdk.Client.EntityLogicalNameAttribute("msfsi_ciprediction")]
    public partial class msfsi_ciprediction : Microsoft.Xrm.Sdk.Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {

        /// <summary>
        /// Default Constructor.
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode()]
        public msfsi_ciprediction() :
                base(EntityLogicalName)
        {
        }

        public const string EntityLogicalName = "msfsi_ciprediction";

        public const string EntitySchemaName = "msfsi_ciprediction";

        public const string PrimaryIdAttribute = "msfsi_cipredictionid";

        public const string PrimaryNameAttribute = "msfsi_model";

        public const string EntityLogicalCollectionName = "msfsi_cipredictions";

        public const string EntitySetName = "msfsi_cipredictions";

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
        /// Represents a prediction FSI artifact.
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_artifact")]
        public virtual msfsi_ArtifactSubType? msfsi_artifact
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return ((msfsi_ArtifactSubType?)(EntityOptionSetEnum.GetEnum(this, "msfsi_artifact")));
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_artifact");
                this.SetAttributeValue("msfsi_artifact", value.HasValue ? new Microsoft.Xrm.Sdk.OptionSetValue((int)value) : null);
                this.OnPropertyChanged("msfsi_artifact");
            }
        }

        /// <summary>
        /// Unique identifier for customer insights prediction
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_cipredictionid")]
        public System.Nullable<System.Guid> msfsi_cipredictionId
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<System.Nullable<System.Guid>>("msfsi_cipredictionid");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_cipredictionId");
                this.SetAttributeValue("msfsi_cipredictionid", value);
                if (value.HasValue)
                {
                    base.Id = value.Value;
                }
                else
                {
                    base.Id = System.Guid.Empty;
                }
                this.OnPropertyChanged("msfsi_cipredictionId");
            }
        }

        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_cipredictionid")]
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
                this.msfsi_cipredictionId = value;
            }
        }

        /// <summary>
        /// Contact for which prediction were calculated
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_contactid")]
        public Microsoft.Xrm.Sdk.EntityReference msfsi_contactid
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<Microsoft.Xrm.Sdk.EntityReference>("msfsi_contactid");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_contactid");
                this.SetAttributeValue("msfsi_contactid", value);
                this.OnPropertyChanged("msfsi_contactid");
            }
        }

        /// <summary>
        /// Customer insights internal identifier for customer (Contact or Account)
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_customerid")]
        public string msfsi_Customerid
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_customerid");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_Customerid");
                this.SetAttributeValue("msfsi_customerid", value);
                this.OnPropertyChanged("msfsi_Customerid");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_model")]
        public string msfsi_Model
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_model");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_Model");
                this.SetAttributeValue("msfsi_model", value);
                this.OnPropertyChanged("msfsi_Model");
            }
        }

        /// <summary>
        /// Model version identifier
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_modelsignature")]
        public string msfsi_ModelSignature
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_modelsignature");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_ModelSignature");
                this.SetAttributeValue("msfsi_modelsignature", value);
                this.OnPropertyChanged("msfsi_ModelSignature");
            }
        }

        /// <summary>
        /// Value of the predictive model for the customer (probability)
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_result")]
        public string msfsi_Result
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_result");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_Result");
                this.SetAttributeValue("msfsi_result", value);
                this.OnPropertyChanged("msfsi_Result");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature1")]
        public string msfsi_expfeature1
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature1");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature1");
                this.SetAttributeValue("msfsi_expfeature1", value);
                this.OnPropertyChanged("msfsi_expfeature1");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature10")]
        public string msfsi_expfeature10
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature10");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature10");
                this.SetAttributeValue("msfsi_expfeature10", value);
                this.OnPropertyChanged("msfsi_expfeature10");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature11")]
        public string msfsi_expfeature11
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature11");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature11");
                this.SetAttributeValue("msfsi_expfeature11", value);
                this.OnPropertyChanged("msfsi_expfeature11");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature2")]
        public string msfsi_expfeature2
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature2");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature2");
                this.SetAttributeValue("msfsi_expfeature2", value);
                this.OnPropertyChanged("msfsi_expfeature2");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature3")]
        public string msfsi_expfeature3
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature3");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature3");
                this.SetAttributeValue("msfsi_expfeature3", value);
                this.OnPropertyChanged("msfsi_expfeature3");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature4")]
        public string msfsi_expfeature4
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature4");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature4");
                this.SetAttributeValue("msfsi_expfeature4", value);
                this.OnPropertyChanged("msfsi_expfeature4");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature5")]
        public string msfsi_expfeature5
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature5");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature5");
                this.SetAttributeValue("msfsi_expfeature5", value);
                this.OnPropertyChanged("msfsi_expfeature5");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature6")]
        public string msfsi_expfeature6
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature6");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature6");
                this.SetAttributeValue("msfsi_expfeature6", value);
                this.OnPropertyChanged("msfsi_expfeature6");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature7")]
        public string msfsi_expfeature7
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature7");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature7");
                this.SetAttributeValue("msfsi_expfeature7", value);
                this.OnPropertyChanged("msfsi_expfeature7");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature8")]
        public string msfsi_expfeature8
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature8");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature8");
                this.SetAttributeValue("msfsi_expfeature8", value);
                this.OnPropertyChanged("msfsi_expfeature8");
            }
        }

        /// <summary>
        /// Reflects a factor that influenced the AI model prediction for this customer
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_expfeature9")]
        public string msfsi_expfeature9
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_expfeature9");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_expfeature9");
                this.SetAttributeValue("msfsi_expfeature9", value);
                this.OnPropertyChanged("msfsi_expfeature9");
            }
        }

        /// <summary>
        /// The publisher of the model
        /// </summary>
        [Microsoft.Xrm.Sdk.AttributeLogicalNameAttribute("msfsi_publisher")]
        public string msfsi_publisher
        {
            [System.Diagnostics.DebuggerNonUserCode()]
            get
            {
                return this.GetAttributeValue<string>("msfsi_publisher");
            }
            [System.Diagnostics.DebuggerNonUserCode()]
            set
            {
                this.OnPropertyChanging("msfsi_publisher");
                this.SetAttributeValue("msfsi_publisher", value);
                this.OnPropertyChanged("msfsi_publisher");
            }
        }

        /// <summary>
        /// Constructor for populating via LINQ queries given a LINQ anonymous type
        /// <param name="anonymousType">LINQ anonymous type.</param>
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode()]
        public msfsi_ciprediction(object anonymousType) :
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
                        Attributes["msfsi_cipredictionid"] = base.Id;
                        break;
                    case "msfsi_cipredictionid":
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