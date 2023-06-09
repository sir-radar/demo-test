import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { ProductInterface } from '@/util/products';
import { USDollar } from '@/util/currencyFormatter';
import { classNames } from '@/util/classNames';

interface SpinnerInterface {
  product?: ProductInterface;
}

export default function Spinner({ product }: SpinnerInterface) {
  const minChance = 0.01;
  const maxChance = 80;
  const [chance, setChance] = useState<number>(0);
  const [chancePrice, setChancePrice] = useState<number>(0.0);
  const R2D = 180 / Math.PI;
  const [active, setActive] = useState<boolean>(false);
  const [angle, setAngle] = useState<number>(0);
  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [rotation, setRotation] = useState<number>(0);
  const [startAngle, setStartAngle] = useState<number>(0);

  const spinIndicatorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const innerContentsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const centerDivRef = useRef<HTMLDivElement>(null);
  const spinnerCoverRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleChancePriceUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    setChancePrice(value);
    setChance(parseFloat(((value * 100) / product?.price!).toFixed(2)));
  };

  const handleChanceUpdate = (value: number) => {
    setChance(value);
    setChancePrice(product?.price ? (product?.price * value) / 100 : 0.0);
  };

  const initSpin = () => {
    if (centerDivRef.current && spinIndicatorRef.current) {
      centerDivRef.current.style.visibility = 'visible';
      spinIndicatorRef.current.style.visibility = 'visible';
    }
    setTimeout(() => spin(), 1000);
  };

  // Takes an element rotation value and return only the figure in it.
  const rotateToVal = (rotate: string) => {
    return rotate.replace('rotate(', '').replace('deg)', '');
  };

  const getResults = (winningRange_: any) => {
    // Get spinner current angle
    const spinnerCurrentAngle = parseInt(
      rotateToVal(spinIndicatorRef?.current?.style.transform!)
    );

    // Get spinner current angle within 360 incase the value is bigger than 360 and remove negative sign incase it is a negative number
    const spinnerAngle = Math.abs(spinnerCurrentAngle) % 360;

    if (winningRange_.start < winningRange_.end) {
      if (
        spinnerAngle >= winningRange_.start &&
        spinnerAngle <= winningRange_.end
      ) {
        if (resultRef.current) {
          resultRef.current.style.color = 'green';
          resultRef.current.innerHTML = 'Success!';
        }
      } else {
        if (resultRef.current) {
          resultRef.current.style.color = 'red';
          resultRef.current.innerHTML = 'Please try again...';
        }
      }
    } else {
      if (
        spinnerAngle > winningRange_.end &&
        spinnerAngle < winningRange_.start
      ) {
        if (resultRef.current) {
          resultRef.current.style.color = 'red';
          resultRef.current.innerHTML = 'Please try again...';
        }
      } else {
        if (resultRef.current) {
          resultRef.current.style.color = 'green';
          resultRef.current.innerHTML = 'Success!';
        }
      }
    }

    if (spinnerCoverRef.current) {
      spinnerCoverRef.current.style.display = 'none';
    }
  };

  const angleTo360 = (angle: number): number => {
    return Math.abs(angle) % 360;
  };

  const getStartingAngle = useMemo(() => {
    const winningStartPoint = (((100 - chance) / 2) * 360) / 100;
    return winningStartPoint;
  }, [chance]);

  const spin = () => {
    const rrr = parseInt(
      rotateToVal(progressRef?.current?.style.transform || '0')
    );
    const pss = (((100 - chance) / 2) * 360) / 100;
    const dss = ((100 - (100 - chance) / 2) * 360) / 100;
    let winningRange_ = {
      start: 0,
      end: 0,
    };
    if (Math.sign(rrr) === -1) {
      winningRange_ = {
        start:
          (pss - (Math.abs(rrr) % 360)) % 360 < 0
            ? 360 + ((pss - (Math.abs(rrr) % 360)) % 360)
            : (pss - (Math.abs(rrr) % 360)) % 360,
        end:
          dss - (Math.abs(rrr) % 360) < 0
            ? 360 + (dss - (Math.abs(rrr) % 360))
            : (dss - (Math.abs(rrr) % 360)) % 360,
      };
    } else {
      winningRange_ = {
        start: (rrr + pss) % 360,

        end: (rrr + dss) % 360,
      };
    }

    if (spinnerCoverRef.current) {
      spinnerCoverRef.current.style.display = 'block';
    }
    const currentRotation =
      spinIndicatorRef?.current?.style.transform || `rotate(0deg)`;
    let x = Math.floor(Math.random() * 100 + 1874);

    const newVal = parseInt(rotateToVal(currentRotation));
    if (spinIndicatorRef.current) {
      spinIndicatorRef.current.style.transform = `rotate(${newVal + x}deg)`;
    }
    setTimeout(() => {
      if (spinnerCoverRef.current) {
        spinnerCoverRef.current.style.display = 'none';
      }
      getResults(winningRange_);
    }, 5000);
  };

  const start = (e: MouseEvent) => {
    e.preventDefault();
    let height, left, top, width, x, y, _ref;
    (_ref = targetRef?.current?.getBoundingClientRect()),
      (top = _ref?.top),
      (left = _ref?.left),
      (height = _ref?.height),
      (width = _ref?.width);
    const c = {
      x: left! + width! / 2,
      y: top! + height! / 2,
    };
    setCenter(c);
    x = e.clientX - c.x;
    y = e.clientY - c.y;
    const angle = R2D * Math.atan2(y, x);
    setStartAngle(angle);
    setActive(true);
  };

  const rotate = (e: MouseEvent) => {
    e.preventDefault();
    if (active) {
      let d, x, y;
      x = e.clientX - center.x;
      y = e.clientY - center.y;
      d = R2D * Math.atan2(y, x);
      const r = d - startAngle;
      setRotation(r);
      if (
        targetRef?.current &&
        innerContentsRef.current &&
        progressRef.current
      ) {
        // Simulates rotation
        // targetRef.current.style.transform =
        //   'rotate(' + (angle + rotation) + 'deg)';
        // Helps to rotate the green area as backgroundImage value makes rotation fail sometimes
        progressRef.current.style.transform =
          'rotate(' + (angle + rotation) + 'deg)';
        // Prevents arrow from rotating with the green area
        // innerContentsRef.current.style.transform =
        //   'rotate(' + -(angle + rotation) + 'deg)';
      }
    }
  };

  const stop = () => {
    setAngle(angle + rotation);
    setActive(false);
  };

  useEffect(() => {
    const target = targetRef?.current;

    target?.addEventListener('mousedown', start, false);
    target?.addEventListener('mousemove', rotate, false);
    target?.addEventListener('mouseup', stop, false);

    // Cleanup
    return () => {
      target?.removeEventListener('mousedown', start, false);
      target?.removeEventListener('mousemove', rotate, false);
      target?.removeEventListener('mouseup', stop, false);
    };
  });

  useEffect(() => {
    setChance(maxChance);
    setChancePrice(product?.price ? (product?.price * maxChance) / 100 : 0.0);

    // reset rotation degree when a new product is selected
    if (progressRef?.current && targetRef.current && innerContentsRef.current) {
      progressRef.current.style.transform = 'rotate(0deg)';
      targetRef.current.style.transform = 'rotate(0deg)';
      innerContentsRef.current.style.transform = 'rotate(0deg)';
    }
  }, [product]);

  return (
    <div className="flex flex-col items-center">
      <div
        id="spinner_cover"
        ref={spinnerCoverRef}
        title="Please wait..."
      ></div>
      <div className="mb-5 spinner" id="target" ref={targetRef}>
        {product && (
          <div
            ref={progressRef}
            className="progress"
            style={{
              backgroundImage: ` conic-gradient(from ${getStartingAngle}deg, #5dbd87 ${chance}%, #fff 0)`,
            }}
          ></div>
        )}
        <div
          className="inner_contents"
          id="inner_contents"
          ref={innerContentsRef}
        >
          <div className="bg"></div>
          <div className="product"></div>
          <div className="spinner_handle">
            <div
              className="handle"
              id="spin_indicator"
              ref={spinIndicatorRef}
            ></div>

            <div className="center" ref={centerDivRef}>
              <Image
                src="/images/wheel-center-light.png"
                alt="image"
                width={50}
                height={50}
              />
            </div>

            {product !== undefined ? (
              <div className="flex flex-col items-center text-center w-60">
                <p>{product?.name}</p>
                <Image
                  src={product?.imageURL}
                  alt="image"
                  height={100}
                  width={100}
                />
                <p>{USDollar.format(product?.price)}</p>
              </div>
            ) : (
              <p>SELECT AN ITEM TO START</p>
            )}
          </div>
        </div>
      </div>
      <div className="result" ref={resultRef}></div>
      <div className="flex items-center gap-2 w-30">
        <button
          disabled={product === undefined}
          className="inline-block bg-[#45a870] py-3 px-4 text-white"
        >
          DEAL FOR {USDollar.format(chancePrice)}
        </button>
        <button
          disabled={product === undefined}
          className="inline-block bg-[#3D789D] text-white py-3 px-4"
          onClick={() => initSpin()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M5.943 13.881a5.47 5.47 0 01-1.6-4.788l1.995.647-1.476-5.838L.104 7.74l2.078.667a7.6 7.6 0 002.16 7.03c2.349 2.283 5.798 2.828 8.666 1.677l-.54-2.162c-2.12 1.01-4.759.647-6.525-1.07zM17.766 11.518a7.6 7.6 0 00-2.16-7.03C13.256 2.204 9.807 1.658 6.94 2.81l.54 2.161c2.12-1.01 4.759-.646 6.525 1.07a5.47 5.47 0 011.6 4.789l-1.995-.647 1.476 5.839 4.758-3.839-2.078-.666z"
            ></path>
          </svg>
        </button>
      </div>
      <div className={classNames('w-[80%]', !product && 'disabled-div')}>
        <span className="block uppercase">Chance</span>
        <div className="relative flex items-center mb-5">
          <input
            className="w-full p-2"
            type="number"
            value={chance}
            min={minChance}
            max={maxChance}
            onChange={(e) => handleChanceUpdate(parseInt(e.target.value))}
          />
          <button
            onClick={() => handleChanceUpdate(minChance)}
            className="absolute right-[40%] bg-black text-white p-1"
          >
            Min
          </button>
          <button
            onClick={() => handleChanceUpdate(10)}
            className="absolute right-[30%] bg-black text-white p-1"
          >
            10%
          </button>
          <button
            onClick={() => handleChanceUpdate(25)}
            className="absolute right-[20%] bg-black text-white p-1"
          >
            25%
          </button>
          <button
            onClick={() => handleChanceUpdate(50)}
            className="absolute right-[10%] bg-black text-white p-1"
          >
            50%
          </button>
          <button
            onClick={() => handleChanceUpdate(maxChance)}
            className="absolute right-[1%] bg-black text-white p-1"
          >
            Max
          </button>
        </div>
        <span className="block uppercase">price</span>
        <div>
          <input
            className="w-full p-2 mb-2"
            value={chancePrice}
            onChange={handleChancePriceUpdate}
          />
          <div className="flex flex-col">
            <input
              type="range"
              min={product?.price ? (product?.price * minChance) / 100 : 0.0}
              max={product?.price ? (product?.price * maxChance) / 100 : 0.0}
              value={chancePrice}
              className="w-full"
              onChange={handleChancePriceUpdate}
            />
            <div className="flex justify-between">
              <p className="min text-[#8E8E99]">
                {USDollar.format(
                  product?.price ? (product?.price * minChance) / 100 : 0.0
                )}
              </p>
              <p className="max text-[#8E8E99]">
                {USDollar.format(
                  product?.price ? (product?.price * maxChance) / 100 : 0.0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
