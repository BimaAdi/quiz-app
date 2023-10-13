export default function Table() {
    return (
        <div className="overflow-x-scroll">
            <table className="w-full mb-2">
                <thead>

                    <tr className="bg-blue-950 text-white">
                        <th
                            style={{
                                maxWidth: "120px",
                                minWidth: "120px",
                                textAlign: "center",
                                fontWeight: "normal",
                            }}
                            className="p-3 border-blue-950 border-solid border"
                        >
                            Date
                        </th>
                        <th
                            style={{
                                maxWidth: "100px",
                                minWidth: "100px",
                                textAlign: "center",
                                fontWeight: "normal",
                            }}
                            className="p-3 border-blue-950 border-solid border"
                        >
                            Expense / Income
                        </th>
                        <th
                            style={{
                                minWidth: "120px",
                                textAlign: "center",
                                fontWeight: "normal",
                            }}
                            className="p-3 border-blue-950 border-solid border"
                        >
                            Amount
                        </th>
                        <th
                            style={{
                                minWidth: "200px",
                                textAlign: "center",
                                fontWeight: "normal",
                            }}
                            className="p-3 border-blue-950 border-solid border"
                        >
                            Name
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <tr className="border-slate-300 border-solid border">
                        <td className="text-center p-3 border-slate-300 border-solid border">
                            2023-09-05
                        </td>
                        <td className="text-center p-3 border-slate-300 border-solid border">
                            Expense &#8595;
                        </td>
                        <td className="text-justify p-3 border-slate-300 border-solid border">
                            Rp 300000
                        </td>
                        <td className="text-left p-3 border-slate-300 border-solid border">
                            Grocery
                        </td>
                    </tr>
                    <tr className="border-slate-300 border-solid border">
                        <td className="text-center p-3 border-slate-300 border-solid border">
                            2023-09-01
                        </td>
                        <td className="text-center p-3 border-slate-300 border-solid border">
                            Income &#8593;
                        </td>
                        <td className="text-justify p-3 border-slate-300 border-solid border">
                            Rp 7000000
                        </td>
                        <td className="text-left p-3 border-slate-300 border-solid border">
                            Monthly Salary
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
