// application
import { useAppAction, useAppSelector } from '~/store/hooks';
import { whatsappClose, whatsappOpen } from '~/store/whatsapp/whatsappActions';
import { WHATSAPP_NAMESPACE } from '~/store/whatsapp/whatsappReducer';

export const useWhatsapp = () => useAppSelector((state) => state[WHATSAPP_NAMESPACE]);

export const useWhatsappClose = () => useAppAction(whatsappClose);

export const useWhatsappOpen = () => useAppAction(whatsappOpen);
