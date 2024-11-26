import InfoCard from '@components/InfoCard';
import { ComponentPageBlocksInfoCards } from '@utils/types';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

function InfoCardsBlock({
  numberOfShowingCardsInRow,
  infoCard,
}: ComponentPageBlocksInfoCards): JSX.Element {
  let rowCards = '';
  let widthCards = '';

  switch (numberOfShowingCardsInRow) {
    case 'two':
      rowCards = `sm:grid-cols-2 xlSpecial:gap-x-[70px] md:gap-x-[45px] gap-x-[30px]  xlSpecial:gap-y-[42px] gap-y-[35px]`;
      break;
    case 'three':
      rowCards = `2xl:grid-cols-3 lg:grid-cols-2  xlSpecial:gap-x-[31px] xlSpecial:gap-y-[35px] md:gap-x-[40px] md:gap-y-[40px] gap-x-[35px] gap-y-[35px]`;
      break;
    case 'four':
      rowCards = `xl:grid-cols-4 sm:grid-cols-2 gap-x-[36px] gap-y-[50px]`;
      break;
    default:
      rowCards = `grid-cols-3 gap-x-[60px] gap-y-[50px]`;
      break;
  }
  switch (numberOfShowingCardsInRow) {
    case 'two':
      widthCards = `w-[90%] md:w-[90%] xlSpecial:w-[70%]`;
      break;
    case 'three':
      widthCards = `w-[90%] md:w-[85%] xlSpecial:w-[75%]`;
      break;
    case 'four':
      widthCards = `w-[90%] md:w-[90%] xlSpecial:w-[90%]`;
      break;
    default:
      widthCards = `w-[90%] md:w-[90%] xlSpecial:w-[70%]`;
      break;
  }

  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1279 });
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const twoFullCards = Math.floor((infoCard?.length ?? 0) / 2) * 2;
  const twoRestCards = (infoCard?.length ?? 0) - twoFullCards;

  const threeFullCards = Math.floor((infoCard?.length ?? 0) / 3) * 3;
  const threeRestCards = (infoCard?.length ?? 0) - threeFullCards;
  const evenCards = threeFullCards % 2 === 0 ? true : false;

  const fourFullCards = Math.floor((infoCard?.length ?? 0) / 4) * 4;
  const fourRestCards = (infoCard?.length ?? 0) - fourFullCards;

  return (
    <div
      className={` ${widthCards} container mx-auto flex flex-col gap-y-[35px] md:gap-y-[60px] xlSpecial:gap-y-[35px]`}
    >
      {numberOfShowingCardsInRow === 'three' &&
        (evenCards ? (
          <div className={` ${rowCards} grid  `}>
            {infoCard?.map(
              (card, index) =>
                threeFullCards > index && (
                  <InfoCard
                    key={index}
                    numberOfShowingCardsInRow={
                      numberOfShowingCardsInRow ?? 'two'
                    }
                    card={card}
                  />
                )
            )}
          </div>
        ) : (
          <div>
            <div className={` ${rowCards} xl:grid hidden  `}>
              {infoCard?.map(
                (card, index) =>
                  threeFullCards > index && (
                    <InfoCard
                      key={index}
                      numberOfShowingCardsInRow={
                        numberOfShowingCardsInRow ?? 'two'
                      }
                      card={card}
                    />
                  )
              )}
            </div>
            {infoCard?.length === 3 ? (
              <div className={` ${rowCards} grid xl:hidden  `}>
                {infoCard?.map(
                  (card, index) =>
                    2 > index && (
                      <InfoCard
                        key={index}
                        numberOfShowingCardsInRow={
                          numberOfShowingCardsInRow ?? 'two'
                        }
                        card={card}
                      />
                    )
                )}
              </div>
            ) : (
              <div className={` ${rowCards} grid xl:hidden  `}>
                {infoCard?.map(
                  (card, index) =>
                    threeFullCards >= index && (
                      <InfoCard
                        key={index}
                        numberOfShowingCardsInRow={
                          numberOfShowingCardsInRow ?? 'two'
                        }
                        card={card}
                      />
                    )
                )}
              </div>
            )}
          </div>
        ))}

      {(numberOfShowingCardsInRow === 'two' ||
        numberOfShowingCardsInRow === 'four') && (
        <div className={` ${rowCards} grid  `}>
          {numberOfShowingCardsInRow === 'two' &&
            infoCard?.map(
              (card, index) =>
                twoFullCards > index && (
                  <InfoCard
                    key={index}
                    numberOfShowingCardsInRow={
                      numberOfShowingCardsInRow ?? 'two'
                    }
                    card={card}
                  />
                )
            )}

          {numberOfShowingCardsInRow === 'four' &&
            infoCard?.map(
              (card, index) =>
                fourFullCards > index && (
                  <InfoCard
                    key={index}
                    numberOfShowingCardsInRow={
                      numberOfShowingCardsInRow ?? 'two'
                    }
                    card={card}
                  />
                )
            )}
        </div>
      )}
      {numberOfShowingCardsInRow === 'two' &&
        twoRestCards > 0 &&
        twoRestCards === 1 && (
          <div className="mx-auto grid gap-y-[35px] sm:w-1/2 sm:grid-cols-1 md:gap-y-[60px] md:px-[15px] xl:w-1/2 xl:grid-cols-1 xlSpecial:gap-y-[35px] xlSpecial:px-[14px]">
            {infoCard?.map(
              (card, index) =>
                twoFullCards <= index && (
                  <InfoCard
                    key={index}
                    numberOfShowingCardsInRow={
                      numberOfShowingCardsInRow ?? 'two'
                    }
                    card={card}
                  />
                )
            )}
          </div>
        )}
      {numberOfShowingCardsInRow === 'three' &&
        (threeRestCards > 0 ? (
          <div>
            <div
              className={`${
                threeRestCards === 2
                  ? 'gap-x-[35px] sm:grid-cols-2 md:gap-x-[60px] xl:w-2/3 xl:grid-cols-2 xlSpecial:gap-x-[31px]'
                  : 'sm:w-1/2 sm:grid-cols-1 md:px-[25px] xl:w-1/3 xl:grid-cols-1 xlSpecial:px-[11px]'
              } mx-auto hidden gap-y-[35px] md:gap-y-[60px] xl:grid xlSpecial:gap-y-[35px]`}
            >
              {infoCard?.map(
                (card, index) =>
                  threeFullCards <= index && (
                    <InfoCard
                      key={index}
                      numberOfShowingCardsInRow={
                        numberOfShowingCardsInRow ?? 'two'
                      }
                      card={card}
                    />
                  )
              )}
            </div>
            <div
              className={`${
                threeRestCards === 2 &&
                'sm:w-1/2 sm:grid-cols-1 md:px-[25px] xl:w-1/3 xl:grid-cols-1 xlSpecial:px-[11px]'
              } mx-auto grid w-[100%] gap-y-[35px] md:gap-y-[60px] xl:hidden xlSpecial:gap-y-[35px] `}
            >
              {infoCard?.map(
                (card, index) =>
                  threeFullCards < index && (
                    <InfoCard
                      key={index}
                      numberOfShowingCardsInRow={
                        numberOfShowingCardsInRow ?? 'two'
                      }
                      card={card}
                    />
                  )
              )}
            </div>
            {infoCard?.length === 3 && (
              <div className=" mx-auto grid w-[100%] gap-y-[35px] sm:w-1/2 sm:grid-cols-1 md:gap-y-[60px] md:px-[25px] xl:hidden xl:w-1/3 xl:grid-cols-1 xlSpecial:gap-y-[35px] xlSpecial:px-[11px]">
                {infoCard?.map(
                  (card, index) =>
                    2 <= index && (
                      <InfoCard
                        key={index}
                        numberOfShowingCardsInRow={
                          numberOfShowingCardsInRow ?? 'two'
                        }
                        card={card}
                      />
                    )
                )}
              </div>
            )}
          </div>
        ) : (
          <div></div>
        ))}

      {numberOfShowingCardsInRow === 'four' &&
        (fourRestCards > 0 && fourRestCards === 1 ? (
          <div className="mx-auto grid w-[100%] gap-y-[35px] sm:w-1/2 sm:grid-cols-1 md:gap-y-[60px] md:px-[15px] xl:w-1/4 xl:grid-cols-1 xlSpecial:gap-y-[35px] xlSpecial:px-[14px]">
            {infoCard?.map(
              (card, index) =>
                fourFullCards <= index && (
                  <InfoCard
                    key={index}
                    numberOfShowingCardsInRow={
                      numberOfShowingCardsInRow ?? 'two'
                    }
                    card={card}
                  />
                )
            )}
          </div>
        ) : fourRestCards === 2 ? (
          <div className="mx-auto grid w-[100%] gap-x-[36px] gap-y-[35px] sm:w-[100%] sm:grid-cols-2 md:gap-y-[60px] xl:w-2/4  xl:grid-cols-2 xl:px-[10px] xlSpecial:gap-y-[35px] xlSpecial:px-[14px]">
            {infoCard?.map(
              (card, index) =>
                fourFullCards <= index && (
                  <InfoCard
                    key={index}
                    numberOfShowingCardsInRow={
                      numberOfShowingCardsInRow ?? 'two'
                    }
                    card={card}
                  />
                )
            )}
          </div>
        ) : (
          fourRestCards === 3 &&
          (isTablet ? (
            <div className="flex flex-col gap-y-[35px] md:gap-y-[60px]">
              <div className="mx-auto grid w-[100%] gap-x-[36px] gap-y-[35px] sm:w-[100%] sm:grid-cols-2 md:gap-y-[60px] xl:w-3/4  xl:grid-cols-3 xl:px-[10px] xlSpecial:gap-y-[35px] xlSpecial:px-[14px]">
                {infoCard?.map(
                  (card, index) =>
                    fourFullCards <= index &&
                    infoCard.length - 1 !== index && (
                      <InfoCard
                        key={index}
                        numberOfShowingCardsInRow={
                          numberOfShowingCardsInRow ?? 'two'
                        }
                        card={card}
                      />
                    )
                )}
              </div>
              <div className="mx-auto grid w-[100%] gap-x-[36px] gap-y-[35px] sm:w-1/2 sm:grid-cols-1 md:gap-y-[60px] xlSpecial:gap-y-[35px] xlSpecial:px-[14px]">
                {infoCard?.map(
                  (card, index) =>
                    fourFullCards <= index &&
                    infoCard.length - 1 === index && (
                      <InfoCard
                        key={index}
                        numberOfShowingCardsInRow={
                          numberOfShowingCardsInRow ?? 'two'
                        }
                        card={card}
                      />
                    )
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto grid w-[100%] gap-x-[36px] gap-y-[35px] sm:w-[100%] sm:grid-cols-2 md:gap-y-[60px] xl:w-3/4  xl:grid-cols-3 xl:px-[10px] xlSpecial:gap-y-[35px] xlSpecial:px-[14px]">
              {infoCard?.map(
                (card, index) =>
                  fourFullCards <= index && (
                    <InfoCard
                      key={index}
                      numberOfShowingCardsInRow={
                        numberOfShowingCardsInRow ?? 'two'
                      }
                      card={card}
                    />
                  )
              )}
            </div>
          ))
        ))}
    </div>
  );
}
export default InfoCardsBlock;
