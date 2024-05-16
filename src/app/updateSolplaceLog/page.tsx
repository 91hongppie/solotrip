'use client';
import { useEffect, useState } from 'react';
import TitleHeader from '../_components/TitleHeader/TitleHeader';
import { Solplace, currentNewSolplace, currentSolplaces } from '../_stores/solplaceStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { currentUser } from '../_stores/userStore';
import styles from './updateSolplaceLog.module.css';
import Image from 'next/image';
import PlusIcon from '@icon/plus.svg';
import CloseIcon from '@icon/close.svg';
import RightChevron from '@icon/right_chevron.svg';
import client, { DELETE_SOLPLACE } from '../_utils/apis/apollo-client';
import { useMutation } from '@apollo/client';

export default function UpdateSolplacelog() {
    const { user } = currentUser();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isAble, setIsAble] = useState(true);

    const { solplaces } = currentSolplaces();
    const [solplace, setSolplace] = useState<Solplace>();
    const [deleteSolplaceLog] = useMutation(DELETE_SOLPLACE, {
        client,
        context: {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        },
    });

    useEffect(() => {
        if (!user.accessToken) {
            router.replace('/main');
        }
        const index = parseInt(searchParams.get('index') ?? '0');
        if (!index) {
            router.back();
        }
        setSolplace(solplaces[index]);
        console.log(solplaces[index]);
    }, []);

    useEffect(() => {
        setIsAble(false);
        if (!solplace || !solplace.introduction || !solplace.solplaceName || !solplace.images.length) {
            return;
        }
        setIsAble(true);
    }, [solplace]);

    const handleImage = (e: any) => {
        if (!solplace) {
            return;
        }
        let images = solplace?.images ?? [];
        if (images.length === 5) {
            return;
        }
        const targetFiles = (e.target as HTMLInputElement).files as FileList;
        const targetFilesArray = Array.from(targetFiles);
        const selectedFiles: string[] = targetFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        const newImages = images.concat(selectedFiles).slice(0, 5);
        setSolplace({ ...solplace, images: newImages });
    };

    const handleIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!solplace) {
            return;
        }
        setSolplace({ ...solplace, introduction: e.target.value });
    };

    const removeImage = (i: number) => {
        if (!solplace) {
            return;
        }
        setSolplace({ ...solplace, images: solplace.images?.filter((image, index) => index != i) });
    };

    const delSolplaceLog = async () => {
        const variables = {
            id: solplace?.id,
        };
        const result = await deleteSolplaceLog({ variables });
        if (!result.errors) {
            
        }
    };

    const updateSolplaceLog = () => {};

    return (
        <TitleHeader title={`${solplace?.solplaceName} 수정`}>
            <div className={styles.bodyContainer}>
                <div className={styles.inputConatainer}>
                    <div className={styles.inputTitleContainer}>솔플레이스 사진 {`${solplace?.images?.length ?? 0}/5`}</div>
                    <div className={styles.registPhotoContainer}>
                        {(solplace?.images === undefined || solplace.images?.length < 5) && (
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
                        {solplace?.images?.map((url, i) => {
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

                    <button type="button" className={styles.solplaceRegisterButton}>
                        <span
                            className={
                                solplace?.solplaceName ? styles.solplaceRegisterButtonText : styles.solplaceRegisterButtonPlaceholder
                            }
                        >
                            {solplace?.solplaceName ?? '솔플레이스를 선택해 주세요.'}
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
                        value={solplace?.introduction}
                        onChange={handleIntroduction}
                    />
                    <div className={styles.introductionWarning}>
                        {'* 부적절하거나 불쾌감을 줄 수 있는 내용이 포함될 경우 로그가 숨김 처리될 수 있습니다.'}
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.disableRegisterButton} onClick={deleteSolplaceLog}>
                        로그 삭제
                    </button>
                    <button className={isAble ? styles.ableRegisterButton : styles.disableRegisterButton} onClick={updateSolplaceLog}>
                        로그 수정
                    </button>
                </div>
            </div>
        </TitleHeader>
    );
}
