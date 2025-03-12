/* eslint-disable react/prop-types */
import { formatProductsResult } from "../../../utils";
import ProductItem from "./ProductItem";

export default function ProductList({ products, searchText }) {
  const formatedProducts = products?.length
    ? formatProductsResult(
        products.filter((product) => product.name.includes(searchText))
      )
    : [];

  return (
    <div>
      {formatedProducts.length === 0 && (
        <h1 className="mt-4 text-lg font-semibold  max-sm:text-center">
          No Match Found
        </h1>
      )}
      {formatedProducts.length > 0 &&
        formatedProducts.map((category) => (
          <div className="mb-8" key={category.categoryName}>
            <h1 className="mb-4 text-lg font-semibold max-sm:text-center">
              {category.categoryName}
            </h1>
            <div className="flex flex-wrap gap-x-2 gap-y-3 max-sm:justify-evenly max-xs:justify-center">
              {category.products.map((product) => (
                <ProductItem
                  key={product.name}
                  name={product.name}
                  product={product}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
