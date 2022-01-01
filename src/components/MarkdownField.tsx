import { FieldHookConfig, useField, useFormikContext } from "formik";

import { MarkdownEditor } from "./MarkdownEditor";

type MarkdownFieldProps = FieldHookConfig<string> & {
  height: string;
};

export function MarkdownField(props: MarkdownFieldProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const handleSave = (value: string) => {
    setFieldValue(field.name, value);
  };

  return <MarkdownEditor text={field.value} onSubmit={handleSave} height={props.height || "300px"} />;
}
