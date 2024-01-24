namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.GetTasks
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;
    using static GetTasksConstants;
    using static GetTasksUtils;
    using static GetTasksMapper;
    using Microsoft.CloudForFSI.Infra.Plugins.Validation;
    using Microsoft.CloudForFSI.Infra.Plugins.Validation.CommonValidationRules;

    public class GetTasksBusinessLogic : IPluginBusinessLogic
    {
        private IGetTasksDal dal;
        private ILoggerService loggerService;
        private GetTasksRequestParameters requestParameters = new GetTasksRequestParameters();
        private bool shouldGetCanceledTasks;

        public GetTasksBusinessLogic(IGetTasksDal dal, ILoggerService loggerService)
        {
            this.dal = dal;
            this.loggerService = loggerService;
        }

        public PluginResult Execute()
        {
            var parseRequestParametersResult = ParseRequestParameters();
             if (parseRequestParametersResult.IsFailure)
            {
                return parseRequestParametersResult;
            }

            var validationResult = ValidateRequestParameters();
            if (validationResult.IsFailure)
            {
                return validationResult;
            }

            var parseEnvironmentVariableResult = ParseCanceledTasksEnvVar();
            if (parseEnvironmentVariableResult.IsFailure)
            {
                return parseEnvironmentVariableResult;
            }

            var tasks = dal.GetTasksForApplication(requestParameters.Application, requestParameters.ProcessStage,this.shouldGetCanceledTasks);
            
            var collection = GetOutputExpandoEntityCollection(tasks ?? Enumerable.Empty<Task>(), out var errorTask);
            if (collection == null)
            {
                return PluginResult.Fail($"No task definition was found for task {errorTask} in the system.", Infra.FSIErrorCodes.FSIErrorCode_ConfigurationError, string.Empty);
            }

            dal.SetOutput(GetTasksOutputParameter, new EntityCollection(collection) { EntityName = collection.Count() == 0 ? "entity" : null });

            return PluginResult.Ok();
        }

        private PluginResult ParseCanceledTasksEnvVar()
        {
            var envVar = dal.RetrieveEnvironmentVariableValueOrDefault(EnvironmentVariableName);
            if (envVar == default)
            {
                return PluginResult.Fail($"Failed to fetch environment variable {EnvironmentVariableName}", Infra.FSIErrorCodes.FSIErrorCode_ConfigurationError, string.Empty);
            }
            bool isSuccess = envVar.Value.TryGetAttributeValue<string>(envVar.FieldToQuery, out var result);
            this.shouldGetCanceledTasks = !isSuccess || result == "yes";
            return PluginResult.Ok();
        }

        private PluginResult ParseRequestParameters()
        {
            var IsApplicationExist = dal.TryGetInputParameter(nameof(requestParameters.Application), out requestParameters.Application);
            dal.TryGetInputParameter(nameof(requestParameters.ProcessStage), out requestParameters.ProcessStage);
            dal.TryGetInputParameter(nameof(requestParameters.ShouldGetForms), out requestParameters.ShouldGetForms);

            if (IsApplicationExist == false)
            {
                return new PluginResult("There was a problem parsing one or more mandatory input parameters (Application)");
            }

            loggerService.LogInformation("Finished validating request parameters", "GetTasksPluginBusinessLogic");
            return PluginResult.Ok();
        }

        private PluginResult ValidateRequestParameters()
        {
            return new Validator<GetTasksRequestParameters>()
                .AddRule(new MandatoryFieldValidationRule<GetTasksRequestParameters>(nameof(requestParameters.Application)))
                .AddRule(new GuidParametersValidationRule<GetTasksRequestParameters>(nameof(requestParameters.Application), isMandatoryParam: true))
                .AddRule(new GuidParametersValidationRule<GetTasksRequestParameters>(nameof(requestParameters.ProcessStage), isMandatoryParam: false))
                .Validate(requestParameters);
        }

        private Entity GetFormatOutputEntity(Task task)
        {
            var entity = new Entity();

            foreach (string key in task.Attributes.Keys)
            {
                if (FieldMapper.ContainsKey(key))
                {
                    var data = FieldMapper[key].GetData(task, key);
                    if (!(data is TryGetAttributeValueError))
                    {
                        entity[FieldMapper[key].Name] = data;
                    }
                }
            }

            return entity;
        }

        private IEnumerable<msfsi_tasknavigation> GetTaskNavigationsForms(IEnumerable<Task> tasks)
        {
            List<Guid> taskNavigationIds = new List<Guid>();
            foreach (var task in tasks)
            {
                var key = $@"{TaskNavigationAlias}.{msfsi_tasknavigation.PrimaryIdAttribute}";
                var taskNavigationId = FieldMapper[key].GetData(task, key);
                if (!(taskNavigationId is TryGetAttributeValueError))
                {
                    taskNavigationIds.Add((Guid)taskNavigationId);
                }
            }

            return dal.GetTaskNavigations(taskNavigationIds);
        }

        private void AddFormInformationIfExists(Task task, Entity outputTask, IEnumerable<msfsi_tasknavigation> taskNavigationsForms, IEnumerable<msfsi_onboardingform> onBoardingFormEntities)
        {
            var taskNavigation = GetTaskNavigation(task, taskNavigationsForms);
            if (taskNavigation != null)
            {
                Guid taskFormId = GetTaskNavigationFormId(taskNavigation);
                if (taskFormId != default(Guid))
                {
                    string entityName = GetTaskFormEntityName(taskFormId, onBoardingFormEntities);
                    outputTask["formId"] = taskFormId.ToString();
                    outputTask["entityName"] = entityName;
                }
            }
        }

        private List<Entity> GetOutputExpandoEntityCollection(IEnumerable<Task> tasks, out Task error)
        {
            List<Entity> collection = new List<Entity>();
            IEnumerable<msfsi_onboardingform> onboardingFormEntities = null;
            IEnumerable<msfsi_tasknavigation> taskNavigationsForms = null;

            if (requestParameters.ShouldGetForms)
            {
                onboardingFormEntities = dal.GetOnboardingForms();
                taskNavigationsForms = GetTaskNavigationsForms(tasks);
            }
            
            foreach (var task in tasks)
            {
                var outputTask = GetFormatOutputEntity(task);

                if (requestParameters.ShouldGetForms && taskNavigationsForms != null && onboardingFormEntities != null)
                {
                    AddFormInformationIfExists(task, outputTask, taskNavigationsForms, onboardingFormEntities);
                }

                collection.Add(outputTask);
            }

            error = null;
            return collection;
        }
    }
}