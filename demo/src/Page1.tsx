import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";

interface Form1Values {
  name?: string;
  email?: string;
  age?: number;
}

const Form1: React.FC<Form1Values> = props => {
  const onSubmit = (data: Form1Values) => console.log(data);
  const { handleSubmit, register, errors } = useForm<Form1Values>({
    validationSchema: yup.object().shape({
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
    })
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name </label>
        <input name="name" ref={register} defaultValue={props.name} />
        {errors.name && errors.name.message}
      </div>
      <div>
        <label htmlFor="email">Email </label>
        <input
          name="email"
          type="email"
          ref={register}
          defaultValue={props.email}
        />
        {errors.email && errors.email.message}
      </div>
      <div>
        <label htmlFor="age">Alter </label>
        <input
          name="age"
          type="number"
          ref={register}
          defaultValue={props.age}
        />
        {errors.age && errors.age.message}
      </div>

      <input type="submit" />
    </form>
  );
};

const Page1 = () => {
  const initialData = {
    name: "Jupp"
  };
  return (
    <div>
      <h1>Einfache Validierung</h1>

      <h2>Initial leeres Form</h2>
      <Form1 />

      <h2>Vorausgefülltes Form</h2>
      <Form1 {...initialData} />
    </div>
  );
};

export default Page1;
