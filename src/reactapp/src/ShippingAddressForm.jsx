import React, { useState } from 'react';
import { string as YupString, bool as YupBool, object as YupObject } from 'yup';
import TextInput from './Common/Form/TextInput';
import { __ } from './i18n';
import useCheckoutContext from './hook/useCheckoutContext';

const requiredMessage = __('%1 is required');

const shippingAddressValidation = YupObject({
  company: YupString().required(requiredMessage),
  firstname: YupString().required(requiredMessage),
  lastname: YupString().required(requiredMessage),
  street: YupString().required(requiredMessage),
  phone: YupString().required(requiredMessage),
  zipcode: YupString().required(requiredMessage),
  city: YupString().required(requiredMessage),
  region: YupString().nullable(),
  country: YupString().required(requiredMessage),
  isSameAsShipping: YupBool(),
  saveInBook: YupBool(),
});

const initialValues = {
  company: '',
  firstname: '',
  lastname: '',
  street: '',
  phone: '',
  zipcode: '',
  city: '',
  region: '',
  country: 'NL',
  saveInBook: false,
};
const touchedBeforeGivingError = {
  company: false,
  firstname: false,
  lastname: false,
  street: false,
  phone: false,
  zipcode: false,
  city: false,
};

export default function ShippingAddressForm() {
  const {
    actions: { addCartShippingAddress },
  } = useCheckoutContext();
  const [formState, setFormState] = useState(initialValues);
  const [formTouched, setFormTouched] = useState(touchedBeforeGivingError);
  const [error, setError] = useState(null);

  const onBlur = async () => {
    try {
      const validated = await shippingAddressValidation.validate(formState);
      if (validated) await addCartShippingAddress(validated);
    } catch (e) {
      const allTouched = Object.keys(formTouched).reduce((acc, field) => {
        if (!formTouched[field]) return false; // field was not touched
        return acc;
      }, true);
      if (allTouched) {
        setError(e.message);
      }
    }
  };

  const updateForm = (newValue, field) => {
    setFormTouched({ ...formTouched, [field]: true });
    setFormState({ ...formState, [field]: newValue });
  };

  return (
    <div>
      <h2 className="text-2xl">Shipping address</h2>
      {error && <span className="text-lg text-red-500">{error}</span>}
      <TextInput
        required
        name="company"
        label={__('Company')}
        placeholder={__('Company')}
        onChange={(company) => updateForm(company, 'company')}
        value={formState.company}
        onBlur={onBlur}
      />
      <TextInput
        required
        name="firstname"
        label={__('First name')}
        placeholder={__('First name')}
        onChange={(firstname) => updateForm(firstname, 'firstname')}
        value={formState.firstname}
        onBlur={onBlur}
      />
      <TextInput
        required
        name="lastname"
        label={__('Last name')}
        placeholder={__('Last name')}
        onChange={(lastname) => updateForm(lastname, 'lastname')}
        value={formState.lastname}
        onBlur={onBlur}
      />
      <TextInput
        required
        name="street"
        label={__('Street')}
        placeholder={__('Street')}
        onChange={(street) => updateForm(street, 'street')}
        value={formState.street}
        onBlur={onBlur}
      />
      <TextInput
        required
        name="phone"
        label={__('Phonenumber')}
        placeholder={__('Phonenumber')}
        onChange={(phone) => updateForm(phone, 'phone')}
        value={formState.phone}
        type="tel"
        onBlur={onBlur}
      />
      <TextInput
        required
        name="zipcode"
        label={__('Zipcode')}
        placeholder={__('Zipcode')}
        onChange={(zipcode) => updateForm(zipcode, 'zipcode')}
        value={formState.zipcode}
        onBlur={onBlur}
      />
      <TextInput
        required
        name="city"
        label={__('City')}
        placeholder={__('City')}
        onChange={(city) => updateForm(city, 'city')}
        value={formState.city}
        onBlur={onBlur}
      />
    </div>
  );
}
