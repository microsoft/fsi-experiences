import { IMeasuringHandlerContext } from "./IMeasuringHandlerContext";
interface IMeasuringSubscriber {
    forceMeasure?: boolean;
    getComponent(): HTMLElement;
    onMeasure(width?: number, height?: number): void;
    getContext(): IMeasuringHandlerContext;
}
export { IMeasuringSubscriber };
