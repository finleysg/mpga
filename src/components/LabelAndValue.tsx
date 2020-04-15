import React, { ReactNode } from 'react';
import MarkdownDiv from './MarkdownDiv';
import moment from 'moment';
import styled from 'styled-components';

const InlineLabel = styled.span`
    font-weight: 900;
    padding: 8px 12px 8px 0;
`;
InlineLabel.displayName = "InlineLabel";

const StackedLabel = styled.p`
    font-weight: 600;
    margin: 4px 0 4px 0;
`
StackedLabel.displayName = "StackedLabel";

export enum LabelStyle {
    Inline,
    Stacked
}

export enum ValueType {
    Text,
    ExternalLink,
    Markdown,
    Date,
    Address
}

export interface ILabelAndValueProps {
    label: string;
    value: any;
    defaultValue?: string;
    labelStyle: LabelStyle;
    valueType: ValueType;
}

const LabelAndValue: React.FC<ILabelAndValueProps> = (props) => {
    const { label, value, defaultValue, labelStyle, valueType } = props;

    const renderValue = (): ReactNode => {
        switch (valueType)
        {
            case ValueType.Text:
                return <span>{value || defaultValue || "n/a"}</span>;
            case ValueType.ExternalLink:
                return <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
            case ValueType.Markdown:
                return <MarkdownDiv text={value} />
            case ValueType.Date:
                if (value && moment.isDate(value)) {
                    return <span>{moment(value).format("yyyy-MM-dd")}</span>
                } else {
                    return <span>{defaultValue || "n/a"}</span>
                }
            case ValueType.Address:
                return <div>
                    <p className="mb-1">{value.addressTxt}</p>
                    <p>{value.city}, {value.state} {value.zip}</p>
                </div>
            default:
                return <></>
        }
    }

    return (
        <div>
            {labelStyle === LabelStyle.Inline &&
                <InlineLabel>{label}:</InlineLabel>
            }
            {labelStyle === LabelStyle.Stacked &&
                <StackedLabel className="text-primary">{label}</StackedLabel>
            }
            {renderValue()}
        </div>
    );
}

export default LabelAndValue;
