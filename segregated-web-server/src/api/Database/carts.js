const carts = [
  {
    id: 1,
    userId: 1,
    date: "2019-12-15",
    products: [
      { productId: 1, quantity: 10 },
      { productId: 5, quantity: 1 },
    ],
  },
  {
    id: 2,
    userId: 1,
    date: "2022-01-21",
    products: [
      { productId: 9, quantity: 4 },
      { productId: 5, quantity: 2 },
    ],
  },
  {
    id: 3,
    userId: 2,
    date: "2024-06-17",
    products: [
      { productId: 4, quantity: 4 },
      { productId: 8, quantity: 1 },
    ],
  },
  {
    id: 4,
    userId: 3,
    date: "2020-10-07",
    products: [
      { productId: 3, quantity: 3 },
      { productId: 7, quantity: 5 },
    ],
  },
];

module.exports = { carts };
