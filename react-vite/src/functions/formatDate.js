const formatDate = (created_at) => {
  const ymd = created_at.split(' ')[0];
  let [year, month, day] = ymd.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  month = months[Number(month) - 1]

  return `${month} ${day}, ${year}`;
}

export default formatDate;
