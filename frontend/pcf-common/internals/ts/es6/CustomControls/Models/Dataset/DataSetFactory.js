import { DataSetObjectWrapper } from "./DataSetObjectWrapper";
var DataSetFactory = (function () {
    function DataSetFactory() {
    }
    DataSetFactory.getDataSet = function (dataProvider, configuration) {
        var dataSetObjectWrapper = new DataSetObjectWrapper(dataProvider, configuration);
        return dataSetObjectWrapper.getDataSet();
    };
    DataSetFactory.createDataSetObjectWrapper = function (dataProvider, configuration, previousWrapperToReplace) {
        var newWrapper = new DataSetObjectWrapper(dataProvider, configuration, previousWrapperToReplace);
        previousWrapperToReplace === null || previousWrapperToReplace === void 0 ? void 0 : previousWrapperToReplace.destroy();
        return newWrapper;
    };
    return DataSetFactory;
}());
export { DataSetFactory };
