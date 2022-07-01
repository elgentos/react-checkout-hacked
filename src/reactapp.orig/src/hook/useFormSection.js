import { useContext, useEffect } from 'react';

import CheckoutFormContext from '../context/Form/CheckoutFormContext';
import { prepareFields } from '../context/utility';

/**
 * This hook will be used by individual form section managers
 */
function useFormSection(
  id,
  formikData,
  initialValues,
  submitHandler,
  validationSchema
) {
  const { registerFormSection } = useContext(CheckoutFormContext);
  const { isFormSectionValid } = formikData || {};

  /**
   * It register the form to checkout-form-formik so that the form will be
   * a section of the big checkout form
   */
  useEffect(() => {
    registerFormSection({
      id,
      initialValues,
      validationSchema,
    });
  }, [id, initialValues, validationSchema, registerFormSection]);

  return {
    formId: id,
    isFormValid: isFormSectionValid,
    fields: prepareFields(initialValues, id),
    submitHandler,
    validationSchema,
  };
}

export default useFormSection;
