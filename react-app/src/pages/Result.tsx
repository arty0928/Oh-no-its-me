import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { useVoteResults } from '@/hooks/useVoteResults';
import { useToast } from '@/hooks/useToast';
import { IMAGES } from '@/constants/imagePath';
import { ICONS } from '@/constants/iconPath';
import Confetti from '@/components/Confetti/Confetti';
import Winner from '@/components/Winner/Winner';
import Loading from '@/components/Loading/Loading';

const Result = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isTimedOut, setIsTimedOut] = useState(false);
  const { data: results, isLoading, isError, error } = useVoteResults();

  const hasResults = results && results.length > 0;

  useEffect(() => {
    const timeout = setTimeout(() => setIsTimedOut(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isError || !(error instanceof Error)) return;
    const status = axios.isAxiosError(error) ? error.response?.status : null;
    const message =
      status === 500
        ? '서버에 연결할 수 없습니다.'
        : status === 401
          ? '권한이 없습니다. 로그인 후 다시 시도해주세요.'
          : status === 404
            ? '요청하신 데이터를 찾을 수 없습니다.'
            : '알 수 없는 오류가 발생했습니다.';
    showToast(message, 'warning');
    navigate(status === 401 ? '/login' : '/main');
  }, [isError, error, showToast, navigate]);

  const handleClickButton = () => navigate('/comment');

  return (
    <>
      {isLoading && !isTimedOut ? (
        <Loading />
      ) : (
        <div className="relative w-full min-h-screen bg-white overflow-hidden">
          <picture className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
            <source media="(max-width: 768px)" srcSet={IMAGES.BG_MOBILE} />
            <img src={IMAGES.BG} alt="background" className="w-full h-full" />
          </picture>

          <div className="pt-5 pb-5 relative z-10 w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-end w-full h-full max-w-[1280px]">
              {hasResults && <Confetti />}

              {hasResults ? (
                <div
                  className={`relative w-full h-full max-w-[1280px] flex flex-col items-center justify-center ${
                    !isMobile ? 'md:min-w-[800px]' : ''
                  }`}
                >
                  <div className="flex flex-col w-full items-center justify-center gap-15">
                    <div className="flex">
                      <img src={IMAGES.POPPER_LEFT} alt="popper" className="w-10 md:w-15" />
                      <h1 className="flex items-center font-pb text-2xl text-black mx-4 whitespace-nowrap">
                        너로 정했다!
                      </h1>
                      <img src={IMAGES.POPPER_RIGHT} alt="popper" className="w-10 md:w-15" />
                    </div>

                    {isMobile ? (
                      <div className="grid grid-cols-2 grid-rows-2 gap-10 pt-10">
                        {results.slice(0, 4).map((data, index) => {
                          const shift = index % 2 === 0 ? '-translate-y-8' : 'translate-y-8';
                          return (
                            <div
                              key={data.pollId}
                              className={`pt-10 w-full flex justify-center relative ${shift}`}
                            >
                              <div className="relative w-full max-w-[160px] flex justify-center">
                                <Winner name={data.username} question={data.questionText} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="relative grid grid-rows-3 grid-cols-2 w-full mt-10 justify-center items-center">
                        {results.slice(0, 4).map((data, index) => {
                          const positions = [
                            'flex justify-center col-span-2',
                            'flex justify-center col-span-1 pr-15',
                            'flex justify-center col-span-1 pl-15',
                            'flex justify-center col-span-2',
                          ];
                          return (
                            <div key={data.pollId} className={`${positions[index]}`}>
                              <Winner name={data.username} question={data.questionText} />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                isTimedOut && <p className="font-pm text-gray-400 mt-10">아직 결과가 없어요!</p>
              )}
            </div>
          </div>

          <img
            src={ICONS.ARROW}
            alt="arrow"
            className="fixed top-1/2 right-6 md:right-10 -translate-y-1/2 w-12 h-12 cursor-pointer z-50"
            onClick={handleClickButton}
          />
        </div>
      )}
    </>
  );
};

export default Result;
