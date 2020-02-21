import React, { useMemo } from "react";
import { Field, Form, Formik, FormikProps, useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { Debug } from "./Debug";

interface Form6Values {
  name: string;
  email: string;
  age: number;
}

interface ReadonlyProp {
  readonly: boolean;
}

interface InputWrapperProps {
  fieldName: string;
  label: string;
  type?: string;
}

const InputWrapper = (props: InputWrapperProps) => {
  const { getFieldProps, status, isSubmitting } = useFormikContext();
  const { fieldName, label, type } = props;
  const readonlyMode = !!status?.readonly;
  return (
    <div>
      {readonlyMode ? (
        `${label}: ${getFieldProps(fieldName).value}`
      ) : (
        <>
          <label htmlFor={fieldName}>{label + " "}</label>
          <Field
            name={fieldName}
            type={type || "text"}
            disabled={isSubmitting}
          />
          <ErrorMessage name={fieldName} />
        </>
      )}
    </div>
  );
};

const Form6View = (props: FormikProps<Form6Values> & ReadonlyProp) => {
  const {
    readonly,
    status,
    setStatus,
    initialStatus,
    isSubmitting,
    isValid
  } = props;
  useMemo(
    () =>
      setStatus({
        ...initialStatus,
        readonly: readonly
      }),
    [initialStatus, setStatus, readonly]
  );
  return (
    <Form>
      <InputWrapper fieldName="name" label="Name" />
      <InputWrapper fieldName="email" label="Email" type="email" />
      <InputWrapper fieldName="age" label="Alter" type="number" />

      {status?.readonly ? (
        <button
          type="button"
          onClick={event => {
            event.preventDefault(); // see https://github.com/jaredpalmer/formik/issues/1610
            setStatus({ readonly: false });
          }}
        >
          Bearbeiten
        </button>
      ) : (
        <button type="submit" disabled={isSubmitting || !isValid}>
          Speichern
        </button>
      )}

      <Debug />
    </Form>
  );
};

const Form6: React.FC<Form6Values & ReadonlyProp> = props => {
  const { readonly } = props;
  return (
    <Formik
      initialValues={{
        name: props.name,
        email: props.email,
        age: props.age
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          actions.setStatus({ readonly: true }); // https://github.com/jaredpalmer/formik/issues/2303
        }, 2000);
      }}
    >
      {props => <Form6View {...props} readonly={readonly} />}
    </Formik>
  );
};

const Page6 = () => {
  const initialData: Form6Values = {
    name: "John Doe",
    email: "john@doe.com",
    age: 42
  };
  return (
    <div>
      <h1>Edit/Readonly Form</h1>
      <Form6 {...initialData} readonly={true} />
    </div>
  );
};

export default Page6;
