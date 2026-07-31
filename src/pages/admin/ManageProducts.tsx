import {
  useGetAllProductsForAdminQuery,
  useDeleteProductAsAdminMutation,
} from "../../api/productApi";
import styles from "./ManageProducts.module.css";

function ManageProducts() {
  const { data, isLoading, error } = useGetAllProductsForAdminQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductAsAdminMutation();

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`Delete "${name}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  if (isLoading) {
    return <p className={styles.status}>Loading products...</p>;
  }

  if (error) {
    return <p className={styles.status}>Something went wrong. Please try again.</p>;
  }

  const products = data?.products ?? [];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Product Management</h1>
      <p className={styles.subheading}>{products.length} products on the platform</p>

      {products.length === 0 ? (
        <p className={styles.status}>No products on the platform yet.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Image</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Shop</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.thumbnail}>
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={styles.thumbImg}
                        />
                      ) : (
                        <span className={styles.noImg}>—</span>
                      )}
                    </div>
                  </td>
                  <td className={styles.td}>{product.name}</td>
                  <td className={styles.td}>
                    {product.shop ? (
                      product.shop.name
                    ) : (
                      <span className={styles.muted}>—</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    KES {Number(product.price).toLocaleString()}
                  </td>
                  <td className={styles.td}>
                    <span
                      className={product.isActive ? styles.activeBadge : styles.inactiveBadge}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className={styles.deleteBtn}
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageProducts;