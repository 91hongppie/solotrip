'use client';
import { Solplace, SolplaceFetchData, currentNewSolplace, currentPage, currentSolplaces } from '@/app/_stores/solplaceStore';
import { currentScroll, currentUser } from '@/app/_stores/userStore';
import client, { FETCH_SOLPLACE_LOG } from '@/app/_utils/apis/apollo-client';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import styles from './SolplaceComponent.module.css';
import LocationFlag from '@icon/location_flag.svg';
import NewSolplaceButton from '@icon/new_solplace_button.svg';
import { useRouter } from 'next/navigation';
import { dataConvertor } from '@/app/_utils/data-convertor';

const SolplaceComponent = (prop: any) => {
    const router = useRouter();
    const { scroll, setScroll } = currentScroll();
    const containerRef = useRef<HTMLDivElement>(null);
    const { user } = currentUser();
    const { page, setPage } = currentPage();
    const { solplaces, setSolplaces } = currentSolplaces();
    const [isFinish, setIsFinish] = useState(false);
    const { setNewSolplace } = currentNewSolplace();
    const { data, refetch } = useQuery(FETCH_SOLPLACE_LOG(page), {
        client,
        context: {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        },
    });

    useEffect(() => {
        refetchData();
        setNewSolplace({});
        containerRef.current?.scrollTo(0, scroll);
    }, []);

    useEffect(() => {
        const fetchData = data?.fetchSolplaceLogs;
        const isLastPage = !fetchData?.length;
        if (isLastPage) {
            setIsFinish(true);
        } else {
            const nextSolplaceLogs = fetchData.map((data: SolplaceFetchData) => {
                return dataConvertor(data);
            });
            const merged = [...solplaces, ...nextSolplaceLogs];
            const unique = _.uniqBy(merged, 'id');

            console.log(unique);
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
        await refetch();
    };

    const nextPage = () => {
        if (isFinish) {
            return;
        }
        setPage(page + 1);
    };

    const moveToReigstSolplace = () => {
        saveScroll();
        if (user.accessToken) {
            router.push('/registerSolplaceLog');
        } else {
            router.push('/reqLogin');
        }
    };

    const scrollHandling = _.debounce((e) => {
        if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight - 400) {
            nextPage();
        }
        saveScroll();
    }, 50);

    const saveScroll = () => {
        if (containerRef.current?.scrollTop) {
            setScroll(containerRef.current?.scrollTop);
        }
    };

    const moveUpdateSolplace = (index: number) => {
        router.push(`/updateSolplaceLog?index=${index}`);
    };

    return (
        <>
            <div className={styles.gridContainer} onScroll={scrollHandling} ref={containerRef}>
                {solplaces.map((solplace, index) => {
                    return (
                        <div
                            key={`solplce_${index}`}
                            className={styles.gridCellContainer}
                            onClick={() => {
                                moveUpdateSolplace(index);
                            }}
                        >
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
                                    <span>
                                        {solplace?.gu ?? '관악구'}, {solplace?.si ?? '서울시'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button type="button" className={styles.addSolplaceButton} onClick={moveToReigstSolplace}>
                <NewSolplaceButton />
            </button>
        </>
    );
};

export default SolplaceComponent;
