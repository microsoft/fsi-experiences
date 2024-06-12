namespace Microsoft.CloudForFSI.Infra.Plugins
{
    public class PluginResult
    {
        protected PluginResult(bool success, string error, FSIErrorCodes errorCode, string errorFileName, object[] stringArgs)
        {                       
            Success = success;
            ErrorMessage = error;
            ErrorCode = errorCode;
            ErrorFileName = errorFileName;
            StringArgs = stringArgs;
        }

        public PluginResult(string error)
        {
            Success = string.IsNullOrWhiteSpace(error);
            ErrorMessage = error;           
        }

        public bool Success { get; }
        public string ErrorMessage { get; }
        public FSIErrorCodes ErrorCode { get; }
        public string ErrorFileName { get; }
        public object[] StringArgs { get;}

        public bool IsFailure => !Success;

        public static PluginResult Fail(string message, FSIErrorCodes errorCode, string errorFileName, object[] stringArgs = null)
        {
            return new PluginResult(false, message ,errorCode, errorFileName, stringArgs);
        }

        public static PluginResult<T> Fail<T>(string message, FSIErrorCodes errorCode, string errorFileName, object[] stringArgs = null)
        {
            return new PluginResult<T>(default, false, message, errorCode, errorFileName, stringArgs);
        }

        public static PluginResult Ok()
        {
            return new PluginResult(true, string.Empty, FSIErrorCodes.FSIErrorCode_NoError, string.Empty, null);
        }

        public static PluginResult<T> Ok<T>(T value)
        {
            return new PluginResult<T>(value, true, string.Empty, FSIErrorCodes.FSIErrorCode_NoError, string.Empty, null);
        }
    }

    public class PluginResult<T> : PluginResult
    {
        protected internal PluginResult(T value, bool success, string error, FSIErrorCodes errorCode, string errorFileName, object[] stringArgs)
            : base(success, error, errorCode, errorFileName, stringArgs)
        {
            Value = value;
        }

        public T Value { get; set; }
    }
}
