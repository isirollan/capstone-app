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
export default function Logo(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    { overrides: { "r.": {}, Logo: {} }, variantValues: { color: "neutral" } },
    {
      overrides: { "r.": { color: "rgba(148,73,63,1)" }, Logo: {} },
      variantValues: { color: "brand" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="27px"
      height="29px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Logo")}
      {...rest}
    >
      <Text
        fontFamily="IBM Plex Mono"
        fontSize="22px"
        fontWeight="500"
        color="rgba(233,233,231,1)"
        lineHeight="28.999998092651367px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
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
        children="r."
        {...getOverrideProps(overrides, "r.")}
      ></Text>
    </View>
  );
}
