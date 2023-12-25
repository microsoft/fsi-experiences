namespace Microsoft.CloudForFSI.Infra.Logger
{
    using LoggingMock;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public sealed class LoggerServiceMock : ILoggerService
    {
        private readonly LoggerMock logger;
        private static LoggerServiceMock instance = null;

        private LoggerServiceMock()
        {
            this.logger = new LoggerMock();
        }

        public static LoggerServiceMock Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new LoggerServiceMock();
                }

                return instance;
            }
        }

        public void LogInformation(string message, string context)
        {
            this.logger.LogInformation(message, context);
        }

        public void LogError(string message, int errorCode, Exception e = null)
        {
            this.logger.AddCustomProperty(Constants.ErrorCodePropertyName, errorCode.ToString());
            this.logger.LogError(message, e);
        }

        public void LogWarning(string message)
        {
            this.logger.LogWarning(message);
        }

        public void AddCustomProperty(string propertyName, string propertyValue)
        {
            this.logger.AddCustomProperty(propertyName, propertyValue);
        }

        public List<string> DumpTraces()
        {
            return this.logger.DumpTraces();
        }

        public static void Reset()
        {
            instance = null;
        }

        public Stopwatch StartTimedOperation() 
        {
            return new Stopwatch();
        }

        public void StopTimedOpertaion(Stopwatch timer, string operationName) { }

        public void LogInsight(InsightObject insight)
        {
            LogInformation(JsonConvert.SerializeObject(insight), null);
        }
    }
}
