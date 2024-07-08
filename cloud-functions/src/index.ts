// index.ts
import {sendEmailOnMessageReceived} from "./notify-admin-on-message-received";
import {sendEmailOnOrderReceived} from "./notify-admin-on-order-received";

// Exportez les fonctions individuelles comme des fonctions cloud
export const _sendEmailOnMessageReceived = sendEmailOnMessageReceived;
export const _sendEmailOnOrderReceived = sendEmailOnOrderReceived;
