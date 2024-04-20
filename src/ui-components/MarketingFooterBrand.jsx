/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import MyIcon from "./MyIcon";
import { Flex } from "@aws-amplify/ui-react";
export default function MarketingFooterBrand(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="32px"
      direction="column"
      width="393px"
      height="66px"
      justifyContent="center"
      alignItems="flex-start"
      position="relative"
      padding="40px 40px 40px 40px"
      backgroundColor="rgba(146,72,63,1)"
      {...getOverrideProps(overrides, "MarketingFooterBrand")}
      {...rest}
    >
      <MyIcon
        width="47px"
        height="47px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        type="Serach"
        {...getOverrideProps(overrides, "MyIcon")}
      ></MyIcon>
    </Flex>
  );
}
