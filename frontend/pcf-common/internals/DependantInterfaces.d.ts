declare module CrmFramework {
	enum DayOfWeek {
		Sunday = 0,
		Monday = 1,
		Tuesday = 2,
		Wednesday = 3,
		Thursday = 4,
		Friday = 5,
		Saturday = 6,
	}

	/**
	 * Enumeration for the behavior of date time attributes.
	 */
	const enum DateTimeFieldBehavior {
		/**
		 * Unknown DateTime Behavior
		 */
		None = 0,

		/**
		 * UserLocal. Dates stored as UTC
		 */
		UserLocal = 1,

		/**
		 * DateOnly. Dates with time stored as midnight without conversion to UTC
		 */
		DateOnly = 2,

		/**
		 * Dates and time stored without conversion to UTC
		 */
		TimeZoneIndependent = 3,
	}

	/**
	 * Simple Guid class based on a subset of the source strings supported in System.Guid.
	 * See constructor documentation for details on supported source strings.
	 */
	interface Guid {
		/**
		 * A Guid whose value is guaranteed to be all zeros.
		 */
		get_empty(): CrmFramework.Guid;

		/**
		 * Creates an instance of the object from the specified data.
		 * @param data The data representation of this object.
		 * @returns The new instance.
		 */
		createFromObjectData(data: { [key: string]: any }): CrmFramework.Guid;

		/**
		 * Attempts to create a guid from the given string.  If Guid creation fails, instead of throwing an exception,
		 * this method just returns an empty guid.
		 * @param guidValue The string that contains the GUID value.
		 * @returns The Guid object, or an empty guid if the string is not valid
		 */
		tryCreate(guidValue: string): CrmFramework.Guid;

		/**
		 * Format the source guid to Uppercase with brackets.
		 * @param sourceGuid The source guid from metadata
		 * @returns The formatted Uppercase guid with brackets.
		 * If sourceGuid is null, return null; If sourceGuid is "", return "{}".
		 * Otherwise convert the string to Uppercase and add brackets if it doesn't have
		 * Note: This method will convert a valid Guid with braces and no hyphens to an invalid guid with double braces
		 */
		formatToUpper(sourceGuid: string): string;

		/**
		 * Gets the object data.
		 * @returns The same data.
		 */
		getObjectData(): { [key: string]: any };

		/**
		 * Determines whether the specified object equals this guid
		 * @param obj The object being compared
		 * @returns Whether they are equal
		 */
		equals(obj: any): boolean;

		/**
		 * Returns the hash code for this instance.
		 * @returns A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.
		 */
		getHashCode(): number;

		/**
		 * Generates a UUID/GUID
		 * After version 4 of the RFC UUID, we can create guids from random or pseudo-random numbers.
		 * Entire spec is hosted here:
		 * http://www.ietf.org/rfc/rfc4122.txt
		 * Section 4.4 is the one that concerns this method since we do not have 802
		 * addresses from network cards in js.
		 * Section 4.4:
		 * 4.4.  Algorithms for Creating a UUID from Truly Random or
		 * Pseudo-Random Numbers
		 * The version 4 UUID is meant for generating UUIDs from truly-random or
		 * pseudo-random numbers.
		 * The algorithm is as follows:
		 * o  Set the two most significant bits (bits 6 and 7) of the
		 * clock_seq_hi_and_reserved to zero and one, respectively.
		 * o  Set the four most significant bits (bits 12 through 15) of the
		 * time_hi_and_version field to the 4-bit version number from
		 * Section 4.1.3.
		 * o  Set all the other bits to randomly (or pseudo-randomly) chosen
		 * values.
		 * @returns A guid generated using Math.Random()
		 */
		newGuid(): CrmFramework.Guid;
	}
}

declare module CrmDescriptors {
	const enum DateTimeFormat {
		DateOnly = 0,
		DateAndTime = 1,
	}

	const enum IntegerFormat {
		None = 0,
		Duration = 1,
		TimeZone = 2,
		Language = 3,
		Locale = 4,
	}

	const enum StringFormat {
		Email = 0,
		Text = 1,
		TextArea = 2,
		Url = 3,
		TickerSymbol = 4,
		PhoneticGuide = 5,
		VersionNumber = 6,
		Phone = 7,
	}

	const enum PrivilegeType {
		None = 0,
		Create = 1,
		Read = 2,
		Write = 3,
		Delete = 4,
		Assign = 5,
		Share = 6,
		Append = 7,
		AppendTo = 8,
	}

	const enum AttributeRequiredLevel {
		None = 0,
		SystemRequired = 1,
		ApplicationRequired = 2,
		Recommended = 3,
		Unknown = -1,
	}

	interface SecurityPrivilegeMetadata extends CrmDescriptors.IExtensibleDataObject {
		CanBeBasic: boolean;
		CanBeDeep: boolean;
		CanBeGlobal: boolean;
		CanBeLocal: boolean;
		CanBeEntityReference: boolean;
		CanBeParentEntityReference: boolean;
		Name: string;
		PrivilegeId: string;
		PrivilegeType: CrmDescriptors.PrivilegeType;
	}

	interface ExtensionDataObject {}

	interface IExtensibleDataObject {
		ExtensionData: CrmDescriptors.ExtensionDataObject;
	}
}

declare module CrmStorage {
	/**
	 * An identifier for an entity that contains the id and logical name of the
	 * entity referenced. May also contain a name.
	 */
	interface EntityReference {
		Id: CrmFramework.Guid;
		LogicalName: string;
		Name: string;
		TypeCode: number;
		TypeDisplayName: string;
		TypeName: string;

		/**
		 * A EntityReference with an empty logical name and guid.
		 */
		get_empty(): CrmStorage.EntityReference;

		/**
		 * Gets the unique key associated with this object
		 */
		get_key(): string;

		/**
		 * The id of the referenced entity record
		 */
		get_identifier(): string;

		/**
		 * The model type of the referenced entity
		 */
		get_modelType(): string;

		/**
		 * The display name of the referenced entity
		 */
		get_displayName(): string;

		/**
		 * Creates an instance of the object from the specified data.
		 * @param data The data representation of this object.
		 * @returns The new instance.
		 */
		createFromObjectData(data: { [key: string]: any }): CrmStorage.EntityReference;

		/**
		 * Gets the object data.
		 * @returns The same data.
		 */
		getObjectData(): { [key: string]: any };

		/**
		 * Determines whether the specified object equals this one
		 * @param other The object being compared
		 * @returns Whether they are equal
		 */
		equals(other: any): boolean;

		/**
		 * Returns a hash code for this instance.
		 * @returns A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.
		 */
		getHashCode(): number;

		/**
		 * Get the value of a field.
		 * Members of this class must be capitalized to match Mscrm.EntityReference, so enforce it here for consistency
		 * @param fieldName The field to get the value for.
		 * @returns The value of a field.
		 */
		getValue(fieldName: string): any;

		/**
		 * Set the value of a field.
		 * Members of this class must be capitalized to match Mscrm.EntityReference, so enforce it here for consistency
		 * @param fieldName The field to set the value.
		 * @param value The value to set.
		 */
		setValue(fieldName: string, value: any): void;
	}
}
