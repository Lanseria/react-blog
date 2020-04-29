interface ErrorResponse {
  errors: {
    [key: string]: string;
  };
}

export const formatErrors = (err: any) => {
  const { response } = err;
  const data: string | ErrorResponse = response.data;
  if (!response) {
    return ['Network Error'];
  } else if (typeof data === 'string') {
    return [data];
  } else {
    const errors = Object.keys(data.errors).flatMap(
      (key) => `${key}:${data.errors[key]}`,
    );
    return errors;
  }
};
