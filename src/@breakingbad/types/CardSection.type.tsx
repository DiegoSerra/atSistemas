export interface CardSectionDataType {
  label?: string | JSX.Element;
  value?: string | string[] | number | null | boolean | JSX.Element;
  component?: JSX.Element;
}

export interface CardSectionProps {
  name?: string,
  className?: string,
  title?: string,
  data?: CardSectionDataType[],
  defaultValue?: any,
  children?: React.ReactNode
}
