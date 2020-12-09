export class Recipe {
  // constructor(
  //   title,
  //   picture,
  //   category,
  //   tags,
  //   instructions,
  //   ingredients,
  //   serveNum,
  //   quoted,
  //   user,
  //   isPublic,
  //   createdDate,
  //   updatedDate
  // ) {
  //   this.title = title;
  //   this.picture = picture;
  //   this.category = category;
  //   this.tags = tags;
  //   this.instructions = instructions;
  //   this.ingredients = ingredients;
  //   this.serveNum = serveNum;
  //   this.quoted = quoted;
  //   this.user = user;
  //   this.isPublic = isPublic;
  //   this.createdDate = createdDate;
  //   this.updatedDate = updatedDate || this.createdDate;
  //   this.star = 0;
  //   this.memo = '';
  // }
  constructor() {
    this.title = null;
    this.picture = [];
    this.category = [];
    this.tags = [];
    this.instructions = [];
    this.ingredients = {};
    this.serveNum = null;
    this.quoted = [];
    this.user = null;
    this.isPublic = undefined;
    this.createdDate = new Date();
    this.updatedDate = new Date();
    this.star = 0;
    this.memo = null;
  }

  set title(title) {
    this.title = title;
  }

  set picture(picture) {
    this.picture = picture;
  }

  set tags(tags) {
    this.tags = tags;
  }

  set category(category) {
    this.category = category;
  }

  set instructions(instructions) {
    this.instructions = instructions;
  }

  set ingredients(ingredients) {
    this.ingredients = ingredients;
  }

  set serveNum(serveNum) {
    this.serveNum = serveNum;
  }

  set quoted(quoted) {
    this.quoted = quoted;
  }

  set isPublic(isPublic) {
    this.isPublic = isPublic;
  }

  set user(user) {
    this.user = user;
  }

  set updatedDate(updatedDate) {
    this.updatedDate = updatedDate;
  }

  set star(num) {
    this.star = num;
  }

  changeServeNumTo(newServeNum) {
    return Math.round(newServeNum / this.serveNum);
  }
}

export const recipeConverter = {
  toFirestore(recipe) {
    return {
      title: recipe.title,
      picture: recipe.picture,
      category: recipe.category,
      tags: recipe.tags,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
      serveNum: recipe.serveNum,
      quoted: recipe.quoted,
      user: recipe.user,
      isPublic: recipe.isPublic,
      createdDate: recipe.createdDate,
      updatedDate: recipe.updatedDate,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Recipe(
      data.title,
      data.picture,
      data.category,
      data.tags,
      data.instructions,
      data.ingredients,
      data.serveNum,
      data.quoted,
      data.user,
      data.isPublic,
      data.createdDate,
      data.updatedDate
    );
  },
};
