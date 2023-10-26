namespace Microsoft.CloudForFSI.Infra.Logger
{
    using System;
    using System.Diagnostics;

    public interface ILoggerService
    {
        void LogInformation(string message, string context);

        void LogError(string message, int errorCode = (int)FSIErrorCodes.FSIErrorCode_UnexpectedError, Exception e = null);

        void LogWarning(string message);

        void AddCustomProperty(string propertyName, string propertyValue);

        Stopwatch StartTimedOperation();

        void StopTimedOpertaion(Stopwatch timer, string operationName);

        void LogInsight(InsightObject insight);
    }
}
