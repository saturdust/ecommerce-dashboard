const transformToTitleCase = (input: string): string => {
  const words = input.split("-");

  const transformedWords = words.map((word) => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
  });

  return transformedWords.join(" ");
};

export default transformToTitleCase;
