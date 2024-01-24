namespace Microsoft.CloudForFSI.Infra
{
    using System.Collections.Generic;
    using Xrm.Sdk;
    using Xrm.Sdk.Query;

    public class EntityRetrievalServices
    {
        // Source: https://promx.net/en/2020/02/working-with-more-than-5000-records-in-dynamics-365/
        public static List<Entity> RetrieveAllRecords(IOrganizationService service, QueryExpression query)
        {
            var pageNumber = 1;
            var pagingCookie = string.Empty;
            var result = new List<Entity>();
            EntityCollection response;
            do
            {
                if (pageNumber != 1)
                {
                    query.PageInfo.PageNumber = pageNumber;
                    query.PageInfo.PagingCookie = pagingCookie;
                }

                response = service.RetrieveMultiple(query);
                if (response.MoreRecords)
                {
                    pageNumber++;
                    pagingCookie = response.PagingCookie;
                }

                result.AddRange(response.Entities);
            }
            while (response.MoreRecords);

            return result;
        }
    }
}
