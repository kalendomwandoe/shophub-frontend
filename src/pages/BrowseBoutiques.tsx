import { Link } from "react-router-dom";
import { useGetAllShopsQuery } from "../api/shopApi";
import styles from "./BrowseBoutiques.module.css";

function BrowseBoutiques() {
  const { data, isLoading, error } = useGetAllShopsQuery();

  if (isLoading) {
    return <p className={styles.status}>Loading boutiques...</p>;
  }

  if (error) {
    return <p className={styles.status}>Something went wrong. Please try again.</p>;
  }

  const shops = data?.shops ?? [];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Browse Boutiques</h1>

      {shops.length === 0 ? (
        <p className={styles.status}>No boutiques available yet.</p>
      ) : (
        <div className={styles.grid}>
      {shops.map((shop) => (
  <Link to={`/boutiques/${shop.id}`} key={shop.id} className={styles.card}>
    <div className={styles.imageWrapper}>
      {shop.coverUrl ? (
        <img src={shop.coverUrl} alt={shop.name} className={styles.image} />
      ) : (
        <span className={styles.noImage}>{shop.name.charAt(0)}</span>
      )}
    </div>
    <div className={styles.cardInfo}>
      <h2 className={styles.shopName}>{shop.name}</h2>
      {shop.description && <p className={styles.shopDescription}>{shop.description}</p>}
      {shop.address && <p className={styles.shopAddress}>{shop.address}</p>}
    </div>
  </Link>
))}
        </div>
      )}
    </div>
  );
}

export default BrowseBoutiques;