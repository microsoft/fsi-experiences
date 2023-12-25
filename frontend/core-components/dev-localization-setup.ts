import common from './assets/strings/common/common.1033.json';
import groupsControl from './assets/strings/GroupsControl/GroupsControl.1033.json';
import relationship from './assets/strings/Relationship/Relationship.1033.json';
import detailedFHControl from './assets/strings/DetailedFHControl/DetailedFHControl.1033.json';
import lifeEventBar from './assets/strings/LifeEventBar/LifeEventBar.1033.json';
import mainHousehold from './assets/strings/MainHousehold/MainHousehold.1033.json';
import customerSnapshotControl from './assets/strings/CustomerSnapshotControl/CustomerSnapshotControl.1033.json';
import cards from './assets/strings/Cards/Cards.1033.json';
import financialHoldings from './assets/strings/FinancialHoldings/FinancialHoldings.1033.json';
import { ITranslations, translations } from './context/localization/TranslationFunction';
import financialHoldingSelectorControl from './assets/strings/FinancialHoldingSelectorControl/FinancialHoldingSelectorControl.1033.json';
import { namespaces } from './constants/namespaces';

export interface ITranslationFile {
    namespace: string;
    file: any;
}
export const setup = (additionalFiles: ITranslationFile[] = []): ITranslations => {
    const {
        COMMON,
        GROUPS_CONTROL,
        LIFE_EVENT_BAR,
        CUSTOMER_SNAPSHOT_CONTROL,
        CARDS,
        MAIN_HOUSEHOLD,
        FINANCIAL_HOLDINGS,
        DETAILED_FH_CONTROL,
        RELATIONSHIP,
        FINANCIAL_HOLDING_SELECTOR_CONTROL,
    } = namespaces;

    const translationsObj = {
        [COMMON]: common,
        [GROUPS_CONTROL]: groupsControl,
        [LIFE_EVENT_BAR]: lifeEventBar,
        [CUSTOMER_SNAPSHOT_CONTROL]: customerSnapshotControl,
        [CARDS]: cards,
        [MAIN_HOUSEHOLD]: mainHousehold,
        [FINANCIAL_HOLDINGS]: financialHoldings,
        [DETAILED_FH_CONTROL]: detailedFHControl,
        [RELATIONSHIP]: relationship,
        [FINANCIAL_HOLDING_SELECTOR_CONTROL]: financialHoldingSelectorControl,
    };

    Object.keys(translationsObj).forEach(key => {
        translations[key] = translationsObj[key];
    });

    additionalFiles.forEach(additionalFile => {
        translations[additionalFile.namespace] = additionalFile.file;
    });

    return translations;
};
