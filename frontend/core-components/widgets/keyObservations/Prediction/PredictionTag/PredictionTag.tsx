import React, { FC, useMemo } from 'react';
import { namespaces, useTranslation } from '../../../../context/hooks/useTranslation';
import { CIPrediction } from '../../../../dataLayerInterface/entity/CIPrediction/CIPrediction';
import type { IPredictionRiskProps } from './PredictionTag.interface';
import {
    predictionExplainCalloutStyles,
    predictionExplainInfoTooltipStyles,
    predictionRiskColor,
    predictionUndefinedCalloutStyles,
    undefinedDescriptionTextStyles,
} from './PredictionTag.style';
import { Stack } from '@fluentui/react/lib/components/Stack';
import AIExplainability from '../../../../components/containers/AIExplainability/AIExplainability';
import { DirectionalHint } from '@fluentui/react/lib/components/Callout';
import { IAIFactorsInfo } from '../../../../components/containers/AIFactorList/AIFactorList.interface';
import { Link } from '@fluentui/react/lib/components/Link/Link';
import { EmptyState } from '../../../../components/atoms/EmptyState';
import { InfoCallout } from '../../../../components/atoms/InfoCallout/InfoCallout';
import { CIEntitiesError } from '../../../../dataLayerInterface/entity/CIEntitiesError';
import { COLORS } from '../../../../constants/Colors';
import { ExplainabilityBox } from '../../../../components/atoms/ExplainabilityBox';
import { Text } from '@fluentui/react/lib/components/Text';

export const learnMoreLink = 'https://go.microsoft.com/fwlink/?linkid=2190624';

export const PredictionTag: FC<IPredictionRiskProps> = props => {
    const { prediction, isPredictionSupported } = props;

    const translate = useTranslation(namespaces.AI_CHURN_EXPLAINABILITY);
    const translateObs = useTranslation(namespaces.KEY_OBSERVATIONS);

    const scoreInfo = useMemo(() => {
        if (typeof prediction !== 'object') {
            return undefined;
        }
        return {
            color: predictionRiskColor[prediction.level],
            score: prediction.score,
            text: prediction.label,
        };
    }, [prediction]);

    const topFactorsTooltip = (
        <Stack styles={predictionExplainInfoTooltipStyles}>
            <p>{translate('CHURN_TOP_FACTORS_MORE_INFO_P1')}</p>
            <p>
                {translate('CHURN_TOP_FACTORS_MORE_INFO_P2')}&nbsp;
                <Link target="_blank" href={learnMoreLink}>
                    {translate('CHURN_TOP_FACTORS_MORE_INFO_P2_LINK')}
                </Link>
                &nbsp;
                {translate('CHURN_TOP_FACTORS_MORE_INFO_P2_LINK_MORE_DATA')}
            </p>
            <p>{translate('CHURN_TOP_FACTORS_MORE_INFO_P3')}</p>
        </Stack>
    );

    const factorsInfo: IAIFactorsInfo = useMemo(() => {
        if (typeof prediction !== 'object') {
            return {
                text: '',
                factors: [],
            };
        }
        return {
            text: translate('CHURN_TOP_FACTORS'),
            moreInfo: topFactorsTooltip,
            factors: prediction.factors
                .sort((f1, f2) => Math.abs(f2.value) - Math.abs(f1.value))
                .filter((_, i) => i < 3)
                .map(f => ({
                    id: f.fieldName,
                    displayName: translate(f.fieldName),
                    factor: f.value,
                })),
        };
    }, [prediction, topFactorsTooltip, translate]);

    if (!prediction || !isPredictionSupported) {
        return <EmptyState title={translateObs('INVALID_CONFIGURATION')} subtitle={translate('CONTACT_SYSTEM_ADMIN')} />;
    }

    if (prediction === CIEntitiesError.UNAVAILABLE) {
        return (
            <ExplainabilityBox color={COLORS.lightGray} visibleText={translateObs('KEY_PREDICTION_EMPTY')} showExplainability={true}>
                <InfoCallout
                    iconAriaLabel={translateObs('PREDICTION_UNDEFINED_MESSAGE')}
                    calloutStyles={predictionUndefinedCalloutStyles}
                    hintDirection={DirectionalHint.rightCenter}
                >
                    <Text styles={undefinedDescriptionTextStyles}>{translateObs('PREDICTION_UNDEFINED_MESSAGE')}</Text>
                </InfoCallout>
            </ExplainabilityBox>
        );
    }

    const predictionValue = prediction as CIPrediction;

    const showExplainability = !predictionValue.isExternal;

    return (
        <ExplainabilityBox
            color={predictionRiskColor[predictionValue.level]}
            visibleText={predictionValue.label}
            showExplainability={showExplainability}
        >
            {scoreInfo && (
                <InfoCallout
                    hintDirection={DirectionalHint.rightCenter}
                    calloutStyles={predictionExplainCalloutStyles}
                    iconAriaLabel={translate('CHURN_INFO_ICON_ARIA_LABEL')}
                >
                    <AIExplainability
                        scoreInfo={scoreInfo}
                        modelTitle={translate('CHURN_RISK_SCORE')}
                        learnMoreLink={learnMoreLink}
                        learnMoreAdditionalText={translate('CHURN_LINK_MORE_INFO')}
                        lowIsGood
                        negativeLabel={translate('NEGATIVE_FACTOR_LEGEND')}
                        positiveLabel={translate('POSITIVE_FACTOR_LEGEND')}
                        factorsInfo={factorsInfo}
                    />
                </InfoCallout>
            )}
        </ExplainabilityBox>
    );
};

export default PredictionTag;
