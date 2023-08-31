namespace Microsoft.CloudForFSI.Tables
{
    using Microsoft.Xrm.Sdk;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;

    public static class EntitiesUtil
    {
        public static string GetAttributeLogicalName<T>(this string propertyName) where T : Entity
        {
            var property = typeof(T).GetProperty(propertyName);
            var logicalNameAttribute = property.GetAttribute<AttributeLogicalNameAttribute>();
            return logicalNameAttribute?.LogicalName;
        }

        public static string GetRelationshipSchemaName<T>(this string propertyName) where T : Entity
        {
            var property = typeof(T).GetProperty(propertyName);
            var logicalNameAttribute = property.GetAttribute<RelationshipSchemaNameAttribute>();
            return logicalNameAttribute?.SchemaName;
        }

        private static T GetAttribute<T>(this PropertyInfo propertyInfo) where T : Attribute
        {
            return propertyInfo?.GetCustomAttributes(typeof(T), false).First() as T;
        }

        private static string GetOptionSetMetadataAttribute<T>(this string propertyName) where T : Enum
        {
            var optionSetMetaDataAttribute = typeof(T).GetMember(propertyName)
                ?.Where(member => member.MemberType == MemberTypes.Field)
                ?.FirstOrDefault()
                ?.GetCustomAttribute(typeof(OptionSetMetadataAttribute), false)
                as OptionSetMetadataAttribute;
            return optionSetMetaDataAttribute?.Name;
        }

        public static Entity GetExpando<T>(this Enum value) where T : Enum
        {
            if (value == null)
                return null;
            var expando = new Entity();
            expando["Value"] = Convert.ToInt32(value);
            expando["Label"] = value.ToString().GetOptionSetMetadataAttribute<T>();
            return expando;
        }

        private static string DefaultEntityNameForEmptyCollectionResult = Contact.EntityLogicalName;

        public static EntityCollection ToCollectionWithDefaultEntityWhenEmpty(this EntityCollection entityCollection)
        {
            //There is a bug in dynamics where you can't return an empty entity collection without stating the entity name.
            //Hence, we use this wrapper to return a collection for the Contact entity (which is always in the system),
            //if an API response param of type EntityCollection is empty.
            //https://github.com/MicrosoftDocs/dynamics-365-customer-engagement/issues/689
            if (entityCollection?.Entities?.Count == 0)
            {
                entityCollection = new EntityCollection
                {
                    EntityName = DefaultEntityNameForEmptyCollectionResult //A placeholder for an entity that is definately in the system
                };
            }

            return entityCollection;
        }

        public static EntityCollection ToEntityCollection(this IList<Entity> entityList)
        {
            var outputParamCollection = new EntityCollection(entityList);
            return outputParamCollection.ToCollectionWithDefaultEntityWhenEmpty();
        }
    }
}
