function timeAddZero(str: string) {
  return str.length <= 1 ? `0${str}` : str;
}

function getCurrentTime() {
  const currentTime = Date.now();
  const currentDate = new Date(currentTime);
  const year = currentDate.getFullYear().toString();
  const month = timeAddZero((currentDate.getMonth() + 1).toString());
  const day = timeAddZero(currentDate.getDate().toString());
  const hour = timeAddZero(currentDate.getHours().toString());
  const min = timeAddZero(currentDate.getMinutes().toString());
  const sec = timeAddZero(currentDate.getSeconds().toString());
  return year + month + day + hour + min + sec;
}

function random() {
  return Math.random()
    .toFixed(7)
    .substr(2);
}

const {npm_package_code} = process.env;

export const genBizId = ()=>{
  return `100${getCurrentTime()}${npm_package_code}0000${random()}`;
};
