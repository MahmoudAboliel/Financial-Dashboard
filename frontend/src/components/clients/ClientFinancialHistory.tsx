"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Eye, FileText } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import type { ClientFinancialMonth } from "@/types/client";

import {
    formatCurrency,
    formatPercentage,
} from "@/lib/format";

import { getVerdictClass } from "@/lib/financial-status";
import { downloadFinancialReport } from "@/services/client.service";

interface ClientFinancialHistoryProps {
    months: ClientFinancialMonth[];
}

export default function ClientFinancialHistory({
    months,
}: ClientFinancialHistoryProps) {

    const [verdictFilter, setVerdictFilter] = useState<string | null>("All");

    const filteredMonths = useMemo(() => {

        return [...months]
            .filter((month) => {

                if (verdictFilter === "All") {
                    return true;
                }

                return (
                    month.report?.verdict === verdictFilter
                );
            })
            .sort((a, b) => {

                if (a.year !== b.year) {
                    return b.year - a.year;
                }

                return b.month - a.month;
            });

    }, [months, verdictFilter]);

    const verdicts = ["All", "Excellent", "Good", "Needs Improvement", "Deficit", "No Income"]

    return (
        <Card>

                <CardHeader>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>
                                Financial History
                            </CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground"> 
                                {filteredMonths.length}{" "} financial month{filteredMonths.length !== 1 ? "s" : ""} 
                            </p>
                        </div>
                        <Select 
                            value={verdictFilter} 
                            onValueChange={(event) => setVerdictFilter(event)}
                        > 
                            <SelectTrigger 
                                className="w-full sm:w-[200px]"> 
                                <SelectValue 
                                    placeholder="Filter verdict" /> 
                            </SelectTrigger> 
                            <SelectContent> 
                                {verdicts.map(item => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent> 
                        </Select>
                    </div>
                </CardHeader>

                <CardContent>

                    <div className="space-y-6">

                        {filteredMonths.map((month) => {

                            const report = month.report;

                            return (
                                <div
                                    key={month.id}
                                    className="rounded-lg border p-4"
                                >

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                        <div>

                                            <h3 className="font-semibold">
                                                {month.year}-
                                                {String(month.month).padStart(2, "0")}
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Status: {month.status}
                                            </p>

                                        </div>

                                        <div className="flex items-center gap-2">
                                            {report && (
                                                <div
                                                    className={`rounded-md px-3 py-1.5 text-sm font-medium ${getVerdictClass(report.verdict)}`}
                                                >
                                                    {report.verdict}
                                                </div>
                                            )}
                                            <Link
                                                className="inline-flex items-center justify-center rounded-md hover:bg-accent border border-gray-200 py-0.75 px-2"
                                                
                                                href={`/financial-months/${month.id}`}
                                            >
                                                <Eye className="mr-2 size-4" />
                                                View Report
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => downloadFinancialReport(month.id)}
                                            >
                                                <Download className="mr-2 size-4" />
                                                Download
                                            </Button>
                                        </div>

                                    </div>

                                    {report ? (

                                        <>

                                            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Income
                                                    </p>

                                                    <p className="font-semibold">
                                                        {formatCurrency(
                                                            report.total_income
                                                        )}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Expenses
                                                    </p>

                                                    <p className="font-semibold">
                                                        {formatCurrency(
                                                            report.total_expenses
                                                        )}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Savings
                                                    </p>

                                                    <p className="font-semibold">
                                                        {formatCurrency(
                                                            report.savings
                                                        )}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Savings Rate
                                                    </p>

                                                    <p className="font-semibold">
                                                        {formatPercentage(
                                                            report.savings_rate
                                                        )}
                                                    </p>
                                                </div>

                                            </div>

                                            {report.insight && (
                                                <div className="mt-4 rounded-md bg-muted/50 p-4">

                                                    <div className="flex gap-3">

                                                        <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                                        <div>

                                                            <p className="text-sm font-medium">
                                                                Financial Insight
                                                            </p>

                                                            <p className="mt-1 text-sm text-muted-foreground">
                                                                {report.insight}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>
                                            )}

                                        </>

                                    ) : (

                                        <p className="mt-4 text-sm text-muted-foreground">
                                            No report available for this month.
                                        </p>

                                    )}

                                </div>
                            );

                        })}
                        {filteredMonths.length === 0 && ( 
                            <div className="py-10 text-center text-sm text-muted-foreground"> 
                                No financial months match the selected verdict. 
                            </div> 
                        )}

                    </div>

                </CardContent>

            </Card>
    );
}