function readingTime() {
  const body = " ";
  const splitWords = body.split(" ").length;
  const noOfWordPerMin = 225;
  const readLength = Math.ceil(splitWords / noOfWordPerMin) + " minute(s)";
  return readLength;
}

module.exports.readingTime = readingTime;
