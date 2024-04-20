/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
export default function LogoWithText(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: { "refiberd.": {}, LogoWithText: {} },
      variantValues: { color: "neutral" },
    },
    {
      overrides: { "refiberd.": { color: "rgba(0,0,0,1)" }, LogoWithText: {} },
      variantValues: { color: "brand" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="199px"
      height="42px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "LogoWithText")}
      {...rest}
    >
      <Text
        fontFamily="IBM Plex Mono"
        fontSize="32px"
        fontWeight="500"
        color="rgba(233,233,231,1)"
        lineHeight="41.599998474121094px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        letterSpacing="3.05px"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="refiberd."
        {...getOverrideProps(overrides, "refiberd.")}
      ></Text>
    </View>
  );
}
