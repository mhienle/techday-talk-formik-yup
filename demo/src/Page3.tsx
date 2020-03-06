import React from "react";
import { Field, Form, FormikProps, Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import { Debug } from "./Debug";

interface Form3Values {
  bool1?: boolean;
  bool2?: boolean;
}

const Form3: React.FC<Form3Values> = () => {
  return (
    <Formik
      initialValues={{}}
      validateOnMount={true}
      validate={(values: Form3Values) => {
        return (values.bool1 && values.bool2) ||
          (!values.bool1 && !values.bool2)
          ? {
              bool1: "Es muss genau eins der beiden Felder aktiv sein"
            }
          : undefined;
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 2000);
      }}
    >
      {(props: FormikProps<Form3Values>) => (
        <Form>
          <div>
            <label htmlFor="bool1">Bool1 </label>
            <Field name="bool1" type="checkbox" disabled={props.isSubmitting} />
            <ErrorMessage name="bool1" />
          </div>

          <div>
            <label htmlFor="bool2">Bool2 </label>
            <Field name="bool2" type="checkbox" disabled={props.isSubmitting} />
            <ErrorMessage name="bool2" />
          </div>

          <button type="submit" disabled={props.isSubmitting || !props.isValid}>
            Speichern
          </button>

          <Debug />
        </Form>
      )}
    </Formik>
  );
};

const Page3 = () => {
  return (
    <div>
      <h1>Cross-Validierung</h1>
      <Form3 />
    </div>
  );
};

export default Page3;
