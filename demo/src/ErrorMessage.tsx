import React from "react";
import { ErrorMessage, ErrorMessageProps } from "formik";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    errorMessageContainer: {
      color: "red"
    }
  })
);

const CustomErrorMessage = (props: ErrorMessageProps) => {
  const classes = useStyles();
  return (
    <span className={classes.errorMessageContainer}>
      <ErrorMessage {...props} />
    </span>
  );
};

export default CustomErrorMessage;
