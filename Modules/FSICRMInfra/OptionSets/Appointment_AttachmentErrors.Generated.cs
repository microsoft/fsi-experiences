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
    public enum Appointment_AttachmentErrors
    {

        [System.Runtime.Serialization.EnumMemberAttribute()]
        [OptionSetMetadataAttribute("None", 0)]
        None = 0,

        [System.Runtime.Serialization.EnumMemberAttribute()]
        [OptionSetMetadataAttribute("The appointment was saved as a Microsoft Dynamics 365 appointment record, but not" +
                                    " all the attachments could be saved with it. An attachment cannot be saved if it" +
                                    " is blocked or if its file type is invalid.", 1)]
        TheappointmentwassavedasaMicrosoftDynamics365appointmentrecordbutnotalltheattachmentscouldbesavedwithitAnattachmentcannotbesavedifitisblockedorifitsfiletypeisinvalid = 1,
    }
}