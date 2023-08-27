declare type NotificationType = "off" | "assertive" | "polite";
interface IAccessibilityNotificationProps {
    role?: "alert" | string;
    notificationType?: NotificationType;
    announceAccessibilityNotification?: boolean;
}
export { NotificationType, IAccessibilityNotificationProps };
export default IAccessibilityNotificationProps;
