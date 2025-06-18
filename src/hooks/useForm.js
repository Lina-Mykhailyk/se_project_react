import { useState, useCallback } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, validationMessage } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));

    const form = e.target.form;
    if (form) setIsValid(form.checkValidity());
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setTouched({});
      setIsSubmitted(false);
    },
    []
  );

  const setFormSubmitted = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  return {
    values,
    errors,
    isValid,
    touched,
    isSubmitted,
    handleChange,
    handleBlur,
    setValues,
    resetForm,
    setFormSubmitted,
  };
}
