export const trimText = (text, limit) => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

//날짜를 나타내는 javascript 내장함수이다. 아래의 링크를 참조하자
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
export const formatDate = date => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("ko", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};