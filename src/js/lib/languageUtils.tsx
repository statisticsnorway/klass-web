import React from "react";
import i18next from "i18next";

// Translate function
export const translate = (str: string) => {
  return i18next.t(str);
};

type InputLikeElements = "input" | "textarea" | "select";

interface BaseTranslateComponentProps {
  component?: keyof JSX.IntrinsicElements;
  value?: string;
}

type TranslateComponentProps<T extends keyof JSX.IntrinsicElements> =
  BaseTranslateComponentProps &
    Omit<React.ComponentProps<T>, keyof BaseTranslateComponentProps>;

// Generic TranslateComponent
export const TranslateComponent = <T extends keyof JSX.IntrinsicElements>({
  component,
  content,
  ...rest
}: TranslateComponentProps<T>) => {
  const Component = component;
  const translatedValue = content ? translate(content) : "";

  // For input-like components, we assign `translatedValue` to `value` attribute.
  // For other components, we render it as children.
  const isInputLike = (element: string): element is InputLikeElements =>
    ["input", "textarea"].includes(element);

  if (!Component) {
    return <>{translatedValue}</>;
  }

  if (isInputLike(Component)) {
    return (
      <Component
        {...(rest as React.ComponentProps<T>)}
        value={translatedValue}
      />
    );
  } else {
    return (
      <Component {...(rest as React.ComponentProps<T>)}>
        {translatedValue}
      </Component>
    );
  }
};
