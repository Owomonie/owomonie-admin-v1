import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { RootState } from "../../redux/store";
import { Transaction, Users } from "../../utils/types";
import { useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { formatDate } from "../../utils/date";

const searchIcon = new URL("../../assets/navicons/search.png", import.meta.url)
  .href;

interface TransactionsHeaderProps {
  userId: string;
  onUserIdChange: (name: string) => void;
  transactionType: string;
  onTransactionTypeChange: (type: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  transactions: Transaction[];
}

const TransactionsHeader: React.FC<TransactionsHeaderProps> = ({
  userId,
  onUserIdChange,
  transactionType,
  onTransactionTypeChange,
  searchQuery,
  onSearchChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  transactions,
}) => {
  const users = useSelector(
    (state: RootState) => state.allUsers.data as Users[]
  );

  const sortedUsers = [...users].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  const user = users.find((user) => user.id === userId);
  const userName = user ? `${user.firstName} ${user.lastName}` : "User";

  const currentDate = new Date();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Handle Date Change
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end) {
      setShowDatePicker(false);
    }
  };

  const formattedDateRange =
    startDate && endDate
      ? `${startDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })} - ${endDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`
      : "Select Date Range";

  const convertToCSV = (data: Transaction[]) => {
    const headers = [
      "First Name",
      "Last Name",
      "Category",
      "Bank",
      "Type",
      "Amount",
      "Date",
    ];

    const escapeCSVValue = (value: string) => {
      if (value && value.includes(",")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const rows = data.map((txn) => [
      escapeCSVValue(txn.firstName),
      escapeCSVValue(txn.lastName),
      escapeCSVValue(txn.category),
      escapeCSVValue(txn.bank),
      escapeCSVValue(txn.type),
      escapeCSVValue(txn.amount.toString()),
      escapeCSVValue(formatDate(txn.date)),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  // Trigger download of CSV
  const downloadCSV = () => {
    const csvData = convertToCSV(transactions);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // Support for HTML5 download attribute
      const filename =
        userId === "all"
          ? `All Users Transactions (${formattedDateRange})`
          : `${userName} (${formattedDateRange})`;
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[550] text-[23px] text-[#151515]">
            Transactions
          </h1>
          <p className="font-[350] text-[15px] text-[#5F5F5F]">
            View user transaction history
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="relative">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowDatePicker(!showDatePicker)}>
              <div
                className="appearance-none rounded-3xl py-2 pr-10 pl-4 bg-[#EAEAEA] text-[#0F0F0F] 
              font-[450] text-[12px] border w-[220px] border-[#D3D3D3] focus:outline-none">
                <p className="font-[450] text-xs text-[#151515]">
                  {formattedDateRange}
                </p>
              </div>
              {!showDatePicker ? (
                <IoCalendarClearOutline
                  color="#898989"
                  size={20}
                  className="absolute top-[6px] right-2"
                />
              ) : (
                <MdOutlineClose
                  color="#898989"
                  size={20}
                  className="absolute top-[6px] right-2"
                />
              )}
            </div>
            <div className="absolute mt-1 z-50">
              {showDatePicker && (
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Select Date Range"
                  className="px-4"
                  maxDate={currentDate}
                  inline
                />
              )}
            </div>
          </div>
          <div className="relative">
            <select
              id="transactionType"
              name="transactionType"
              value={transactionType}
              onChange={(e) => onTransactionTypeChange(e.target.value)}
              className="appearance-none rounded-3xl py-2 pl-4 bg-[#EAEAEA] w-[80px] text-[#0F0F0F] 
              font-[450] text-[12px] border cursor-pointer border-[#D3D3D3] focus:outline-none">
              <option value="all">All</option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
            <RiArrowDropDownLine
              color="#898989"
              size={27}
              className="absolute top-[4px] right-1"
            />
          </div>
          <div className="relative">
            <select
              id="userName"
              name="userName"
              value={userId}
              onChange={(e) => onUserIdChange(e.target.value)}
              className="appearance-none rounded-3xl py-2 pl-4 bg-[#EAEAEA] w-[200px] text-[#0F0F0F] 
              font-[450] text-[12px] border cursor-pointer border-[#D3D3D3] focus:outline-none">
              <option value="all">All Users</option>
              {sortedUsers.map((user) => (
                <option
                  key={user.id}
                  value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            <RiArrowDropDownLine
              color="#898989"
              size={27}
              className="absolute top-[4px] right-1"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-5">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Transactions by Firstname, Lastname, Category and Banks"
            className="w-full border border-[#D3D3D3] font-[350] text-[15px] py-2 px-6 rounded-3xl"
          />
          <img
            src={searchIcon}
            alt="Search"
            className="w-5 h-5 absolute top-2 right-5"
          />
        </div>
        {transactions.length > 0 && (
          <button
            onClick={downloadCSV}
            className="bg-[#1F79B0] py-2 px-8 rounded-3xl font-[550] text-[15px] text-[#FCFCFC]">
            Export to CSV
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionsHeader;
