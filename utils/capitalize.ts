function capitalizeFirstLetter(str: string) {
  // converting first letter to uppercase
  const capitalized = str.replace(/^./, str[0].toUpperCase());

  return capitalized;
}

export default capitalizeFirstLetter;
