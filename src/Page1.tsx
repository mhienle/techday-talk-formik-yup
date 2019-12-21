import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Field, Form, FormikProps, withFormik, ErrorMessage } from 'formik';
import { Debug } from './Debug';
import * as yup from 'yup';

interface Form1Values {
    name?: string;
    email?: string;
    age?: number;
}

const Form1View: React.FC<FormikProps<Form1Values>> = props => {
    return (
        <Form>
            <div>
                <label htmlFor="name">Name</label>
                <Field name="name" type="text" disabled={props.isSubmitting}/>
                <ErrorMessage name="name" />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" disabled={props.isSubmitting} />
                <ErrorMessage name="email" />
            </div>

            <div>
                <label htmlFor="age">Alter</label>
                <Field name="age" type="number" disabled={props.isSubmitting} />
                <ErrorMessage name="age" />
            </div>

            <button type="submit" disabled={props.isSubmitting || !props.isValid}>
                Speichern
            </button>

            <Debug />
        </Form>
    );
};

const Form1 = withFormik<Form1Values, Form1Values>({
    mapPropsToValues: (props: Form1Values) => {
        return {
            name: props.name,
            email: props.email,
            age: props.age,
        };
    },
    isInitialValid: false,
    validationSchema: yup.object().shape({
        name: yup
            .string()
            .required('Name benötigt'),
        email: yup
            .string()
            .email('Ungültige Email-Adresse')
            .required('Email-Adresse benötigt'),
        age: yup
            .number()
            .typeError('Zahl erwartet')
            .moreThan(0, 'Alter muss größer als 0 sein')
            .required('Alter benötigt'),
    }),
    handleSubmit: (values, actions) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 2000);
    },
})(Form1View);

const Page1 = () => {
    const initialData = {
        name: 'Jupp',
    };
    return (
        <div>
            <h1>Einfache Validierung</h1>
            <h2>Initial leeres Form</h2>
            <Form1 />
            <h2>Vorausgefülltes Form</h2>
            <Form1 {...initialData}/>
        </div>
    );
};

export default Page1;
