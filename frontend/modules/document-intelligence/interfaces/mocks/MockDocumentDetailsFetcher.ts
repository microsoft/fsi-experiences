import { IDocumentRequest, IDocumentFile, IDocumentsMetadata } from '..';
import { IStepDefinition, IStepFieldData, IStepResult } from '../IDocumentInsight';
import { IDocumentDetailsFetcher } from '../IDocumentsFetcher';
import * as documentsMock from './DocumentData.mock';
import * as pipelineMessages from './PipelineStatusMessage.mock';
import { stepsDefinitions } from './StepsDefinitions.mock';
import { stepsResults } from './PipelineStepData.mock';
import { sleep } from '@fsi/core-components/dist/utilities/TimeUtils';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';

export const MOCK_DI_REGARDING_TABLE = 'Contact';
export const MOCK_DI_CONTEXT_TABLE = 'Application';
export class MockDocumentDetailsFetcher implements IDocumentDetailsFetcher {
    async getStepsDefinitions(documentDefinitionId: string): Promise<IStepDefinition[]> {
        await sleep(200);
        return stepsDefinitions;
    }

    public regardingEntity;
    async getSingleDocument(id: string): Promise<IDocumentRequest> {
        await sleep(200);
        return documentsMock.missingFileDocMock;
    }

    async removeDocument(document: IDocumentRequest, deleteRequest: boolean): Promise<boolean> {
        await sleep(200);
        return true;
    }
    async getDocumentsMetadata(): Promise<IDocumentsMetadata> {
        await sleep(200);
        return {
            pipelineMessages: Object.values(pipelineMessages),
            contextEntityName: MOCK_DI_CONTEXT_TABLE,
            regardingEntityName: MOCK_DI_REGARDING_TABLE,
        };
    }

    async getPipelineStepsResults(pipelineId: string): Promise<{ [stepDefinitionId: string]: IStepResult }> {
        await sleep(200);
        return stepsResults;
    }

    async getDocumentFile(documentId: string): Promise<IDocumentFile> {
        await sleep(200);
        const base64 = '';
        const base64Response = await fetch(`data:application/pdf;base64,${base64}`);
        const blob = await base64Response.blob();
        return {
            fileId: '1',
            fileURL: URL.createObjectURL(blob),
        };
    }

    async updateDocumentStatus(document: IDocumentRequest, status: number): Promise<IDocumentRequest> {
        await sleep(200);
        return {
            ...document,
            status,
            lastStatusDate: new Date(),
        };
    }

    async uploadDocument(document: IDocumentRequest, file: File, oldFileId?: string): Promise<IDocumentRequest> {
        throw new Error('Method not implemented.');
    }

    public hasDocumentPrivilege(type: PrivilegeType): boolean {
        return true;
    }

    async getMaxUploadSize(): Promise<number> {
        return 5242880;
    }

    async updateDocumentDescription(document: IDocumentRequest, description: string): Promise<IDocumentRequest> {
        await sleep(200);
        return {
            ...document,
            description,
            lastStatusDate: new Date(),
        };
    }

    async updateStepFieldsData({ stepResultId, fieldsToUpdate, stepOutput }): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
