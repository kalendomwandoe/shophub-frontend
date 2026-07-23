import { Link } from "react-router-dom";
import { useGetMyProductsQuery } from "../../api/productApi";
import { useGetMyShopQuery } from "../../api/shopApi";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { data: productsData, isLoading: productsLoading } = useGetMyProductsQuery();
  const { data: shopData, isLoading: shopLoading } = useGetMyShopQuery();

  if (productsLoading || shopLoading) {
    return <p className={styles.status}>Loading dashboard...</p>;
  }

  const products = productsData?.products ?? [];
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const shop = shopData?.shop;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Dashboard</h1>

      {shop && (
        <div className={styles.shopBanner}>
          <span>{shop.name}</span>
          {!shop.isApproved && (
            <span className={styles.pendingBadge}>Pending admin approval</span>
          )}
        </div>
      )}

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Products</p>
          <p className={styles.statValue}>{totalProducts}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Active Products</p>
          <p className={styles.statValue}>{activeProducts}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Inactive Products</p>
          <p className={styles.statValue}>{totalProducts - activeProducts}</p>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.recentHeader}>
          <h2 className={styles.recentHeading}>Recent Products</h2>
          <Link to="/dashboard/products" className={styles.viewAllLink}>
            View all →
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <p className={styles.status}>No products yet. Add your first one to get started.</p>
        ) : (
          <div className={styles.recentList}>
            {recentProducts.map((product) => (
              <Link
                to={`/dashboard/products/${product.id}/edit`}
                key={product.id}
                className={styles.recentItem}
              >
                <span className={styles.recentName}>{product.name}</span>
                <span className={styles.recentPrice}>
                  KES {Number(product.price).toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;