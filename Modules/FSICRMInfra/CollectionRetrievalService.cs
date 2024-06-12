namespace Microsoft.CloudForFSI.Infra
{
    using System.Collections.Generic;

    public class CollectionRetrievalService
    {
        public static string TryGetValue(Dictionary<string, string> dictionary, string key)
        {
            string rtVal;
            dictionary.TryGetValue(key, out rtVal);
            return rtVal;
        }
    }
}