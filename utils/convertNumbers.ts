export const converNumbers = (num: number) => {
  const numbers = `۰۱۲۳٤٥٦٧۸۹`;

  let finalNumber: string = "";

  for (let c of num.toString()) {
    finalNumber += numbers.charAt(+c);
  }

  return finalNumber;
};
