import { Link } from "react-router-dom";
import { useGetAllShopsForAdminQuery } from "../../api/shopApi";
import { useGetAllProductsForAdminQuery } from "../../api/productApi";
import { useGetAllUsersQuery } from "../../api/userApi";
import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const { data: shopsData, isLoading: shopsLoading } = useGetAllShopsForAdminQuery();
  const { data: productsData, isLoading: productsLoading } = useGetAllProductsForAdminQuery();
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();

  const isLoading = shopsLoading || productsLoading || usersLoading;

  if (isLoading) {
    return <p className={styles.status}>Loading dashboard...</p>;
  }

  const shopCount = shopsData?.shops.length ?? 0;
  const productCount = productsData?.products.length ?? 0;
  const userCount = usersData?.users.length ?? 0;

  const pendingShops = (shopsData?.shops ?? []).filter(
    (shop) => !shop.isApproved && !shop.isSuspended
  ).length;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Boutiques</p>
          <p className={styles.statValue}>{shopCount}</p>
        </div>

        <Link to="/admin/boutiques" className={styles.statCardLink}>
          <p className={styles.statLabel}>Pending Approval</p>
          <p className={styles.statValue}>{pendingShops}</p>
        </Link>

        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Products</p>
          <p className={styles.statValue}>{productCount}</p>
        </div>

        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Users</p>
          <p className={styles.statValue}>{userCount}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;