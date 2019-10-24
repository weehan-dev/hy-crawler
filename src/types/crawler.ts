export type typesAndDietsList = typeAndDiets[];

export type typeAndDiets = {
  type?: string;
  diets?: string;
  date?: string | Date;
};

export type DietData = {
  imageUrl?: string;
  price?: string;
  mealKor?: string;
  mealEng?: string;
};
