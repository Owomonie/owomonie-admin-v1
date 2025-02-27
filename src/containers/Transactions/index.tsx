import { useState } from "react";
import TransactionsHeader from "./header";

const Transactions = () => {
  const currentDate = new Date();
  const endDateBegin = new Date(currentDate);
  const startDateBegin = new Date(currentDate);

  startDateBegin.setMonth(currentDate.getMonth() - 1);
  const [startDate, setStartDate] = useState<Date | null>(startDateBegin);
  const [endDate, setEndDate] = useState<Date | null>(endDateBegin);
  const [searchQuery, setSearchQuery] = useState("");
  const [userFullName, setUserFullName] = useState("all");
  const [transactionType, setTransactionType] = useState("all");

  return (
    <div className="px-6 py-4">
      <TransactionsHeader
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        userFullName={userFullName}
        onUserFullNameChange={setUserFullName}
        transactionType={transactionType}
        onTransactionTypeChange={setTransactionType}
      />
    </div>
  );
};

export default Transactions;
