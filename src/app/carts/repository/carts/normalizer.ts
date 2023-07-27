import type {
  Cart,
  CartRoot,
  NonNullableCarts,
  NormalizedCarts,
} from "../../model/carts/types";

/**
 * @function mapCarts
 * @param {CartsRoot["carts"]} carts
 * @returns {Cart[]}
 */
const mapCarts = (carts?: CartRoot["carts"]): NonNullableCarts[] => {
  const result = carts?.reduce((acc: NonNullableCarts[], current) => {
    if (!current) return acc;

    acc.push({
      ...current,
      id: current.id || 0,
      total: current.total || 0,
      userId: current.userId || 0,
      totalProducts: current.totalProducts || 0,
      totalQuantity: current.totalQuantity || 0,
    });

    return acc;
  }, []);

  return result ?? [];
};

/**
 * @function normalizeCarts
 * @param {CartsRoot} data
 * @returns {NormalizedCarts[]}
 */
export const normalizeCarts = (data?: CartRoot): NormalizedCarts => {
  const dt: Partial<CartRoot> = data ?? {};
  const carts = dt.carts || [];

  return {
    carts: mapCarts(carts),
    total: dt.total || 0,
    skip: dt.skip || 0,
    limit: dt.limit || 0,
  };
};
