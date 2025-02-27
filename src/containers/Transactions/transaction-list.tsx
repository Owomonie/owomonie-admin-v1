import { formatDate } from "../../utils/date";
import { Transaction } from "../../utils/types";

interface TransactionListProps {
  transactions: Transaction[];
  // selectedFilterStatus: string;
  // searchQuery: string;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  // selectedFilterStatus,
  // searchQuery,
}) => {
  return (
    <div className="mt-10">
      {transactions.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                USER
              </th>
              <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                TRANS. DATE & TIME
              </th>
              <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                TRANSACTION TYPE
              </th>
              <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                AMOUNT
              </th>
              <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                CATEGORY
              </th>
              <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                BANK
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="hover:bg-gray-300">
                <td className="font-[450] text-[12px] text-[#151515] px-4 py-2 border-b border-[#EAEAEA]">
                  {txn.firstName} {txn.lastName}
                </td>
                <td className="font-[450] text-[14px] text-[#151515] px-4 py-2 border-b border-[#EAEAEA]">
                  {formatDate(txn.date)}
                </td>
                <td className="font-[450] text-[14px] text-center text-[#151515] px-4 py-2 border-b border-[#EAEAEA]">
                  {txn.type}
                </td>
                <td className="font-[450] text-[14px] text-center text-[#151515] px-4 py-2 border-b border-[#EAEAEA]">
                  £ {txn.amount}
                </td>
                <td className="font-[450] text-[14px] text-[#151515] px-4 py-2 border-b border-[#EAEAEA]">
                  {txn.category}
                </td>
                <td className="font-[450] text-[14px] text-[#151515] px-4 py-2 border-b border-[#EAEAEA]">
                  {txn.bank} Bank
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center text-2xl">
          {/* {getEmptyMessage()} */}
        </p>
      )}
    </div>
  );
};

export default TransactionList;
