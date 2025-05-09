import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import TransactionsHeader from "./header";
import TransactionList from "./transaction-list";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Transaction } from "../../utils/types";
import { formatToDateString } from "../../utils/date";
import { getAllTransactions } from "../../redux/slice/get-all-transactions";
import TransactionPagination from "./pagination";

const Transactions = () => {
  const currentDate = new Date();
  const endDateBegin = new Date(currentDate);
  const startDateBegin = new Date(currentDate);

  startDateBegin.setMonth(currentDate.getMonth() - 1);
  const [startDate, setStartDate] = useState<Date | null>(startDateBegin);
  const [endDate, setEndDate] = useState<Date | null>(endDateBegin);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState("all");
  const [transactionType, setTransactionType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const transactions = useSelector(
    (state: RootState) =>
      state.allTransactions.data.transactions as Transaction[]
  );

  const totalPages = useSelector(
    (state: RootState) => state.allTransactions.data.totalPages
  );

  const handlePageChange = async (page: number) => {
    const token = localStorage.getItem("authToken");
    if (startDate && endDate && token) {
      setCurrentPage(page);

      await dispatch(
        getAllTransactions({
          token,
          page,
          extra: { navigate },
          startDate: formatToDateString(startDate),
          endDate: formatToDateString(endDate),
        })
      );
    }
  };

  useEffect(() => {
    const fetchTransactionsByDates = async () => {
      const token = localStorage.getItem("authToken");
      if (startDate && endDate && token) {
        await dispatch(
          getAllTransactions({
            token,
            extra: { navigate },
            startDate: formatToDateString(startDate),
            endDate: formatToDateString(endDate),
          })
        );
      }
    };

    fetchTransactionsByDates();
  }, [startDate, endDate, dispatch, navigate]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesType =
        transactionType === "all" || transactionType === txn.type;

      const matchesUserId = userId === "all" || userId === txn.userId;

      const matchesSearch =
        !searchQuery ||
        txn.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.bank.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesUserId && matchesSearch;
    });
  }, [transactions, transactionType, userId, searchQuery]);

  return (
    <div className="px-6 py-4">
      <TransactionsHeader
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        userId={userId}
        onUserIdChange={setUserId}
        transactionType={transactionType}
        onTransactionTypeChange={setTransactionType}
        transactions={filteredTransactions}
      />
      {totalPages.toString() > "1" && filteredTransactions.length > 0 && (
        <TransactionPagination
          totalPages={parseInt(totalPages)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <TransactionList
        transactions={filteredTransactions}
        endDate={endDate}
        startDate={startDate}
        searchQuery={searchQuery}
        transactionType={transactionType}
        userId={userId}
      />
    </div>
  );
};

export default Transactions;
