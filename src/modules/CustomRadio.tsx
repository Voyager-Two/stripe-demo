import {Radio} from "@nextui-org/react";
import React from "react";
import clsx from "clsx";

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: clsx(
          "inline-flex m-0 bg-content2 hover:bg-content3 active:bg-content4 items-center justify-between",
          "flex-row-reverse max-w-[400px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default CustomRadio;
