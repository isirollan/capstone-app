/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { LogoWithTextProps } from "./LogoWithText";
import { MyIconProps } from "./MyIcon";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavBarSideOverridesProps = {
    NavBarSide?: PrimitiveOverrideProps<FlexProps>;
    "Frame 32129767087"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 32129767088"?: PrimitiveOverrideProps<FlexProps>;
    LogoWithText?: LogoWithTextProps;
    Section29767100?: PrimitiveOverrideProps<FlexProps>;
    link29767111?: PrimitiveOverrideProps<FlexProps>;
    icon39433544?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39433545?: MyIconProps;
    label29767114?: PrimitiveOverrideProps<TextProps>;
    Section39433431?: PrimitiveOverrideProps<FlexProps>;
    link39433437?: PrimitiveOverrideProps<FlexProps>;
    icon39443623?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39443624?: MyIconProps;
    label39433440?: PrimitiveOverrideProps<TextProps>;
    link39433441?: PrimitiveOverrideProps<FlexProps>;
    icon39443644?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39443645?: MyIconProps;
    label39433444?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type NavBarSideProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: NavBarSideOverridesProps | undefined | null;
}>;
export default function NavBarSide(props: NavBarSideProps): React.ReactElement;
