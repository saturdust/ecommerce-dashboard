import type {
  NonNullableProduct,
  NormalizedProducts,
  Product,
  ProductsRoot,
} from "../../model/products/types";

/**
 * @function mapProducts
 * @param {ProductsRoot["products"]} products
 * @returns {Product[]}
 */
const mapProducts = (
  products?: ProductsRoot["products"]
): NonNullableProduct[] => {
  const result = products?.reduce((acc: NonNullableProduct[], current) => {
    if (!current) return acc;

    acc.push({
      ...current,
      id: current.id || 0,
      title: current.title || "",
      price: current.price || 0,
      stock: current.stock || 0,
    });

    return acc;
  }, []);

  return result ?? [];
};

/**
 * @function normalizeProducts
 * @param {ProductsRoot} data
 * @returns {NormalizedProducts[]}
 */
export const normalizeProducts = (data?: ProductsRoot): NormalizedProducts => {
  const dt: Partial<ProductsRoot> = data ?? {};
  const products = dt.products || [];

  return {
    products: mapProducts(products),
    total: dt.total || 0,
    skip: dt.skip || 0,
    limit: dt.limit || 0,
  };
};
