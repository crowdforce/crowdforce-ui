const formatDate = (date) => new Intl.DateTimeFormat('ru-RU').format(new Date(date));

export default formatDate;
