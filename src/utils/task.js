import dayjs from 'dayjs';

export const convertDatePopup = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
