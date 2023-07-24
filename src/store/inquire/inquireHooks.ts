// application
import { INQUIRE_NAMESPACE } from '~/store/inquire/inquireReducer';
import { inquireClose, inquireOpen } from '~/store/inquire/inquireActions';
import { useAppAction, useAppSelector } from '~/store/hooks';

export const useInquire = () => useAppSelector((state) => state[INQUIRE_NAMESPACE]);

export const useInquireClose = () => useAppAction(inquireClose);

export const useInquireOpen = () => useAppAction(inquireOpen);
