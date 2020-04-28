export const processErrors = (err: any) => {
  const { response } = err;
  if (!response) {
    return ['Network Error'];
  } else if (!response.data.errors) {
    return ['401'];
  } else {
    const errors = Object.keys(response.data.errors).flatMap(
      (key) => `${key}:${response.data.errors[key]}`,
    );
    return errors;
  }
};
