import React from "react";
import * as yup from "yup";
import {
  Field,
  Form,
  FormikProps,
  Formik,
  FieldArray,
  ArrayHelpers
} from "formik";
import ErrorMessage from "./ErrorMessage";
import { Debug } from "./Debug";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    friendBox: {
      border: "1px solid black",
      margin: "4px",
      padding: "4px"
    }
  })
);

interface Person {
  name: string;
  email?: string;
}

interface Form5Values {
  name?: string;
  friends?: Person[];
}

const validationSchema = yup.object<Form5Values>({
  name: yup.string().required("Name benötigt"),
  friends: yup.array().of(
    yup.object<Person>({
      name: yup.string().required("Name benötigt"),
      email: yup
        .string()
        .email("Ungültige Email-Adresse")
        .notRequired()
    })
  )
});

const Form5: React.FC<Form5Values> = () => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{}}
      validateOnMount={true}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 2000);
      }}
    >
      {(props: FormikProps<Form5Values>) => (
        <Form>
          <div>
            <label htmlFor="name">Name </label>
            <Field name="name" type="text" disabled={props.isSubmitting} />
            <ErrorMessage name="name" />
          </div>

          <FieldArray name="friends">
            {(arrayHelpers: ArrayHelpers) => {
              const addFriend = () =>
                arrayHelpers.push({ name: "", email: "" });
              const removeFriend = (index: number) =>
                arrayHelpers.remove(index);

              return (
                <div>
                  {props.values.friends?.map((friend, index) => (
                    <div className={classes.friendBox}>
                      <div>
                        <label htmlFor={`friends[${index}].name`}>Name </label>
                        <Field
                          name={`friends[${index}].name`}
                          type="text"
                          disabled={props.isSubmitting}
                        />
                        <ErrorMessage name={`friends[${index}].name`} />
                      </div>
                      <div>
                        <label htmlFor={`friends[${index}].email`}>
                          Email{" "}
                        </label>
                        <Field
                          name={`friends[${index}].email`}
                          type="email"
                          disabled={props.isSubmitting}
                        />
                        <ErrorMessage name={`friends[${index}].email`} />
                      </div>
                      <button type="button" onClick={() => removeFriend(index)}>
                        Freund löschen
                      </button>
                    </div>
                  )) || null}

                  <button type="button" onClick={addFriend}>
                    Neuer Freund
                  </button>
                </div>
              );
            }}
          </FieldArray>

          <button type="submit" disabled={props.isSubmitting || !props.isValid}>
            Speichern
          </button>

          <Debug />
        </Form>
      )}
    </Formik>
  );
};

const Page5 = () => {
  return (
    <div>
      <h1>Field Arrays</h1>
      <Form5 />
    </div>
  );
};

export default Page5;
