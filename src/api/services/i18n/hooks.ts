// react
import { useContext, useMemo } from 'react';
// application
import { getAllLanguages } from '~/api/services/i18n/utils';
import { IDirection, ILanguage } from '~/interfaces/language';
import { LanguageLocaleContext, LanguageSetLocaleContext } from '~/api/services/i18n/context';

export function useLocale() {
    return useContext(LanguageLocaleContext);
}

export function useSetLocale() {
    return useContext(LanguageSetLocaleContext);
}

export function useLanguage(): ILanguage {
    const locale = useLocale();

    return useMemo(() => getAllLanguages().find((language) => language.locale === locale)!, [locale]);
}

export function useDirection(): IDirection {
    const { direction } = useLanguage();

    return direction;
}
