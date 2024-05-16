'use client';
import Close from '@icon/close_search.svg';
import EmptySearch from '@icon/empty_search.svg';
import Search from '@icon/search.svg';
import RemoveSearch from '@icon/remove_search.svg';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { currentUser } from '@/app/_stores/userStore';
import client, { FETCH_SOLPLACE_LOG } from '@/app/_utils/apis/apollo-client';
import styles from './SearchSolplace.module.css';
import _ from 'lodash';
import { useRouter } from 'next/navigation';

const SearchSolplace = ({ setShowSearch }: { setShowSearch: any }) => {
    const router = useRouter();
    const { user } = currentUser();
    const [page, setPage] = useState(1);

    const { data, error, loading, refetch } = useQuery(FETCH_SOLPLACE_LOG(page), {
        client,
        context: {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        },
    });
    const [searchText, setSearchText] = useState('');

    const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const removeSearchText = () => {
        setSearchText('');
    };

    const hideSearch = () => {
        setShowSearch(false);
    };

    const moveToRegisterNewSolplace = () => {
        router.push('/registerNewSolplace');
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.headerTitle}>솔플레이스 검색</span>
                    <button type="button" onClick={hideSearch}>
                        <Close />
                    </button>
                </div>

                <div className={styles.searchBackground}>
                    <div className={styles.searchContainer}>
                        {searchText?.length ? <Search /> : <EmptySearch />}
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="플레이스명을 검색해 주세요"
                            className={styles.searchInput}
                            value={searchText}
                            onChange={handleSearchText}
                        />
                        <button type="button" onClick={removeSearchText}>
                            <RemoveSearch />
                        </button>
                    </div>
                </div>
                <div className={styles.descContainer}>
                    내가 찾는 솔플레이스가 없다면,
                    <span className={styles.descHighlight}>새로운 솔플레이스를 추가해보세요!</span>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.button} onClick={moveToRegisterNewSolplace}>
                        새로운 솔플레이스 추가하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchSolplace;
