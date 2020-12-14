const ingredientsValHelperSpaceWithNum = (line) => {
  const regexp = /\D+[\s\t].+/g;
  const array = line.match(regexp) ? line.match(regexp) : [];
  return array.length === 1;
};

export const ingredientsValidation = (value) => {
  const regexp = /\n/g;
  const array = value.match(regexp) ? value.match(regexp) : [];
  const num = array.length;
  const valiArr = [];

  if (num < 1) {
    valiArr[0] = ingredientsValHelperSpaceWithNum(value);
  }
  if (num > 0) {
    const items = value.split(regexp).filter((item) => item !== '');
    let time = 0;
    while (time < items.length) {
      valiArr[time] = ingredientsValHelperSpaceWithNum(items[time]);
      time += 1;
    }
  }
  return !valiArr.filter((item) => item === false).length > 0;
};

export const instructionValidation = (value) => {};

export const validation = {
  title: {
    required: 'タイトルは必ず入力してください。',
    maxLength: {
      value: 20,
      message: 'タイトルは20文字以内で入力してください。',
    },
  },
  cookingTime: {},
  yeild: {
    required: 'できあがりの量（○人分）は必ず入力してください',
    setValueAs: (value) => parseInt(value, 10),
    min: {
      value: 1,
      message: 'できあがりの量は1以上にしてください',
    },
  },
  ingredients: {
    required: '材料は必ず入力してください。',
    validate: (value) => ingredientsValidation(value),
    message:
      '1材料につき1行ずつ、「材料名 （半角スペース）分量」で入力してください',
  },
  instructions: {
    required: '作り方は必ず入力してください',
  },
  memo: {},
  star: {
    setValueAs: (value) => parseInt(value, 10),
  },
  quoted: {},
  isPublic: {},
  category: {},
  tags: {},
};

// 'ご飯 1膳\nにんじん 1/2個\nしょうゆ100選 大さじ1\n水	カップ5〜6杯'.match()
// 'ご飯 1膳'.match(/[\s\t]\D*\d*\D*/g);
// 'にんじん 1/2個'.match(/[\s\t]\D*\d*\D*/g);
// 'しょうゆ100選 大さじ1'.match(/[\s\t]\D*\d*\D*/g);
// '水	カップ5〜6杯'.match(/[\s\t]\D*\d*\D*/g);
// 'しょうゆ100選 大さじ1'.match(/[\s\t]\D*\d*\D*/g);
