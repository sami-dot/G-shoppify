/**
 *
 * @param {[]} products
 * @returns {[{categoryName:"",products:[]}]}
 */
export const formatProductsResult = (products) => {
  let arr = {};
  products.forEach((product) => {
    let categoryName = product.category;
    if (!arr[categoryName]) {
      arr[categoryName] = { categoryName, products: [product] };
    } else {
      arr[categoryName]["products"].push(product);
    }
  });
  return Object.values(arr);
};

export const formatCartProductsResult = (products) => {
  let arr = {};
  products.forEach((product) => {
    let categoryName = product.product.category;
    let payload = { ...product.product, quantity: product.quantity };
    if (!arr[categoryName]) {
      arr[categoryName] = { categoryName, products: [payload] };
    } else {
      arr[categoryName]["products"].push(payload);
    }
  });
  return Object.values(arr);
};

// let data = [
//   { category: 'fruit', id: '1', name: 'apple' },
//   { category: 'fruit', id: '2', name: 'banana' },
//   { category: 'fruit', id: '3', name: 'orange' },
//   { category: 'diary', id: '4', name: 'milk' },
//   { category: 'diary', id: '5', name: 'yoghurt' },
//   { category: 'vegitables', id: '6', name: 'carrot' },
// ];

// const formatData = datas => {
//   let arr = {};
//   datas.forEach(d => {
//     let categoryName = d.category;

//     if (!arr[categoryName]) {
//       arr[categoryName] = { categoryName, products: [d] };
//     } else {
//       arr[categoryName]['products'].push(d);
//     }
//   });
//   return Object.values(arr);
// };

// let result = formatData(data);
// console.log(result);

// let initial = {
//   isShowCartList: true,
//   isShowProductPreview: false,
//   isShowCartListEdit: false,
//   isShowProductAddForm: false,
// };

// for (const key of Object.keys(initial)) {
//   if (key === 'isShowCartListEdit') {
//     initial[key] = true;
//   } else {
//     initial[key] = false;
//   }
// }
// console.log(initial);

// let mock = [
//   {
//     categoryName: "fruit",
//     products: [
//       { _id: "one", quantity: 1 },
//       { _id: "oneor", quantity: 2 },
//     ],
//   },
//   { categoryName: "meat", products: [{ _id: "two", quantity: 2 }] },
//   { categoryName: "vegetable", products: [{ _id: "three", quantity: 1 }] },
// ];
// const result = formatCartItems(mock);
// console.log(result);
export const formatCartItems = (cartItems = []) => {
  let arr = [];
  cartItems.forEach((category) => {
    // console.log(category.categoryName);
    category.products.forEach((product) => {
      arr.push({ product: product._id, quantity: product.quantity });
    });
  });

  return arr;
};

export const customDateFormat = (inputDate) => {
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleString("en", {
    weekday: "short",
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });
  return formattedDate;
};
