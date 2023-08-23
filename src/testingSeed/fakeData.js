const testSnacks = [
  {
    "id": "nachos",
    "name": "Nachos",
    "description": "An American classic!",
    "recipe": "Cover expensive, organic tortilla chips with Cheez Whiz.",
    "serve": "Serve in a hand-thrown ceramic bowl, garnished with canned black olives"
  },
  {
    "id": "hummus",
    "name": "Hummus",
    "description": "Sure to impress your vegan friends!",
    "recipe": "Purchase one container of hummus.",
    "serve": "Place unceremoniously on the table, along with pita bread."
  }
];

const testDrinks = [
  {
    "id": "gin-and-tonic",
    "name": "Gin and Tonic",
    "description": "Like regular tonic, but with gin.",
    "recipe": "Mix 2 parts gin & 1 part tonic water.",
    "serve": "Serve in a tall glass over ice, garnished with a lime wedge."
  },
  {
    "id": "diet-coke",
    "name": "Diet Coke",
    "description": "Longtime fav",
    "recipe": "It's a secret",
    "serve": "Chilled, on ice"
  }
];

const newSnack = {
  "id": "new-snack",
  "name": "New Snack!",
  "description": "New snack description.",
  "recipe": "Just have fun out there.",
  "serve": "All day"
};

const newDrink = {
  "id": "new-drink",
  "name": "New Drink!",
  "description": "New drink description.",
  "recipe": "Just have fun out there.",
  "serve": "All day"
};

const fakeError = {
  response: {
    config: {
      url: "nope.com"
    },
    request: {
      status: "nope status"
    }
  }
};

export {
  testDrinks,
  testSnacks,
  newSnack,
  newDrink,
  fakeError
};