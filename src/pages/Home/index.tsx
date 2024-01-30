import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './home.module.scss';

import Select, { IOption } from '@/components/Select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  currenciesSelector,
  fetchСurrencies,
} from '@/store/slices/currencySlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const { result, loading } = useAppSelector(currenciesSelector);

  const [currency, setCurrnecy] = useState<IOption>({ label: '', value: '' });

  useEffect(() => {
    dispatch(fetchСurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (result?.length) {
      const { id, name } = result[0];

      setCurrnecy({ label: id, value: name });
    }
  }, [result]);

  const selectOptions = useMemo(() => {
    if (!result) return [];

    return result.map(({ id, name }) => ({
      label: id,
      value: name,
    }));
  }, [result]);

  const handleSelectCurrency = useCallback((value: IOption) => {
    setCurrnecy(value);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.top__info}>
            <h1 className={styles.top__header}>
              <span>CAT</span>
              currencies academic terms
            </h1>
            <Select
              name="currencies"
              options={selectOptions}
              onChange={handleSelectCurrency}
              value={currency}
              disabled={loading}
            />
          </div>
          <img
            className={styles.top__image}
            src="/public/images/Kitten.png"
            alt="kitten"
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.container}>
          <h3 className={styles.bottom__currency}>{currency.value}</h3>
        </div>
      </div>
    </div>
  );
}
