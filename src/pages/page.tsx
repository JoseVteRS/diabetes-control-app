import data from "../../data/data.json";
import { groupDataByDate } from "@/utils/groupByDate";
import { Fragment } from "react";
import { formatDate } from "@/utils/formatDate";
import { isGlucoseIdeal } from "@/utils/isGlucoseIdeal";
import { toControl } from "@/utils/toControl";
import { Control } from "@/interfaces/control.interface";

interface MomentTranslation {
  [moment: string]: string;
}

const momentTranslation: MomentTranslation = {
  FASTING: "En ayunas",
  ONE_HOUR_AFTER_BREAKFAST: "1h después del desayuno",
  ONE_HOUR_BEFORE_LUNCH: "1h antes del comida",
  ONE_HOUR_AFTER_LUNCH: "1h después del comida",
  ONE_HOUR_BEFORE_DINNER: "1h antes de la cena",
  ONE_HOUR_AFTER_DINNER: "1h después de la cena",
};

export default function ControlPage() {
  const controls: Control[] = toControl(data);
  const groupedData = groupDataByDate(controls);

  return (
    <>
      <table className="border-collapse w-full print:w-11/12 print:mx-auto print:my-6 print:text-sm">
        <thead>
          <tr>
            <th className="p-2 bg-gray-100 border text-gray-600 font-bold  print:p-1">
              Valor <span className="text-xs">mg/dl</span>
            </th>
            <th className="p-2 bg-gray-100 border text-gray-600 font-bold  print:p-1">
              Momento
            </th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map((group) => (
            <Fragment key={group.date.toString()}>
              <tr>
                <td
                  className="p-2 bg-gray-100 border text-gray-600 font-semibold text-sm print:text-xl print:p-1 text-center"
                  colSpan={3}
                >
                  {formatDate(group.date.toString())}
                </td>
              </tr>
              {group.values.map((item) => (
                <tr key={item.id}>
                  <td
                    className={`p-2 border text-center text-sm font-semibold print:p-1 ${
                      isGlucoseIdeal(item) ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.value}
                  </td>
                  <td className="p-2 border text-left text-sm print:p-1">
                    {momentTranslation[item.moment]}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}
