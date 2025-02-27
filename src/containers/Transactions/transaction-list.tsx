import { useSelector } from "react-redux";
import { formatDate } from "../../utils/date";
import { Transaction, Users } from "../../utils/types";
import { RootState } from "../../redux/store";

interface TransactionListProps {
  transactions: Transaction[];
  startDate: Date | null;
  endDate: Date | null;
  userId: string;
  transactionType: string;
  searchQuery: string;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  endDate,
  searchQuery,
  startDate,
  transactionType,
  userId,
}) => {
  const users = useSelector(
    (state: RootState) => state.allUsers.data as Users[]
  );

  const user = users.find((user) => user.id === userId);
  const userName = user
    ? `${user.firstName} ${user.lastName}`
    : "the selected user";

  const getEmptyMessage = () => {
    if (!startDate || !endDate) {
      return "No Date Range detected. Please Select Both Start and End Date";
    }

    if (searchQuery) {
      return `No transactions found for "${searchQuery}" between ${
        startDate && formatDate(startDate.toDateString())
      } and ${endDate && formatDate(endDate.toDateString())}`;
    }

    if (!transactions.length) {
      if (transactionType && transactionType !== "all") {
        return `No ${transactionType} transactions found between ${
          startDate && formatDate(startDate.toDateString())
        } and ${endDate && formatDate(endDate.toDateString())} ${
          userId !== "all" && `for ${userName}`
        }`;
      }

      if (userId && userId !== "all") {
        return `No transactions found for ${userName} between ${
          startDate && formatDate(startDate.toDateString())
        } and ${endDate && formatDate(endDate.toDateString())}`;
      }

      if (startDate && endDate) {
        const startMonth = startDate.toLocaleString("default", {
          month: "long",
        });
        const endMonth = endDate.toLocaleString("default", { month: "long" });
        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();

        return `No transactions found between ${startMonth} ${startDate.getDate()}, ${startYear} and ${endMonth} ${endDate.getDate()}, ${endYear}`;
      }

      return `No transactions found with the selected filters between ${
        startDate && formatDate(startDate.toDateString())
      } and ${endDate && formatDate(endDate.toDateString())}.`;
    }

    return "No transactions available.";
  };

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
        <p className="text-gray-500 text-center px-20 text-2xl">
          {getEmptyMessage()}
        </p>
      )}
    </div>
  );
};

export default TransactionList;
