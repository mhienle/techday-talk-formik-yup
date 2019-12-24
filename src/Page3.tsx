import React from "react";
// eslint-disable-next-line no-unused-vars
import { Field, Form, FormikProps, ErrorMessage, Formik } from "formik";
import { Debug } from "./Debug";
import * as yup from "yup";

interface Form3Values {
  name?: string;
  emailRequired?: boolean;
  email?: string;
  age?: number;
}

const Form3: React.FC<Form3Values> = props => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name benötigt"),
    email: yup.mixed().when("emailRequired", (emailRequired: boolean) =>
      emailRequired
        ? yup
            .string()
            .email("Ungültige Email-Adresse")
            .required("Email-Adresse benötigt")
        : yup.string().email("Ungültige Email-Adresse")
    ),
    age: yup
      .number()
      .typeError("Zahl erwartet")
      .moreThan(0, "Alter muss größer als 0 sein")
      .required("Alter benötigt")
  });
  return (
    <Formik
      initialValues={{
        name: props.name,
        email: props.email,
        age: props.age
      }}
      validationSchema={validationSchema}
      validateOnMount={true}
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
            <label htmlFor="name">Name </label>
            <Field name="name" type="text" disabled={props.isSubmitting} />
            <ErrorMessage name="name" />
          </div>

          <div>
            <label htmlFor="emailRequired">Email benötigt? </label>
            <Field
              name="emailRequired"
              type="checkbox"
              disabled={props.isSubmitting}
            />
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

const Page3 = () => {
  return (
    <div>
      <h1>Validierung basierend auf values</h1>
      <Form3 />
    </div>
  );
};

export default Page3;
