import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
export const deliveryOptions = [{
  id: '1',
  deliveryDate: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDate: 5,
  priceCents: 499
},{
  id: '3',
  deliveryDate: 3,
  priceCents: 999
}]

export function getDeliveryOption (deliveryOption) {
  deliveryOptions.forEach(option => {
    if(option.id === deliveryOption) {
      deliveryOption = option;
    }
  })

  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  // const today = dayjs();
  // const deliveryDate = today.add(
  //   deliveryOption.deliveryDays,
  //   'days'
  // );
  let remainingDays = deliveryOption.deliveryDate;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    
    if (!isWeekend(deliveryDate)) {
      remainingDays--;
      // This is a shortcut for:
      // remainingDays = remainingDays - 1;
    }
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  return dateString;
}