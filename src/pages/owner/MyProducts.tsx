import { Link } from "react-router-dom";
import { useGetMyProductsQuery, useDeleteProductMutation } from "../../api/productApi";
import styles from "./MyProducts.module.css";

function MyProducts() {
  const { data, isLoading, error } = useGetMyProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

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
    return <p className={styles.status}>Loading your products...</p>;
  }

  if (error) {
    return <p className={styles.status}>You need to register a shop before adding products.</p>;
  }

  const products = data?.products ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>My Products</h1>
        <Link to="/dashboard/products/new" className={styles.addBtn}>
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className={styles.status}>You haven't added any products yet.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Image</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Stock</th>
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
                        <img src={product.imageUrl} alt={product.name} className={styles.thumbImg} />
                      ) : (
                        <span className={styles.noImg}>—</span>
                      )}
                    </div>
                  </td>
                  <td className={styles.td}>{product.name}</td>
                  <td className={styles.td}>KES {Number(product.price).toLocaleString()}</td>
                  <td className={styles.td}>{product.stock}</td>
                  <td className={styles.td}>
                    <span className={product.isActive ? styles.activeBadge : styles.inactiveBadge}>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <Link to={`/dashboard/products/${product.id}/edit`} className={styles.editLink}>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className={styles.deleteBtn}
                        disabled={isDeleting}
                      >
                        Delete
                      </button>
                    </div>
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

export default MyProducts;