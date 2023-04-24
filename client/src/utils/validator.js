export default function validator(data, config) {
  let statusValidate;
  const errors = {};
  function validate(validateMethod, data, config) {
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === '';
        }

        break;
      }

      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);
        break;
      }
      case 'isContainDidgit': {
        const didgitRegExp = /\d+/g;
        statusValidate = !didgitRegExp.test(data);
        break;
      }

      case 'minLength': {
        statusValidate = data.length < config.value;
        break;
      }

      default:
        break;
    }

    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
