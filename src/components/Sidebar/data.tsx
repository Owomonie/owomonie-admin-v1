// Focused Icons
const focusedUserIcon = new URL(
  "../../assets/sidebar-icons/focused/user.png",
  import.meta.url
).href;

const focusedNotificationIcon = new URL(
  "../../assets/sidebar-icons/focused/notification.png",
  import.meta.url
).href;

const focusedTransactionIcon = new URL(
  "../../assets/sidebar-icons/focused/transaction.png",
  import.meta.url
).href;

const focusedAnalyticIcon = new URL(
  "../../assets/sidebar-icons/focused/analytic.png",
  import.meta.url
).href;

// const focusedMonitoringIcon = new URL(
//   "../../assets/sidebar-icons/focused/monitoring.png",
//   import.meta.url
// ).href;

// const focusedSupportIcon = new URL(
//   "../../assets/sidebar-icons/focused/support.png",
//   import.meta.url
// ).href;

// const focusedSettingsIcon = new URL(
//   "../../assets/sidebar-icons/focused/settings.png",
//   import.meta.url
// ).href;

// Unfocused Icons
const unfocusedUserIcon = new URL(
  "../../assets/sidebar-icons/unfocused/user.png",
  import.meta.url
).href;

const unfocusedNotificationIcon = new URL(
  "../../assets/sidebar-icons/unfocused/notification.png",
  import.meta.url
).href;

const unfocusedTransactionIcon = new URL(
  "../../assets/sidebar-icons/unfocused/transaction.png",
  import.meta.url
).href;

const unfocusedAnalyticIcon = new URL(
  "../../assets/sidebar-icons/unfocused/analytic.png",
  import.meta.url
).href;

const unfocusedMonitoringIcon = new URL(
  "../../assets/sidebar-icons/unfocused/monitoring.png",
  import.meta.url
).href;

const unfocusedSupportIcon = new URL(
  "../../assets/sidebar-icons/unfocused/support.png",
  import.meta.url
).href;

const unfocusedSettingsIcon = new URL(
  "../../assets/sidebar-icons/unfocused/settings.png",
  import.meta.url
).href;

export interface SidebarItem {
  focusedIcon: string;
  unfocusedIcon: string;
  title: string;
  link: string;
}

export const SidebarData: SidebarItem[] = [
  {
    focusedIcon: focusedUserIcon,
    unfocusedIcon: unfocusedUserIcon,
    title: "User Management",
    link: "/",
  },

  {
    focusedIcon: focusedNotificationIcon,
    unfocusedIcon: unfocusedNotificationIcon,
    title: "Notifications",
    link: "/notifications",
  },

  {
    focusedIcon: focusedTransactionIcon,
    unfocusedIcon: unfocusedTransactionIcon,
    title: "Transactions",
    link: "/transactions",
  },

  {
    focusedIcon: focusedAnalyticIcon,
    unfocusedIcon: unfocusedAnalyticIcon,
    title: "Analytic",
    link: "/analytic",
  },

  {
    focusedIcon: unfocusedMonitoringIcon,
    unfocusedIcon: unfocusedMonitoringIcon,
    title: "System Monitoring",
    link: "/monitoring",
  },

  {
    focusedIcon: unfocusedSupportIcon,
    unfocusedIcon: unfocusedSupportIcon,
    title: "User Support",
    link: "/user-support",
  },

  {
    focusedIcon: unfocusedSettingsIcon,
    unfocusedIcon: unfocusedSettingsIcon,
    title: "Settings",
    link: "/settings",
  },
];
