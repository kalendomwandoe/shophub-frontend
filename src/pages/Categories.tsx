import { Link } from "react-router-dom";
import { categoryOptions } from "../utils/categoryLabels";
import styles from "./Categories.module.css";

function Categories() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shop by Category</h1>

      <div className={styles.grid}>
        {categoryOptions.map((cat) => (
          <Link to={`/categories/${cat.value}`} key={cat.value} className={styles.card}>
            <span className={styles.label}>{cat.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;