import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  maxLength,
  isString,
} from 'class-validator';
import { Post } from '../entities/post.entity';
import { PostTypeEnum } from '../enums/post-type.enum';

function checkStringType(value: string) {
  return isString(value);
}

function checkMaxLength(value: string) {
  return maxLength(value, 777);
}

export function IsValidContentValidate(
  value: string,
  args: ValidationArguments,
) {
  const { type } = args.object as Post;

  if (type === PostTypeEnum.REPOST) {
    if (value) return false;

    return true;
  }

  const isCorrectLength = checkMaxLength(value);
  const isCorrectType = checkStringType(value);

  return isCorrectLength && isCorrectType;
}

export function IsValidContentByType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidContent',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate: IsValidContentValidate,
        defaultMessage: (args: ValidationArguments) => {
          const { content, type } = args.object as Post;

          if (type === PostTypeEnum.REPOST) {
            if (content) return `Post of Type "Repost" cannot have a content`;
          }

          if (!checkStringType(content)) {
            return `Content must be a string`;
          }

          if (!checkMaxLength(content)) {
            return `Content must be shorter than or equal to 777 characters`;
          }
        },
      },
    });
  };
}
