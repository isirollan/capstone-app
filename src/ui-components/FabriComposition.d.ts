/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, HeadingProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FabriCompositionInputValues = {
    Field0?: string;
    "sample fabric"?: {
        composition?: string[];
    };
};
export declare type FabriCompositionValidationValues = {
    Field0?: ValidationFunction<string>;
    "sample fabric"?: {
        composition?: ValidationFunction<string>;
    };
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FabriCompositionOverridesProps = {
    FabriCompositionGrid?: PrimitiveOverrideProps<GridProps>;
    "sample fabric"?: PrimitiveOverrideProps<HeadingProps>;
    "sample fabric.composition"?: PrimitiveOverrideProps<TextFieldProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FabriCompositionProps = React.PropsWithChildren<{
    overrides?: FabriCompositionOverridesProps | undefined | null;
} & {
    onSubmit: (fields: FabriCompositionInputValues) => void;
    onChange?: (fields: FabriCompositionInputValues) => FabriCompositionInputValues;
    onValidate?: FabriCompositionValidationValues;
} & React.CSSProperties>;
export default function FabriComposition(props: FabriCompositionProps): React.ReactElement;
