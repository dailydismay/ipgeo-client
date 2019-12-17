import * as joi from "joi";

export const validateAdress = (ip: string) =>
  new Promise((resolve, reject) => {
    const schema = joi
      .string()
      .ip()
      .required();

    joi.validate(ip, schema, err => {
      if (err) {
        reject(new Error("The ip value is incorrect"));
      }

      resolve();
    });
  });
