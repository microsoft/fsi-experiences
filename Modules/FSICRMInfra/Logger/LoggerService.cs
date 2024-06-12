namespace Microsoft.CloudForFSI.Infra.Logger
{
    using Newtonsoft.Json;
    using System;
    using System.Diagnostics;
    using Xrm.Sdk;
    using Xrm.Sdk.PluginTelemetry;

    public class LoggerService : ILoggerService
    {
        private readonly ILogger logger;

        public LoggerService(IServiceProvider serviceProvider)
        {
            this.logger = (serviceProvider.GetService(typeof(ILogger)) as ILogger ??
                           throw new InvalidPluginExecutionException("Failed to get ILogger."));
        }

        public void LogError(string message, int errorCode = (int)FSIErrorCodes.FSIErrorCode_UnexpectedError, Exception e = null)
        {
            this.logger.AddCustomProperty(Constants.ErrorCodePropertyName, errorCode.ToString());
            if (e == null)
            {
                this.logger.LogError(message);
                return;
            }

            this.logger.LogError(e, message);
        }

        public void LogInformation(string message, string activityName)
        {
            this.logger.Execute(message, () => { });
        }

        public void LogWarning(string message)
        {
            this.logger.LogWarning(message);
        }

        public void AddCustomProperty(string propertyName, string propertyValue)
        {
            this.logger.AddCustomProperty(propertyName, propertyValue);
        }

        public Stopwatch StartTimedOperation()
        {
            Stopwatch timer = new Stopwatch();
            timer.Start();
            return timer;
        }

        public void StopTimedOpertaion(Stopwatch timer, string operationName)
        {
            timer.Stop();
            this.logger.Execute($"Operation: {operationName}, Time: {timer.ElapsedMilliseconds}", () => { });
            timer.Reset();
        }

        public void LogInsight(InsightObject insight)
        {
            LogInformation(JsonConvert.SerializeObject(insight), null);
        }
    }

    public class InsightObject
    {
        public InsightObject(
            string feature,
            Guid user,
            object additionalData,
            bool isImpression = false,
            bool isInteraction = false,
            bool isAction = false)
        {
            this.feature = feature;
            this.isImpression= isImpression;
            this.isInteraction = isInteraction;
            this.isAction = isAction;
            this.user = user;
            this.additionalData = additionalData;
        }

        public string feature { get; private set; }
        public bool isImpression { get; private set; }
        public bool isInteraction { get; private set; }
        public bool isAction { get; private set; }
        public Guid user { get; private set; }
        public object additionalData { get; private set; }
    }
}
