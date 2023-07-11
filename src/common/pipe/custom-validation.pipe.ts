import { ValidationError } from '@nestjs/common';

interface IMessageError {
  [key: string]: string[];
}

export const formatErrors = (errors: ValidationError[]): IMessageError[] => {
  return errors.reduce((prevValue: IMessageError[], value) => {
    if (value?.constraints) {
      const values: string[] = [];
      for (const key in value.constraints) {
        values.push(value.constraints[key]);
      }

      prevValue.push({
        [`${value.property}`]: values,
      });
    }

    if (value?.children[0]?.children) {
      const values: string[] = [];
      if (value?.children[0]?.children.length > 0) {
        for (const key in value?.children[0]?.children[0].constraints) {
          values.push(value?.children[0]?.children[0].constraints[key]);
        }
        prevValue.push({
          [`${value.property}`]: values,
        });
      } else {
        value?.children.forEach((children) => {
          for (const key in children.constraints) {
            values.push(children.constraints[key]);
          }
        });

        prevValue.push({
          [`${value.property}`]: values,
        });
      }
    }
    return prevValue;
  }, []);
};
