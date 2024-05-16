'use client';
import TitleHeader from '../_components/TitleHeader/TitleHeader';
import PlusIcon from '@icon/plus.svg';
import RightChevron from '@icon/right_chevron.svg';
import CloseIcon from '@icon/close.svg';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { currentUser } from '../_stores/userStore';
import { useRouter } from 'next/navigation';
import styles from './registerSolplaceLog.module.css';
import SearchSolplace from './_component/SearchSolplace/SearchSolplace';
import { Solplace, SolplaceFetchData, currentNewSolplace, currentPage, currentSolplaces } from '../_stores/solplaceStore';
import { useMutation } from '@apollo/client';
import client, { CREATE_SOLPLACE_LOG } from '../_utils/apis/apollo-client';
import { dataConvertor } from '../_utils/data-convertor';

export default function RegistSolpaceLogPage() {
    const { newSolplace, setNewSolplace } = currentNewSolplace();
    const { setPage } = currentPage();
    const { solplaces, setSolplaces } = currentSolplaces();

    const { user } = currentUser();
    const router = useRouter();
    const [showSearch, setShowSearch] = useState(false);
    const [isAble, setIsAble] = useState(false);
    const [createSolplaceLog] = useMutation(CREATE_SOLPLACE_LOG, {
        client,
        context: {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        },
    });

    useEffect(() => {
        if (user.accessToken) {
            return;
        }
        router.replace('/main');
    }, []);

    useEffect(() => {
        setIsAble(false);
        if (!newSolplace.images?.length) {
            return;
        }

        if (!newSolplace.introduction?.length) {
            return;
        }
        if (!newSolplace.solplaceName?.length) {
            return;
        }
        setIsAble(true);
    }, [newSolplace]);

    const handleImage = (e: any) => {
        let images = newSolplace.images ?? [];
        if (images.length === 5) {
            return;
        }
        const targetFiles = (e.target as HTMLInputElement).files as FileList;
        const targetFilesArray = Array.from(targetFiles);
        const selectedFiles: string[] = targetFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        const newImages = images.concat(selectedFiles).slice(0, 5);
        setNewSolplace({ ...newSolplace, images: newImages });
    };

    const removeImage = (i: number) => {
        setNewSolplace({ ...newSolplace, images: newSolplace.images?.filter((image, index) => index != i) });
    };

    const showSearchTab = () => {
        setShowSearch(true);
    };

    const handleIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewSolplace({ ...newSolplace, introduction: e.target.value });
    };

    const postSolplaceLog = async () => {
        if (!isAble) {
            return;
        }
        const variables = {
            solplaceName: newSolplace.solplaceName,
            createSolplaceLogInput: {
                introduction: newSolplace.introduction,
                images: newSolplace.images,
            },
        };
        console.log(variables);

        const result = await createSolplaceLog({
            variables,
        });
        if (!result.errors) {
            setPage(1);
            const data = result.data.createSolplaceLogBySolplaceName;
            setSolplaces([dataConvertor(data), ...solplaces]);
            router.replace('/main');
        }
    };

    return (
        <>
            <TitleHeader title={'솔플레이스 로그 등록'}>
                <div className={styles.bodyContainer}>
                    <div className={styles.inputConatainer}>
                        <div className={styles.inputTitleContainer}>솔플레이스 사진 {`${newSolplace.images?.length ?? 0}/5`}</div>
                        <div className={styles.registPhotoContainer}>
                            {(newSolplace.images === undefined || newSolplace.images?.length < 5) && (
                                <div className={styles.inputPhotoContainer}>
                                    <label htmlFor="file">
                                        <div className={styles.addPhotoButtonContainer}>
                                            <PlusIcon />
                                            <span className={styles.addPhotoButtonText}>{'사진등록'}</span>
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        accept="image/png,image/jpeg"
                                        hidden
                                        onChange={handleImage}
                                        multiple
                                    />
                                </div>
                            )}
                            {newSolplace.images?.map((url, i) => {
                                return (
                                    <div key={`image_${i}`} className={styles.imageContainer}>
                                        {i == 0 && <span className={styles.mainImageContainer}>대표</span>}
                                        <button
                                            type="button"
                                            className={styles.imageRemoveButtonContainer}
                                            onClick={() => {
                                                removeImage(i);
                                            }}
                                        >
                                            <CloseIcon />
                                        </button>
                                        <Image src={url} alt={`image_${i}`} width={231} height={231} className={styles.image} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div style={{ height: '32px' }} />
                    <div>
                        <div className={styles.inputTitleContainer}>다녀온 솔플레이스</div>

                        <button type="button" className={styles.solplaceRegisterButton} onClick={showSearchTab}>
                            <span
                                className={
                                    newSolplace.solplaceName ? styles.solplaceRegisterButtonText : styles.solplaceRegisterButtonPlaceholder
                                }
                            >
                                {newSolplace.solplaceName ?? '솔플레이스를 선택해 주세요.'}
                            </span>
                            <RightChevron />
                        </button>
                    </div>
                    <div style={{ height: '40px' }} />
                    <div>
                        <div className={styles.inputTitleContainer}>솔플 노트</div>
                        <textarea
                            placeholder="취향에 맞는 장소였나요? 공간의 분위기, 꿀팁 등 혼자 방문하기 좋은 이유를 기록해 보세요."
                            className={styles.introductionInput}
                            value={newSolplace.introduction}
                            onChange={handleIntroduction}
                        />
                        <div className={styles.introductionWarning}>
                            {'* 부적절하거나 불쾌감을 줄 수 있는 내용이 포함될 경우 로그가 숨김 처리될 수 있습니다.'}
                        </div>
                    </div>
                    <button className={isAble ? styles.ableRegisterButton : styles.disableRegisterButton} onClick={postSolplaceLog}>
                        솔플레이스 로그 등록
                    </button>
                </div>
            </TitleHeader>
            {showSearch && <SearchSolplace setShowSearch={setShowSearch} />}
        </>
    );
}
