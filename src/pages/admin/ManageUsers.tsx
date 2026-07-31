import {
  useGetAllUsersQuery,
  useSuspendUserMutation,
  useUnsuspendUserMutation,
} from "../../api/userApi";
import { useAppSelector } from "../../hooks/reduxHooks";
import styles from "./ManageUsers.module.css";

function ManageUsers() {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();
  const [unsuspendUser, { isLoading: isUnsuspending }] = useUnsuspendUserMutation();

  const currentUser = useAppSelector((state) => state.auth.user);
  const isBusy = isSuspending || isUnsuspending;

  const handleSuspend = async (id: string, name: string) => {
    const confirmed = window.confirm(`Suspend ${name}? They won't be able to log in.`);
    if (!confirmed) return;

    try {
      await suspendUser(id).unwrap();
    } catch (err) {
      console.error("Failed to suspend user:", err);
    }
  };

  const handleUnsuspend = async (id: string) => {
    try {
      await unsuspendUser(id).unwrap();
    } catch (err) {
      console.error("Failed to unsuspend user:", err);
    }
  };

  if (isLoading) {
    return <p className={styles.status}>Loading users...</p>;
  }

  if (error) {
    return <p className={styles.status}>Something went wrong. Please try again.</p>;
  }

  const users = data?.users ?? [];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Management</h1>
      <p className={styles.subheading}>{users.length} registered users</p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isSelf = user.id === currentUser?.id;
              const isAdmin = user.role === "ADMIN";

              return (
                <tr key={user.id} className={styles.tr}>
                  <td className={styles.td}>
                    {user.name}
                    {isSelf && <span className={styles.youTag}>you</span>}
                  </td>
                  <td className={styles.td}>{user.email}</td>
                  <td className={styles.td}>
                    <span className={styles.roleBadge}>{user.role}</span>
                  </td>
                  <td className={styles.td}>
                    {user.isSuspended ? (
                      <span className={styles.suspendedBadge}>Suspended</span>
                    ) : (
                      <span className={styles.activeBadge}>Active</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    {isAdmin ? (
                      <span className={styles.muted}>—</span>
                    ) : user.isSuspended ? (
                      <button
                        onClick={() => handleUnsuspend(user.id)}
                        className={styles.unsuspendBtn}
                        disabled={isBusy}
                      >
                        Unsuspend
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSuspend(user.id, user.name)}
                        className={styles.suspendBtn}
                        disabled={isBusy}
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;