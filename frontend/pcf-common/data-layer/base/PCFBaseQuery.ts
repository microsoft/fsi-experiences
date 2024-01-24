export const getContactQuery = (contactId: string, fields: string[]): string => {
    return `
        <fetch top="1" >
            <entity name="contact" >
                ${fields.map(field => `<attribute name="${field}" />`)}              
                <filter>
                    <condition attribute="contactid" operator="eq" value="${contactId}" />
                </filter>
            </entity>
        </fetch>
        `;
};
