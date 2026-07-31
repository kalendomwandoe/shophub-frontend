import { Link } from "react-router-dom";
import {
  useGetAllShopsForAdminQuery,
  useApproveShopMutation,
  useSuspendShopMutation,
  useUnsuspendShopMutation,
} from "../../api/shopApi";
import styles from "./ManageBoutiques.module.css";

function ManageBoutiques() {
  const { data, isLoading, error } = useGetAllShopsForAdminQuery();
  const [approveShop, { isLoading: isApproving }] = useApproveShopMutation();
  const [suspendShop, { isLoading: isSuspending }] = useSuspendShopMutation();
  const [unsuspendShop, { isLoading: isUnsuspending }] = useUnsuspendShopMutation();

  const isBusy = isApproving || isSuspending || isUnsuspending;

  const handleApprove = async (id: string) => {
    try {
      await approveShop(id).unwrap();
    } catch (err) {
      console.error("Failed to approve shop:", err);
    }
  };

  const handleSuspend = async (id: string, name: string) => {
    const confirmed = window.confirm(`Suspend "${name}"? It will be hidden from customers.`);
    if (!confirmed) return;

    try {
      await suspendShop(id).unwrap();
    } catch (err) {
      console.error("Failed to suspend shop:", err);
    }
  };

  const handleUnsuspend = async (id: string) => {
    try {
      await unsuspendShop(id).unwrap();
    } catch (err) {
      console.error("Failed to unsuspend shop:", err);
    }
  };

  if (isLoading) {
    return <p className={styles.status}>Loading boutiques...</p>;
  }

  if (error) {
    return <p className={styles.status}>Something went wrong. Please try again.</p>;
  }

  const shops = data?.shops ?? [];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Boutique Management</h1>

      {shops.length === 0 ? (
        <p className={styles.status}>No boutiques registered yet.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Boutique</th>
                <th className={styles.th}>Owner</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop.id} className={styles.tr}>
                  <td className={styles.td}>
                    <Link to={`/boutiques/${shop.id}`} className={styles.shopLink}>
                      {shop.name}
                    </Link>
                  </td>
                  <td className={styles.td}>
                    {shop.owner ? (
                      <div className={styles.ownerCell}>
                        <span>{shop.owner.name}</span>
                        <span className={styles.ownerEmail}>{shop.owner.email}</span>
                      </div>
                    ) : (
                      <span className={styles.muted}>—</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    {shop.isSuspended ? (
                      <span className={styles.suspendedBadge}>Suspended</span>
                    ) : shop.isApproved ? (
                      <span className={styles.approvedBadge}>Approved</span>
                    ) : (
                      <span className={styles.pendingBadge}>Pending</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      {!shop.isApproved && (
                        <button
                          onClick={() => handleApprove(shop.id)}
                          className={styles.approveBtn}
                          disabled={isBusy}
                        >
                          Approve
                        </button>
                      )}
                      {shop.isSuspended ? (
                        <button
                          onClick={() => handleUnsuspend(shop.id)}
                          className={styles.unsuspendBtn}
                          disabled={isBusy}
                        >
                          Unsuspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSuspend(shop.id, shop.name)}
                          className={styles.suspendBtn}
                          disabled={isBusy}
                        >
                          Suspend
                        </button>
                      )}
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

export default ManageBoutiques;