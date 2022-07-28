import * as yup from 'yup';

const nearBySchema = yup
  .object({
    radius: yup.number().positive().integer().required(),
  })
  .required();

export default nearBySchema;
