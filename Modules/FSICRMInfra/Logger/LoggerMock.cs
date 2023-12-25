namespace Microsoft.CloudForFSI.Infra.LoggingMock
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Xrm.Sdk.PluginTelemetry;

    public class LoggerMock : ILogger
    {
        private readonly List<string> eventsList;
        private readonly List<Tuple<string, string>> customProperties;

        public LoggerMock()
        {
            this.eventsList = new List<string>();
            this.customProperties = new List<Tuple<string, string>>();
        }

        public IDisposable BeginScope<TState>(TState state) => throw new NotImplementedException();

        public IDisposable BeginScope(string messageFormat, params object[] args) => throw new NotImplementedException();

        public bool IsEnabled(LogLevel logLevel) => throw new NotImplementedException();

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter) => throw new NotImplementedException();

        public void Log(LogLevel logLevel, EventId eventId, Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void Log(LogLevel logLevel, EventId eventId, string message, params object[] args) => throw new NotImplementedException();

        public void Log(LogLevel logLevel, Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void Log(LogLevel logLevel, string message, params object[] args) => throw new NotImplementedException();

        public void LogCritical(EventId eventId, Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogCritical(EventId eventId, string message, params object[] args) => throw new NotImplementedException();

        public void LogCritical(Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogCritical(string message, params object[] args) => throw new NotImplementedException();

        public void LogDebug(EventId eventId, Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogDebug(EventId eventId, string message, params object[] args) => throw new NotImplementedException();

        public void LogDebug(Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogDebug(string message, params object[] args) => throw new NotImplementedException();

        public void LogError(EventId eventId, Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogError(EventId eventId, string message, params object[] args) => throw new NotImplementedException();

        public void LogError(Exception exception, string message, params object[] args)
        {
            this.eventsList.Add(message);
        }

        public void LogError(string message, params object[] args)
        { 
            this.eventsList.Add(message);
        }

        public void LogInformation(EventId eventId, Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogInformation(EventId eventId, string message, params object[] args) => throw new NotImplementedException();

        public void LogInformation(Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogInformation(string message, params object[] args)
        {
            this.eventsList.Add(message);
        }

        public void LogTrace(EventId eventId, Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogTrace(EventId eventId, string message, params object[] args) => throw new NotImplementedException();

        public void LogTrace(Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogTrace(string message, params object[] args) => throw new NotImplementedException();

        public void LogWarning(EventId eventId, Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogWarning(EventId eventId, string message, params object[] args) => throw new NotImplementedException();

        public void LogWarning(Exception exception, string message, params object[] args) => throw new NotImplementedException();

        public void LogWarning(string message, params object[] args)
        {
            this.eventsList.Add(message);
        }

        public void LogMetric(string metricName, long value) => throw new NotImplementedException();

        public void LogMetric(string metricName, IDictionary<string, string> metricDimensions, long value) => throw new NotImplementedException();

        public void AddCustomProperty(string propertyName, string propertyValue)
        {
            this.customProperties.Add(Tuple.Create(propertyName, propertyValue));
        }

        public void Execute(string activityName, Action action,
            IEnumerable<KeyValuePair<string, string>> additionalCustomProperties = null)
        {
            this.eventsList.Add(activityName);
        }

        public Task ExecuteAsync(string activityName, Func<Task> action,
            IEnumerable<KeyValuePair<string, string>> additionalCustomProperties = null)
        {
            this.eventsList.Add(activityName);
            return action.Invoke();
        }

        public List<string> DumpTraces()
        {
            return this.eventsList;
        }
    }
}
