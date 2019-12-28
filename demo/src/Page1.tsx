import React from "react";
import { Field, Form, FormikProps, ErrorMessage, Formik } from "formik";
import { Debug } from "./Debug";
import * as yup from "yup";
import { Divider } from "@material-ui/core";

interface Form1Values {
  name?: string;
  email?: string;
  age?: number;
}

const Form1: React.FC<Form1Values> = props => {
  return (
    <Formik
      initialValues={{
        name: props.name,
        email: props.email,
        age: props.age
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required("Name benötigt"),
        email: yup
          .string()
          .email("Ungültige Email-Adresse")
          .required("Email-Adresse benötigt"),
        age: yup
          .number()
          .typeError("Zahl erwartet")
          .moreThan(0, "Alter muss größer als 0 sein")
          .required("Alter benötigt")
      })}
      validateOnMount={true}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 2000);
      }}
    >
      {(props: FormikProps<Form1Values>) => (
        <Form>
          <div>
            <label htmlFor="name">Name </label>
            <Field name="name" type="text" disabled={props.isSubmitting} />
            <ErrorMessage name="name" />
          </div>

          <div>
            <label htmlFor="email">Email </label>
            <Field name="email" type="email" disabled={props.isSubmitting} />
            <ErrorMessage name="email" />
          </div>

          <div>
            <label htmlFor="age">Alter </label>
            <Field name="age" type="number" disabled={props.isSubmitting} />
            <ErrorMessage name="age" />
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

const Page1 = () => {
  const initialData = {
    name: "Jupp"
  };
  return (
    <div>
      <h1>Einfache Validierung</h1>
      <Divider />

      <h2>Initial leeres Form</h2>
      <Form1 />
      <Divider />

      <h2>Vorausgefülltes Form</h2>
      <Form1 {...initialData} />
    </div>
  );
};

export default Page1;
