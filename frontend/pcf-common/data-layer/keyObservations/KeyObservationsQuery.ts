export const buildSegmentQuery = (contactId: string): string => `
    <fetch>
        <entity name="msfsi_cisegment" >
            <attribute name="msfsi_value" />
            <link-entity name="contact" from="contactid" to="msfsi_contact" >
            <filter>
                <condition attribute="contactid" operator="eq" value="${contactId}" />
            </filter>
            </link-entity>
        </entity>
    </fetch>`;

export const buildArtifactMappingQuery = (type: number): string => `
    <fetch>
        <attribute name="msfsi_fsiartifactname" />
        <entity name="msfsi_artifactmapping" >
            <filter>
                <condition attribute="msfsi_fsiartifactname" operator="eq" value="${type}" />
            </filter>
        </entity>
    </fetch>
`;

export const buildIncludeCiQuery = (ciEntity: string): string => `
    <fetch top="2">
        <entity name="entity" >
            <attribute name="name" />
            <filter>
                <condition attribute="logicalname" operator="in">
                    <value>msfsi_artifactmapping</value>
                    <value>${ciEntity}</value>
                </condition>
            </filter>
        </entity>
    </fetch>
`;

export const buildPredictionQuery = (contactId: string, explainFactorsNumber: number): string => `
    <fetch>
        <entity name="msfsi_ciprediction" >
            <attribute name="msfsi_model" />
            <attribute name="msfsi_publisher" />
            <attribute name="msfsi_result" />
            ${new Array(explainFactorsNumber)
                .fill(0)
                .map((_, idx) => `<attribute name="msfsi_expfeature${idx + 1}" />`)
                .join(' ')}

            <link-entity name="contact" from="contactid" to="msfsi_contactid" >
            <filter>
                <condition attribute="contactid" operator="eq" value="${contactId}" />
            </filter>
            </link-entity>
        </entity>
    </fetch>
`;
