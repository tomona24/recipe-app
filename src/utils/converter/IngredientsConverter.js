export class Ingredients {
  constructor(name, potion, bfrUnit, aftUnit) {
    this.name = name;
    this.potion = potion;
    this.bfrUnit = bfrUnit;
    this.aftUnit = aftUnit;
  }

  changePotionTo(times) {
    return this.potion * times;
  }
}

export const ingredientsConverter = {
  toFirestore(ingredients) {
    return {
      name: ingredients.name,
      picture: ingredients.potion,
      category: ingredients.bfrUnit,
      tags: ingredients.aftUnit,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Ingredients(data.name, data.potion, data.bfrUnit, data.aftUnit);
  },
};
