/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, FlexProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ContactUsOverridesProps = {
    ContactUs?: PrimitiveOverrideProps<FlexProps>;
    TextField38891548?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38891592?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38891621?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38891657?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38891700?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38891750?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38891807?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38891871?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38891942?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38892020?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38892105?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38892197?: PrimitiveOverrideProps<TextFieldProps>;
    Button39353403?: PrimitiveOverrideProps<ButtonProps>;
    Button38891063?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type ContactUsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: ContactUsOverridesProps | undefined | null;
}>;
export default function ContactUs(props: ContactUsProps): React.ReactElement;
