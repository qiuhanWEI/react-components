import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled, { css } from 'styled-components';
import RcPicker from 'rc-calendar/lib/Picker';

import Icon from 'src/components/Icon';
import Select from 'src/components/Select';
import Button from 'src/components/Button';
import { calendarMixin } from 'src/components/Calendar/style';
import { inlineBlockWithVerticalMixin, clearFixMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-datepicker';
export const pickerPrefixCls = prefixCls + '–picker';
export const monthPickerPrefixCls = prefixCls + '-month-picker';

const RcPickerWrap = ({ className, dropdownClassName, ...rest }) => (
    <RcPicker dropdownClassName={classnames(className, dropdownClassName)} {...rest} />
);
RcPickerWrap.propTypes = {
    className: PropTypes.string.isRequired,
    dropdownClassName: PropTypes.string
};

export const PickerWrap = styled(RcPickerWrap).attrs({
    className: `${prefixCls}-popup-wrap`
})(
    ({ zIndex, isMonth }) => css`
        user-select: none;
        width: 285px;
        z-index: ${zIndex};
        ${isMonth &&
            css`
                width: 220px;
            `};
        ${calendarMixin};
    `
);

export const DateWrap = styled.div.attrs({
    className: `${prefixCls}-date-wrap`
})(
    ({ theme: { Height, HeightNumber, colorMap }, size }) => css`
        height: ${Height[size]};
        line-height: ${HeightNumber[size] - 2}px;
        padding: 0 8px;
        border: 1px solid ${colorMap.default.border};
        border-radius: 2px;
        cursor: pointer;
        box-sizing: border-box;

        ${inlineBlockWithVerticalMixin};
    `
);

export const DateSpan = styled.span`
    display: inline-block;
`;

export const PickerIcon = styled(Icon)`
    margin-left: 5px;
    display: inline-block;
`;

export const TimeWrap = styled.div.attrs({
    className: `${prefixCls}-time-wrap`
})`
    margin-left: 8px;

    ${inlineBlockWithVerticalMixin};
`;

export const TimeSeparator = styled.span`
    margin: 0 4px;
`;

export const PickerContainer = styled.div.attrs({
    className: ({ disabled, isMonth }) =>
        classnames(prefixCls, isMonth && `${prefixCls}-month`, disabled && `${prefixCls}-disabled`)
})(
    ({ theme: { colorMap, DatePicker: datePickerTheme = {} }, disabled }) => css`
        ${inlineBlockWithVerticalMixin};

        ${disabled &&
            css`
                ${/*sc-sel*/ DateWrap} {
                    pointer-events: none;
                    color: ${colorMap.disabled.text};
                    border-color: ${colorMap.disabled.border};
                    background: ${colorMap.disabled.background};
                }
            `};
        ${datePickerTheme['&']};
    `
);

export const RangeContainer = styled.div.attrs({
    className: ({ disabled }) => classnames(`${prefixCls}-range`, disabled && `${prefixCls}-range-disabled`)
})(
    ({ theme: { DatePicker: datePickerTheme = {} } }) => css`
        ${datePickerTheme['Range']};
    `
);

export const RangePopup = styled.div.attrs({
    className: `${prefixCls}-range-popup`
})(
    ({ theme: { colorMap, DatePicker: datePickerTheme = {} } }) => css`
        background: ${colorMap.default.background};
        display: inline-block;
        border: 1px solid ${colorMap.default.border};
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        padding: 0;
        ${datePickerTheme['RangePopup']};
    `
);

export const RangeSelect = styled(Select)`
    margin-right: 8px;
`;

export const RangeDateWrap = styled.div.attrs({
    className: ({ readonly, disabled }) =>
        classnames(
            `${prefixCls}-range-date-wrap`,
            readonly && `${prefixCls}-range-date-wrap-readonly`,
            disabled && `${prefixCls}-range-date-wrap-disabled`
        )
})(
    ({ theme: { Height, HeightNumber, colorMap }, size, readonly, disabled }) => css`
        border: 1px solid ${colorMap.default.border};
        padding: 0 8px;
        border-radius: 2px;
        cursor: pointer;
        box-sizing: border-box;
        height: ${Height[size]};
        line-height: ${HeightNumber[size] - 2}px;
        color: ${colorMap.default.text};

        ${inlineBlockWithVerticalMixin};

        ${readonly &&
            css`
                pointer-events: none;
                border-width: 0;
                line-height: ${Height[size]};

                ${/* sc-sel */ PickerIcon} {
                    display: none;
                }
            `};

        ${disabled &&
            css`
                pointer-events: none;
                background: ${colorMap.disabled.background};
                border-color: ${colorMap.disabled.border};
                border-width: 1px;
                color: ${colorMap.disabled.text};
            `};
    `
);
export const RangeDateSeparator = styled.span(
    ({ theme: { colorMap } }) => css`
        margin: 0 4px;
        width: 12px;
        height: 1px;
        background: ${colorMap.default.border};

        ${inlineBlockWithVerticalMixin};
    `
);

export const RangePopupPickerContainer = styled.div`
    margin: 10px 10px 0 10px;

    ${/*sc-sel */ PickerContainer} {
        margin-left: 10px;
    }
`;

export const RangePopupConfirmButton = styled(Button)`
    float: right;
`;

export const RangePopupFooter = styled.div(
    ({ theme: { colorMap } }) => css`
        padding: 10px;
        margin-top: 10px;
        border-top: 1px solid ${colorMap.default.border};
        ${clearFixMixin};
    `
);

export const RangePopupError = styled.p(
    ({ theme: { colorMap } }) => css`
        color: ${colorMap.error.text};
        display: inline-block;
        line-height: 28px;
    `
);

addDefaultThemeProps(
    PickerWrap,
    DateWrap,
    PickerContainer,
    RangePopup,
    RangeDateWrap,
    RangeDateSeparator,
    RangePopupFooter,
    RangePopupError
);