export const getCategoryConfigQuery = (): string => {
    return `<fetch>
                <entity name="msfsi_lifemomentcategoryconfig" >
                <attribute name="msfsi_categorycode" />
                <attribute name="createdby" />
                <attribute name="msfsi_lifemomentcategoryconfigid" />
                <attribute name="msfsi_displayorder" />
                <attribute name="msfsi_icon" />
                <attribute name="msfsi_name" />
                <link-entity name="msfsi_categorytypesrelations" from="msfsi_lifemomentcategoryconfigurations" to="msfsi_lifemomentcategoryconfigid" link-type="inner" >
                    <attribute name="msfsi_lifemomenttypeconfigurationsname" />
                    <attribute name="msfsi_lifemomentcategoryconfigurationsname" />
                    <link-entity name="msfsi_lifemomenttypeconfig" from="msfsi_lifemomenttypeconfigid" to="msfsi_lifemomenttypeconfigurations" >
                    <attribute name="msfsi_name" />
                    <attribute name="msfsi_lifemomenttypeconfigid" />
                    <attribute name="msfsi_typecode" />
                    <attribute name="msfsi_displayorder" />
                    </link-entity>
                </link-entity>
                </entity>
            </fetch>`;
};

export const getLifeEventsQuery = (contactId: string): string => {
    return `<fetch>
                <entity name="msfsi_lifemoment" >
                    <attribute name="msfsi_lifemomentid" />
                    <attribute name="msfsi_lifemomentcategory" />
                    <attribute name="msfsi_lifemomenttype" />
                    <attribute name="msfsi_lifemomentdate" />
                    <attribute name="msfsi_lifemomenttitle" />
                    <attribute name="msfsi_modifiedon" />
                    <attribute name="createdon" />
                    <attribute name="msfsi_contact" />
                    <filter>
                        <condition attribute="msfsi_contact" operator="eq" value="${contactId}" />
                    </filter>
                </entity>
            </fetch>`;
};

export const getLifeEventsFinancialGoalsQuery = (contactId: string): string => {
    return `<fetch>
                <entity name="msfsi_lifemoment" >
                    <attribute name="msfsi_lifemomentid" />
                    <attribute name="msfsi_lifemomentcategory" />
                    <attribute name="msfsi_lifemomenttype" />
                    <attribute name="msfsi_lifemomentdate" />
                    <attribute name="msfsi_lifemomenttitle" />
                    <attribute name="msfsi_modifiedon" />
                    <attribute name="createdon" />
                    <attribute name="msfsi_contact" />
                    <filter>
                        <condition attribute="msfsi_contact" operator="eq" value="${contactId}" />
                    </filter>
                    <link-entity name="msfsi_financialgoal" from="msfsi_lifeevent" to="msfsi_lifemomentid" link-type="outer" alias="FG" >
                        <attribute name="msfsi_name" />
                        <attribute name="msfsi_financialgoalid" />
                        <attribute name="msfsi_iscompleted" />
                        <attribute name="msfsi_progressvaluedefault" />
                        <attribute name="msfsi_targetdate" />
                        <attribute name="msfsi_targetvaluedefault" />
                    </link-entity>
                </entity>
            </fetch>`;
};

export const getLifeEventsFinancialGoalsQueryByLifeEventId = (lifeEventId: string): string => {
    return `<fetch>
                <entity name="msfsi_lifemoment" >
                    <attribute name="msfsi_lifemomentid" />
                    <attribute name="msfsi_lifemomentcategory" />
                    <attribute name="msfsi_lifemomenttype" />
                    <attribute name="msfsi_lifemomentdate" />
                    <attribute name="msfsi_lifemomenttitle" />
                    <attribute name="msfsi_modifiedon" />
                    <attribute name="createdon" />
                    <attribute name="msfsi_contact" />
                    <filter>
                        <condition attribute="msfsi_lifemomentid" operator="eq" value="${lifeEventId}" />
                    </filter>
                    <link-entity name="msfsi_financialgoal" from="msfsi_lifeevent" to="msfsi_lifemomentid" link-type="outer" alias="FG" >
                        <attribute name="msfsi_name" />
                        <attribute name="msfsi_financialgoalid" />
                        <attribute name="msfsi_iscompleted" />
                        <attribute name="msfsi_progressvaluedefault" />
                        <attribute name="msfsi_targetdate" />
                        <attribute name="msfsi_targetvaluedefault" />
                    </link-entity>
                </entity>
            </fetch>`;
};
