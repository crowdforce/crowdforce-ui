function getErrorMessage({ response }) {
  let message = 'Кажется, что-то пошло не так...';

  if (response) {
    message = response.data.message || response.data.error;
  }

  return message;
}

export default getErrorMessage;
