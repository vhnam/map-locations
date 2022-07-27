import * as yup from 'yup';

const addMarkerSchema = yup
  .object({
    lat: yup.number().required(),
    lng: yup.number().required(),
    title: yup.string().max(255).required(),
    description: yup.string().max(10000).required(),
  })
  .required();

export default addMarkerSchema;
