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

const imgRegex: RegExp = /\.(gif|jpeg|jpg|tiff|png|webp|bmp)$/i;

export const isImg = (str: string) => imgRegex.test(str);

export const arrayToMap = (arr: any[], prop: string) =>
  arr.reduce((acc, curr) => ({ ...acc, [curr[prop]]: curr }), {});

export const appendToMap = (original: any, toAppend: any) => ({
  ...original,
  ...toAppend,
});
