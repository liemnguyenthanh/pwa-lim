import { BigNumberish, formatUnits } from "ethers";
import { Numeric } from "ethers";
import { isNull, isUndefined } from "lodash";

export const formatUnitsToNumber = (
  value: BigNumberish,
  unit: string | Numeric = 18
) => {
  if (isNull(value) || isUndefined(value)) return 0;
  try {
    return Number(formatUnits(BigInt(value), unit));
  } catch (error) {
    // console.error(`Failed to format value: ${value}`);
    return 0;
  }
};
