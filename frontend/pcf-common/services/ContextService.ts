import { CommonPCFContext } from '../common-props';

export class ContextService {
    private _context?: CommonPCFContext;

    constructor() {}

    public isTestMode(): boolean {
        return this._context?.mode.label === 'TestLabel';
    }

    setContext(context: CommonPCFContext) {
        this._context = context;
    }

    geContext(): CommonPCFContext | undefined {
        return this._context;
    }
}

const contextService = new ContextService();

export default contextService;
