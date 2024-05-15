'use client';
import { SolplaceFetchData, currentPage, currentSolplaces } from '@/app/_stores/solplaceStore';
import { currentUser } from '@/app/_stores/userStore';
import client, { FETCH_SOLPLACE_LOG } from '@/app/_utils/apis/apollo-client';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import styles from './SolplaceComponent.module.css';
import LocationFlag from '@icon/location_flag.svg';
import NewSolplaceButton from '@icon/new_solplace_button.svg';
import { useRouter } from 'next/navigation';

const SolplaceComponent = (prop: any) => {
    const router = useRouter();
    const { user } = currentUser();
    const { page, setPage } = currentPage();
    const { solplaces, setSolplaces } = currentSolplaces();
    const [isFinish, setIsFinish] = useState(false);
    const { data, error, loading, refetch } = useQuery(FETCH_SOLPLACE_LOG(page), {
        client,
        context: {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        },
    });

    useEffect(() => {
        refetchData;
    }, []);

    useEffect(() => {
        const fetchData = data?.fetchSolplaceLogs;
        if (!fetchData?.length) {
            setIsFinish(true);
        } else {
            const nextSolplaceLogs = fetchData.map((data: SolplaceFetchData) => {
                return {
                    id: data.id,
                    userId: data.userId,
                    introduction: data.introduction,
                    solplaceName: data.solplaceName,
                    images: JSON.parse(data.images),
                    createdAt: new Date(data.createdAt),
                    updatedAt: new Date(data.updatedAt),
                    deletedAt: data.deletedAt ? new Date(data.deletedAt) : null,
                };
            });
            const merged = [...solplaces, ...nextSolplaceLogs];
            const unique = _.uniqBy(merged, 'id');

            setSolplaces(unique);
            setIsFinish(false);
        }
    }, [data]);

    useEffect(() => {
        if (!user.accessToken) {
            return;
        }
        refetchData();
    }, [page]);

    const refetchData = async () => {
        const nextData = await refetch();
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    const moveToReigstSolplace = () => {
        if (user.accessToken) {
            router.push('/registerSolplace');
        } else {
        }
    };

    const scrollHandling = _.debounce((e) => {
        console.log(e.nativeEvent);
    }, 100);

    return (
        <>
            <div className={styles.gridContainer} onScroll={scrollHandling}>
                {solplaces.map((solplace, index) => {
                    return (
                        <div key={`solplce_${index}`} className={styles.gridCellContainer}>
                            <Image
                                src={solplace.images[0]}
                                alt={solplace.solplaceName}
                                width={154}
                                height={231}
                                className={styles.gridCellImage}
                            />

                            <div className={styles.gridCellDescContainer}>
                                <div className={styles.solplaceNameContainer}>{solplace.solplaceName}</div>
                                <div className={styles.solplaceIntroductionContainer}>{solplace.introduction}</div>
                                <div className={styles.solplaceLocationContainer}>
                                    <LocationFlag width={12} height={12} />
                                    <span>서울시</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                style={{
                    position: 'fixed',
                    width: '52px',
                    height: '52px',
                    bottom: '76px',
                    right: '20px',
                    backgroundColor: '#497CFF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '26px',
                }}
                onClick={moveToReigstSolplace}
            >
                <NewSolplaceButton />
            </button>
        </>
    );
};

export default SolplaceComponent;
