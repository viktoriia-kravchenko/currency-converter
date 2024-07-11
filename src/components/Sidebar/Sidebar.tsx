'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBAR_ELEMENTS } from '@/src/constants/Tabs';
import classNames from 'classnames';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <ul className={styles.list}>
        {SIDEBAR_ELEMENTS.map(el => {
          const isActive = el.url === pathname;

          return (
            <li className={styles.item} key={el.label}>
              <Link href={el.url} className={styles.link}>
                <span
                  className={classNames(styles.label, {
                    [styles.active]: isActive,
                  })}
                >
                  {el.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
