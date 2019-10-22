const today = new Date();

const targetDates = [...Array(7).keys()].map(after => {
  const originDate = new Date(today);

  originDate.setDate(today.getDate() + after);
  return originDate
    .toLocaleDateString()
    .split('. ')
    .map(Number);
});

for (let [year, month, date] of targetDates) {
  console.log(year, month, date);
}
