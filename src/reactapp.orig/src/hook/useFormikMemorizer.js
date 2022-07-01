import { useMemo } from 'react';
import { useFormikContext } from 'formik';

export default function useFormikMemorizer(formSectionId) {
  const {
    dirty,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setFieldTouched,
  } = useFormikContext();

  const formSectionErrors = errors?.[formSectionId];
  const formSectionValues = values?.[formSectionId];
  const formSectionTouched = touched?.[formSectionId];
  const isFormSectionTouched = !!formSectionTouched;
  const isFormSectionValid =
    dirty && isFormSectionTouched && !formSectionErrors;

  return useMemo(
    () => ({
      setFieldError,
      setFieldValue,
      formSectionId,
      setFieldTouched,
      formSectionErrors,
      formSectionValues,
      isFormSectionValid,
      formSectionTouched,
      isFormSectionTouched,
    }),
    [
      setFieldError,
      setFieldValue,
      formSectionId,
      setFieldTouched,
      formSectionErrors,
      formSectionValues,
      isFormSectionValid,
      formSectionTouched,
      isFormSectionTouched,
    ]
  );
}
