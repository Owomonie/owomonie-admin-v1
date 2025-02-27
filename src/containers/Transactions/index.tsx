import { useEffect, useState } from "react";
import TransactionsHeader from "./header";
import TransactionList from "./transaction-list";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Transaction } from "../../utils/types";
import { formatToDateString } from "../../utils/date";
import { getAllTransactions } from "../../redux/slice/get-all-transactions";
import { useNavigate } from "react-router-dom";

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const transactions = useSelector(
    (state: RootState) =>
      state.allTransactions.data.transactions as Transaction[]
  );

  useEffect(() => {
    const fetchTransactionsByDates = async () => {
      const token = localStorage.getItem("authToken");
      if (startDate && endDate && token) {
        dispatch(
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

  const filteredTransactions = transactions.filter((txn) => {
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
      />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default Transactions;
